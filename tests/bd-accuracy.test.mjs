import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

test("BD audit separates structural validity from publishable evidence", () => {
  const report = JSON.parse(execFileSync(process.execPath, ["scripts/audit-bd-review.mjs"], { encoding: "utf8" }));

  assert.equal(report.total, 51);
  assert.equal(report.schemaValid, 51);
  assert.equal(report.semanticValid, 51);
  assert.equal(report.evidenceValid, 32);
  assert.equal(report.genericPlaceholders, 23);
  assert.equal(report.batchDerived, 7);
  assert.equal(report.publishable, 0);
  assert.equal(report.evidenceStatuses.unverified, 42);
  assert.equal(report.evidenceStatuses["source-checked"], 8);
  assert.equal(report.evidenceStatuses["cross-checked"], 1);
  assert.equal(report.applicability.unverified, 123);
  assert.equal(report.applicability.supported, 81);
  assert.equal(report.applicability.viable, 2);
  assert.equal(report.content["nephalem-rift-t16"], 2);
  assert.equal(report.structuredSources, 6);
  assert.equal(report.evidenceClaims, 10);
  assert.equal(report.crossCheckedClaims, 5);
  assert.equal(report.unresolvedClaims, 5);
  assert.equal(report.sourceDomains["icy-veins.com"] > 0, true);
  assert.equal(report.builds.every((build) => build.publishBlockers.length > 0), true);

  const tragoul = report.builds.find((build) => build.id === "tragoul-nova");
  assert.equal(tragoul.scenarioCount, 6);
  assert.equal(tragoul.structuredSourceCount, 6);
  assert.equal(tragoul.evidenceClaimCount, 10);
  assert.deepEqual(tragoul.evidenceErrors, []);
  assert.deepEqual(tragoul.scenarios.filter((scenario) => scenario.content === "greater-rift-speed").map((scenario) => scenario.id), ["gr-speed-low", "gr-speed-high"]);
});

test("generic placeholders cannot reintroduce fatal LoD, thorns, or main-stat defaults", async () => {
  const factory = await import("node:fs/promises").then(({ readFile }) => readFile("app/data/class-build-factory.ts", "utf8"));

  assert.match(factory, /\[isLegacyOfDreams \? "engine" : "power"\]: isLegacyOfDreams \? "lod" : "gogok"/);
  assert.match(factory, /lod-bombardment" \? "flawless-royal-topaz" : "flawless-royal-emerald"/);
  assert.match(factory, /\["力量", "敏捷", "智力"\]\.find/);
  assert.doesNotMatch(factory, /normalGems: \{ armor: Array\(5\)\.fill\("flawless-royal-diamond"\) \}/);
  assert.match(factory, /reviewStatus: "draft"/);
  assert.match(factory, /dataProvenance: "generic-placeholder"/);
});

test("build detail derives activity choices from the guide scenarios", async () => {
  const page = await import("node:fs/promises").then(({ readFile }) => readFile("app/page.tsx", "utf8"));

  assert.match(page, /const scenarioOptions = activeGuide\.scenarios\?\.filter/);
  assert.match(page, /scenarioOptions\.map\(\(scenario\) => <button/);
  assert.match(page, /setScenarioId\(scenario\.id\)/);
  assert.match(page, /params\.set\("scenario", scenarioId\)/);
  assert.match(page, /activeScenario\?\.label \?\? guide\.modeLabels/);
  assert.match(page, /applicabilityPresentation\(scenario\.applicability\)/);
  assert.match(page, /guide\.structuredSources\?\.find/);
  assert.match(page, /const gear: Gear\[\] = activeConfiguration\s*\?/);
  assert.match(page, /const rotation = activeConfiguration\?\.rotation \?\?/);
});

test("Trag'Oul separates GR speed from T16 and keeps unresolved variants non-recommended", async () => {
  const page = await import("node:fs/promises").then(({ readFile }) => readFile("app/page.tsx", "utf8"));

  assert.match(page, /id: "gr-speed-low"[\s\S]*?content: "greater-rift-speed"[\s\S]*?applicability: "viable"/);
  assert.match(page, /id: "gr-speed-high"[\s\S]*?content: "greater-rift-speed"[\s\S]*?applicability: "viable"/);
  assert.match(page, /id: "speed-low"[\s\S]*?content: "nephalem-rift-t16"[\s\S]*?applicability: "unverified"/);
  assert.match(page, /id: "speed-high"[\s\S]*?content: "nephalem-rift-t16"[\s\S]*?applicability: "unverified"/);
  assert.match(page, /legendaryGems: \{ damage: "boon-of-the-hoarder", boss: "bane-of-the-powerful" \}/);
  assert.match(page, /powers: \{ armor: "steuarts-greaves", jewelry: "squirts" \}/);
  assert.match(page, /defaultScenarioId: "push-high"/);
});
