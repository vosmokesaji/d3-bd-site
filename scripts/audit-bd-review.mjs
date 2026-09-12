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
      export { validateReviewedBuildGuide, resolveBuildConfiguration, diffBuildConfigurations } from './app/data/build-guides';
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
  const base = guide.configurationBase;
  const scenarios = (guide.scenarios ?? []).map((scenario) => {
    const configuration = base ? data.resolveBuildConfiguration(base, scenario.patch) : undefined;
    return {
      id: scenario.id,
      applicability: scenario.applicability,
      diffCount: configuration && base ? data.diffBuildConfigurations(base, configuration).length : 0,
      sourceRefs: scenario.sourceRefs,
    };
  });
  return {
    id: guide.id,
    name: guide.name,
    reviewStatus: guide.reviewStatus ?? "draft",
    variantCompleteness: guide.variantCompleteness ?? null,
    scenarioCount: scenarios.length,
    paragon: Boolean(guide.paragonGuide),
    choicePolicyCount: guide.choicePolicies?.length ?? 0,
    validationErrors: errors,
    scenarios,
  };
}).sort((a, b) => a.id.localeCompare(b.id));

const report = {
  generatedAt: new Date().toISOString(),
  season: "S39 / 2.7.8",
  total: builds.length,
  fullyReviewed: builds.filter((build) => build.reviewStatus === "fully-reviewed").length,
  valid: builds.filter((build) => build.validationErrors.length === 0).length,
  builds,
};

if (process.argv.includes("--write")) {
  await writeFile("docs/bd-review-audit.json", `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
if (report.total !== 51 || report.fullyReviewed !== 51 || report.valid !== 51) process.exitCode = 1;
