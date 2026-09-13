import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

test("BD audit separates structural validity from publishable evidence", () => {
  const report = JSON.parse(execFileSync(process.execPath, ["scripts/audit-bd-review.mjs"], { encoding: "utf8" }));

  assert.equal(report.total, 51);
  assert.equal(report.schemaValid, 51);
  assert.equal(report.semanticValid, 51);
  assert.equal(report.evidenceValid, 32);
  assert.equal(report.genericPlaceholders, 21);
  assert.equal(report.batchDerived, 7);
  assert.equal(report.publishable, 0);
  assert.equal(report.evidenceStatuses.unverified, 40);
  assert.equal(report.evidenceStatuses["source-checked"], 10);
  assert.equal(report.evidenceStatuses["cross-checked"], 1);
  assert.equal(report.applicability.unverified, 115);
  assert.equal(report.applicability.supported, 83);
  assert.equal(report.applicability.viable, 5);
  assert.equal(report.content["nephalem-rift-t16"], 4);
  assert.equal(report.content.bounty, 1);
  assert.equal(report.structuredSources, 21);
  assert.equal(report.evidenceClaims, 38);
  assert.equal(report.crossCheckedClaims, 15);
  assert.equal(report.unresolvedClaims, 23);
  assert.equal(report.sourceDomains["icy-veins.com"] > 0, true);
  assert.equal(report.builds.every((build) => build.publishBlockers.length > 0), true);

  const tragoul = report.builds.find((build) => build.id === "tragoul-nova");
  assert.equal(tragoul.scenarioCount, 6);
  assert.equal(tragoul.structuredSourceCount, 6);
  assert.equal(tragoul.evidenceClaimCount, 10);
  assert.deepEqual(tragoul.evidenceErrors, []);
  assert.deepEqual(tragoul.scenarios.filter((scenario) => scenario.content === "greater-rift-speed").map((scenario) => scenario.id), ["gr-speed-low", "gr-speed-high"]);

  const bombardment = report.builds.find((build) => build.id === "lod-bombardment");
  assert.equal(bombardment.scenarioCount, 3);
  assert.equal(bombardment.structuredSourceCount, 6);
  assert.equal(bombardment.evidenceClaimCount, 14);
  assert.deepEqual(bombardment.validationErrors, []);
  assert.deepEqual(bombardment.semanticErrors, []);
  assert.deepEqual(bombardment.evidenceErrors, []);
  assert.deepEqual(bombardment.scenarios.map((scenario) => scenario.id), ["gr-push", "t16-rift", "bounty"]);
  assert.deepEqual(bombardment.scenarios.filter((scenario) => scenario.content === "greater-rift-speed"), []);
  assert.equal(bombardment.scenarios.find((scenario) => scenario.id === "t16-rift").diffCount, bombardment.scenarios.find((scenario) => scenario.id === "bounty").diffCount);

  const zuni = report.builds.find((build) => build.id === "zuni-darts");
  assert.equal(zuni.scenarioCount, 2);
  assert.equal(zuni.structuredSourceCount, 9);
  assert.equal(zuni.evidenceClaimCount, 14);
  assert.deepEqual(zuni.validationErrors, []);
  assert.deepEqual(zuni.semanticErrors, []);
  assert.deepEqual(zuni.evidenceErrors, []);
  assert.deepEqual(zuni.scenarios.map((scenario) => scenario.id), ["gr-push", "t16-rift"]);
  assert.deepEqual(zuni.scenarios.filter((scenario) => scenario.content === "greater-rift-speed"), []);
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
  assert.match(page, /resolveBuildScenarioConfiguration\(activeGuide, activeScenario\)/);
  assert.match(page, /activeScenario\?\.paragonBand === "any"/);
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

test("LoD Bombardment exposes only evidenced activities and legal weapon packages", async () => {
  const source = await import("node:fs/promises").then(({ readFile }) => readFile("app/data/crusader-builds.ts", "utf8"));

  const start = source.indexOf("const LOD_BOMBARDMENT_URLS");
  const end = source.indexOf("const ROLAND_SOURCES", start);
  const reviewed = source.slice(start, end);
  assert.match(reviewed, /id: "gr-push"[\s\S]*?content: "greater-rift-push"[\s\S]*?paragonBand: "any"/);
  assert.match(reviewed, /id: "t16-rift"[\s\S]*?content: "nephalem-rift-t16"[\s\S]*?paragonBand: "any"/);
  assert.match(reviewed, /id: "bounty"[\s\S]*?content: "bounty"[\s\S]*?sameAsScenarioId: "t16-rift"/);
  assert.doesNotMatch(reviewed, /content: "greater-rift-speed"/);
  assert.doesNotMatch(reviewed, /id: "(?:push|speed)-(?:low|high)"/);
  assert.match(reviewed, /weapon: "pig-sticker", offhand: "akarat-awakening"/);
  assert.match(reviewed, /weapon: "messerschmidt-gear"/);
  assert.match(reviewed, /passives: \["heavenly-strength", "iron-maiden", "lord-commander", "finery"\]/);
  assert.match(reviewed, /legendaryGems: \{ engine: "lod", thorns: "boyarskys-chip", boss: "bane-of-the-stricken" \}/);
  assert.match(reviewed, /weapon: \["flawless-royal-topaz"\]/);
});

test("configured gem labels reflect socket effects instead of a global color label", async () => {
  const page = await import("node:fs/promises").then(({ readFile }) => readFile("app/page.tsx", "utf8"));

  assert.match(page, /id === "flawless-royal-topaz"[\s\S]*?label: "无瑕皇家黄宝石：荆棘伤害"/);
  assert.match(page, /id === "flawless-royal-diamond" && gear\.slot === "头部"[\s\S]*?label: "无瑕皇家白宝石：冷却缩减"/);
  assert.match(page, /gear\.slot === "胸部" \|\| gear\.slot === "腿部"[\s\S]*?label: "无瑕皇家白宝石：全元素抗性"/);
});
