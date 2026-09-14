import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

test("BD audit separates structural validity from publishable evidence", () => {
  const report = JSON.parse(execFileSync(process.execPath, ["scripts/audit-bd-review.mjs"], { encoding: "utf8" }));

  assert.equal(report.total, 51);
  assert.equal(report.schemaValid, 51);
  assert.equal(report.semanticValid, 51);
  assert.equal(report.evidenceValid, 34);
  assert.equal(report.genericPlaceholders, 20);
  assert.equal(report.batchDerived, 7);
  assert.equal(report.publishable, 0);
  assert.equal(report.evidenceStatuses.unverified, 37);
  assert.equal(report.evidenceStatuses["source-checked"], 13);
  assert.equal(report.evidenceStatuses["cross-checked"], 1);
  assert.equal(report.applicability.unverified, 109);
  assert.equal(report.applicability.supported, 81);
  assert.equal(report.applicability.viable, 7);
  assert.equal(report.content["nephalem-rift-t16"], 5);
  assert.equal(report.content.bounty, 2);
  assert.equal(report.structuredSources, 54);
  assert.equal(report.evidenceClaims, 91);
  assert.equal(report.crossCheckedClaims, 36);
  assert.equal(report.unresolvedClaims, 55);
  assert.equal(report.sourceDomains["icy-veins.com"] > 0, true);
  assert.equal(report.builds.every((build) => build.publishBlockers.length > 0), true);

  const tragoul = report.builds.find((build) => build.id === "tragoul-nova");
  assert.equal(tragoul.scenarioCount, 3);
  assert.equal(tragoul.structuredSourceCount, 6);
  assert.equal(tragoul.evidenceClaimCount, 10);
  assert.deepEqual(tragoul.evidenceErrors, []);
  assert.deepEqual(tragoul.scenarios.map((scenario) => scenario.id), ["gr-push", "gr-speed", "t16-rift"]);

  const lodNova = report.builds.find((build) => build.id === "lod-nova");
  assert.equal(lodNova.scenarioCount, 2);
  assert.equal(lodNova.structuredSourceCount, 7);
  assert.equal(lodNova.evidenceClaimCount, 15);
  assert.deepEqual(lodNova.validationErrors, []);
  assert.deepEqual(lodNova.semanticErrors, []);
  assert.deepEqual(lodNova.evidenceErrors, []);
  assert.deepEqual(lodNova.scenarios.map((scenario) => scenario.id), ["gr-progression", "gr-speed"]);
  assert.deepEqual(lodNova.scenarios.map((scenario) => scenario.applicability), ["viable", "viable"]);
  assert.deepEqual(lodNova.scenarios.filter((scenario) => scenario.content === "nephalem-rift-t16"), []);

  const rathma = report.builds.find((build) => build.id === "rathma-aotd");
  assert.equal(rathma.scenarioCount, 3);
  assert.equal(rathma.structuredSourceCount, 14);
  assert.equal(rathma.evidenceClaimCount, 18);
  assert.deepEqual(rathma.validationErrors, []);
  assert.deepEqual(rathma.semanticErrors, []);
  assert.deepEqual(rathma.evidenceErrors, []);
  assert.deepEqual(rathma.scenarios.map((scenario) => scenario.id), ["gr-push", "gr-speed", "t16-rift"]);
  assert.deepEqual(rathma.scenarios.map((scenario) => scenario.applicability), ["supported", "supported", "supported"]);

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

  const h90 = report.builds.find((build) => build.id === "h90-frenzy");
  assert.equal(h90.scenarioCount, 4);
  assert.equal(h90.structuredSourceCount, 12);
  assert.equal(h90.evidenceClaimCount, 20);
  assert.deepEqual(h90.validationErrors, []);
  assert.deepEqual(h90.semanticErrors, []);
  assert.deepEqual(h90.evidenceErrors, []);
  assert.deepEqual(h90.scenarios.map((scenario) => scenario.id), ["gr-push", "gr-speed", "t16-rift", "bounty"]);
  assert.deepEqual(h90.scenarios.map((scenario) => scenario.applicability), ["supported", "supported", "supported", "viable"]);
  assert.equal(h90.scenarios.find((scenario) => scenario.id === "t16-rift").diffCount, h90.scenarios.find((scenario) => scenario.id === "bounty").diffCount);
});

test("HotNS Frenzy uses activity packages and conditional armor gems instead of Paragon copies", async () => {
  const source = await import("node:fs/promises").then(({ readFile }) => readFile("app/data/h90-frenzy-reviewed.ts", "utf8"));

  assert.match(source, /id: "gr-push"[\s\S]*?content: "greater-rift-push"[\s\S]*?paragonBand: "any"/);
  assert.match(source, /id: "gr-speed"[\s\S]*?content: "greater-rift-speed"[\s\S]*?paragonBand: "any"/);
  assert.match(source, /id: "t16-rift"[\s\S]*?content: "nephalem-rift-t16"[\s\S]*?paragonBand: "any"/);
  assert.match(source, /id: "bounty"[\s\S]*?content: "bounty"[\s\S]*?sameAsScenarioId: "t16-rift"/);
  assert.doesNotMatch(source, /id: "(?:push|speed)-(?:low|high)"/);
  assert.match(source, /armor: Array\(5\)\.fill\("flawless-royal-ruby"\)/);
  assert.match(source, /只有坚韧不足已经阻碍推进时才换白宝石/);
  assert.match(source, /weapon: \["flawless-royal-emerald", "flawless-royal-emerald"\]/);
  assert.match(source, /gear: \{ amulet: "squirts", ring1: "band-of-might", ring2: "coe", weapon: "ingeom", offhand: "oathkeeper-worn" \}/);
  assert.match(source, /gear: \{ shoulders: "savages-shoulders", bracers: "warzechian", pants: "depth-diggers-worn"/);
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

test("Trag'Oul exposes real activities without duplicating high and low Paragon scenarios", async () => {
  const page = await import("node:fs/promises").then(({ readFile }) => readFile("app/page.tsx", "utf8"));

  const start = page.indexOf("const TRAGOUL_SCENARIOS");
  const end = page.indexOf("const TRAGOUL_EVIDENCE_CLAIMS", start);
  const scenarios = page.slice(start, end);
  assert.match(scenarios, /id: "gr-push"[\s\S]*?content: "greater-rift-push"[\s\S]*?paragonBand: "any"[\s\S]*?applicability: "supported"/);
  assert.match(scenarios, /id: "gr-speed"[\s\S]*?content: "greater-rift-speed"[\s\S]*?paragonBand: "any"[\s\S]*?applicability: "viable"/);
  assert.match(scenarios, /id: "t16-rift"[\s\S]*?content: "nephalem-rift-t16"[\s\S]*?paragonBand: "any"[\s\S]*?applicability: "unverified"/);
  assert.doesNotMatch(scenarios, /id: "(?:push|speed)-(?:low|high)"/);
  assert.doesNotMatch(scenarios, /gr-speed-(?:low|high)/);
  assert.match(page, /legendaryGems: \{ damage: "boon-of-the-hoarder", boss: "bane-of-the-powerful" \}/);
  assert.match(page, /powers: \{ armor: "steuarts-greaves", jewelry: "squirts" \}/);
  assert.match(page, /defaultScenarioId: "gr-push"/);
  assert.match(page, /换装后仍能稳定完成目标层/);
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
