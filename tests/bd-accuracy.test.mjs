import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

test("BD audit separates structural validity from publishable evidence", () => {
  const report = JSON.parse(execFileSync(process.execPath, ["scripts/audit-bd-review.mjs"], { encoding: "utf8" }));

  assert.equal(report.total, 51);
  assert.equal(report.schemaValid, 51);
  assert.equal(report.semanticValid, 51);
  assert.equal(report.genericPlaceholders, 23);
  assert.equal(report.batchDerived, 7);
  assert.equal(report.publishable, 0);
  assert.equal(report.evidenceStatuses.unverified, 42);
  assert.equal(report.evidenceStatuses["source-checked"], 8);
  assert.equal(report.evidenceStatuses["cross-checked"], 1);
  assert.equal(report.applicability.unverified, 120);
  assert.equal(report.applicability.supported, 84);
  assert.equal(report.sourceDomains["icy-veins.com"] > 0, true);
  assert.equal(report.builds.every((build) => build.publishBlockers.length > 0), true);
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
});
