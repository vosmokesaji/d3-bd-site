import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const bundle = await build({
  stdin: {
    contents: `
      export { BARBARIAN_BUILDS } from './app/data/barbarian-builds';
      export { CRUSADER_BUILDS } from './app/data/crusader-builds';
      export { DEMON_HUNTER_BUILDS } from './app/data/demon-hunter-builds';
      export { MONK_BUILDS } from './app/data/monk-builds';
      export { NECROMANCER_BUILDS } from './app/data/necromancer-builds';
      export { WITCH_DOCTOR_BUILDS } from './app/data/witch-doctor-builds';
      export { WIZARD_BUILDS } from './app/data/wizard-builds';
      export { TRAGOUL_GUIDE } from './app/page';
      export { validateReviewedBuildGuide, validateBuildSemantics, validateBuildEvidence, resolveBuildConfiguration, resolveBuildScenarioConfiguration, diffBuildConfigurations } from './app/data/build-guides';
    `,
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  external: ["react", "react-dom"],
  loader: { ".css": "empty" },
  plugins: [{ name: "audit-navigation-mock", setup(builder) {
    builder.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: "navigation", namespace: "audit" }));
    builder.onLoad({ filter: /.*/, namespace: "audit" }, () => ({ contents: "export const usePathname = () => ''; export const useSearchParams = () => new URLSearchParams();", loader: "js" }));
  } }],
});

await mkdir(".cache", { recursive: true });
const bundlePath = ".cache/bd-audit.mjs";
await writeFile(bundlePath, bundle.outputFiles[0].text);
const data = await import(`${pathToFileURL(bundlePath).href}?${Date.now()}`);
const guides = Object.values({
  ...data.BARBARIAN_BUILDS,
  ...data.CRUSADER_BUILDS,
  ...data.DEMON_HUNTER_BUILDS,
  ...data.MONK_BUILDS,
  ...data.NECROMANCER_BUILDS,
  ...data.WITCH_DOCTOR_BUILDS,
  ...data.WIZARD_BUILDS,
  "tragoul-nova": data.TRAGOUL_GUIDE,
});

const builds = guides.map((guide) => {
  const errors = data.validateReviewedBuildGuide(guide);
  const semanticErrors = data.validateBuildSemantics(guide);
  const evidenceErrors = data.validateBuildEvidence(guide);
  const effectiveEvidenceStatus = guide.evidenceStatus ?? "unverified";
  const publishBlockers = [
    ...errors.map((error) => `schema:${error}`),
    ...semanticErrors.map((error) => `semantics:${error}`),
    ...evidenceErrors.map((error) => `evidence:${error}`),
    ...(effectiveEvidenceStatus === "published" ? [] : [`evidence:STATUS_${effectiveEvidenceStatus.toUpperCase()}`]),
    ...(guide.scenarios ?? []).filter((scenario) => scenario.applicability === "unverified").map((scenario) => `applicability:${scenario.id}:UNVERIFIED`),
  ];
  const base = guide.configurationBase;
  const scenarios = (guide.scenarios ?? []).map((scenario) => {
    const configuration = base ? data.resolveBuildScenarioConfiguration(guide, scenario) : undefined;
    return {
      id: scenario.id,
      applicability: scenario.applicability,
      content: scenario.content,
      diffCount: configuration && base ? data.diffBuildConfigurations(base, configuration).length : 0,
      sourceRefs: scenario.sourceRefs,
    };
  });
  const evidenceClaims = guide.evidenceClaims ?? [];
  return {
    id: guide.id,
    name: guide.name,
    reviewStatus: guide.reviewStatus ?? "draft",
    evidenceStatus: effectiveEvidenceStatus,
    platformStatus: guide.platformStatus ?? "pc-derived",
    dataProvenance: guide.dataProvenance ?? "hand-authored",
    variantCompleteness: guide.variantCompleteness ?? null,
    scenarioCount: scenarios.length,
    paragon: Boolean(guide.paragonGuide),
    choicePolicyCount: guide.choicePolicies?.length ?? 0,
    structuredSourceCount: guide.structuredSources?.length ?? 0,
    evidenceClaimCount: evidenceClaims.length,
    crossCheckedClaimCount: evidenceClaims.filter((claim) => claim.status === "cross-checked" || claim.status === "switch-tested").length,
    unresolvedClaimCount: evidenceClaims.filter((claim) => claim.status === "unverified" || claim.status === "single-source").length,
    validationErrors: errors,
    semanticErrors,
    evidenceErrors,
    publishBlockers: [...new Set(publishBlockers)],
    publishable: publishBlockers.length === 0,
    scenarios,
  };
}).sort((a, b) => a.id.localeCompare(b.id));

const report = {
  generatedAt: new Date().toISOString(),
  season: "S39 / 2.7.8",
  total: builds.length,
  fullyReviewed: builds.filter((build) => build.reviewStatus === "fully-reviewed").length,
  schemaValid: builds.filter((build) => build.validationErrors.length === 0).length,
  semanticValid: builds.filter((build) => build.semanticErrors.length === 0).length,
  evidenceValid: builds.filter((build) => build.evidenceErrors.length === 0).length,
  publishable: builds.filter((build) => build.publishable).length,
  genericPlaceholders: builds.filter((build) => build.dataProvenance === "generic-placeholder").length,
  batchDerived: builds.filter((build) => build.dataProvenance === "batch-derived").length,
  structuredSources: builds.reduce((sum, build) => sum + build.structuredSourceCount, 0),
  evidenceClaims: builds.reduce((sum, build) => sum + build.evidenceClaimCount, 0),
  crossCheckedClaims: builds.reduce((sum, build) => sum + build.crossCheckedClaimCount, 0),
  unresolvedClaims: builds.reduce((sum, build) => sum + build.unresolvedClaimCount, 0),
  evidenceStatuses: Object.fromEntries([...new Set(builds.map((build) => build.evidenceStatus))].sort().map((status) => [status, builds.filter((build) => build.evidenceStatus === status).length])),
  applicability: Object.fromEntries([...new Set(builds.flatMap((build) => build.scenarios.map((scenario) => scenario.applicability)))].sort().map((status) => [status, builds.flatMap((build) => build.scenarios).filter((scenario) => scenario.applicability === status).length])),
  content: Object.fromEntries([...new Set(builds.flatMap((build) => build.scenarios.map((scenario) => scenario.content)))].sort().map((content) => [content, builds.flatMap((build) => build.scenarios).filter((scenario) => scenario.content === content).length])),
  sourceDomains: Object.fromEntries([...new Set(builds.flatMap((build) => build.scenarios.flatMap((scenario) => scenario.sourceRefs)).flatMap((source) => {
    try { return [new URL(source).hostname.replace(/^www\./, "")]; } catch { return ["invalid"]; }
  }))].sort().map((domain) => [domain, builds.flatMap((build) => build.scenarios.flatMap((scenario) => scenario.sourceRefs)).filter((source) => {
    try { return new URL(source).hostname.replace(/^www\./, "") === domain; } catch { return domain === "invalid"; }
  }).length])),
  builds,
};

if (process.argv.includes("--write")) {
  await writeFile("docs/bd-review-audit.json", `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
if (report.total !== 51 || report.schemaValid !== 51 || report.semanticValid !== 51 || report.genericPlaceholders !== 22 || report.batchDerived !== 7) process.exitCode = 1;
