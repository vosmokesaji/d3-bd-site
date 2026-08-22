import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete seven-class build atlas", async () => {
  const response = await render("/builds");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>圣休亚瑞秘典/);
  assert.match(html, /小秘境、蓝门与外观收集专用趣味 BD/);
  for (const className of ["野蛮人", "圣教军", "猎魔人", "武僧", "死灵法师", "巫医", "魔法师"]) {
    assert.match(html, new RegExp(className));
  }
  assert.doesNotMatch(html, /待制作|即将接入/);
});

test("all catalog entries resolve through data-driven class guide modules", async () => {
  const [catalog, page, guideTypes] = await Promise.all([
    readFile(new URL("../app/data/site-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/build-guides.ts", import.meta.url), "utf8"),
  ]);
  const buildBlock = catalog.slice(
    catalog.indexOf("export const BUILD_CATALOG"),
    catalog.indexOf("// All catalog entries"),
  );
  const ids = [...buildBlock.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);

  assert.equal(ids.length, 51);
  assert.equal(new Set(ids).size, 51);
  for (const moduleName of [
    "BARBARIAN_BUILDS",
    "CRUSADER_BUILDS",
    "DEMON_HUNTER_BUILDS",
    "MONK_BUILDS",
    "NECROMANCER_BUILDS",
    "WITCH_DOCTOR_BUILDS",
    "WIZARD_BUILDS",
  ]) {
    assert.match(page, new RegExp(`${moduleName}\\[buildId\\]`));
  }
  assert.match(guideTypes, /variantProfiles/);
  assert.match(guideTypes, /"push-low"/);
  assert.match(guideTypes, /"speed-high"/);
  assert.match(guideTypes, /variantCompleteness/);
});

test("renders dedicated farming builds with purpose-specific guidance", async () => {
  const [pony, godMonk] = await Promise.all([
    render("/builds/pony-fist-farm").then((response) => response.text()),
    render("/builds/god-monk").then((response) => response.text()),
  ]);
  assert.match(pony, /跑马天拳 · 全能速刷/);
  assert.match(pony, /T16小秘境/);
  assert.match(pony, /大秘境≤110/);
  assert.match(pony, /T16 \/ 蓝门 \/ 悬赏/);
  assert.match(pony, /蓝门（敌意幻象）/);
  assert.match(godMonk, /上帝僧 · 无限疾风/);
  assert.match(godMonk, /彩虹地精/);
  assert.match(godMonk, /外观路线/);
  assert.match(godMonk, /精气回复/);
  assert.match(godMonk, /低巅峰 T16 \/ 蓝门/);
  assert.match(godMonk, /水幻身/);
  const monkData = await readFile(new URL("../app/data/monk-builds.ts", import.meta.url), "utf8");
  assert.match(monkData, /god-inna-head/);
  assert.match(monkData, /尹娜的光华/);
  assert.match(monkData, /god-raiment-shoulders/);
  assert.match(monkData, /validateReviewedBuildGuide\(GOD_MONK_REVIEWED_GUIDE\)/);
  assert.doesNotMatch(monkData, /powerSets: \{/);
  assert.doesNotMatch(monkData, /loadouts: \[/);
});

test("keeps shared-configuration builds from receiving unreviewed variant swaps", async () => {
  const [valor, godMonk, guideTypes, page] = await Promise.all([
    render("/builds/valor-fist").then((response) => response.text()),
    render("/builds/god-monk").then((response) => response.text()),
    readFile(new URL("../app/data/build-guides.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(guideTypes, /hasExplicitRuntimeVariants/);
  assert.match(guideTypes, /documented-shared/);
  assert.match(page, /resolveBuildVariantProfile/);
  assert.match(valor, /配置差异待实装/);
  assert.doesNotMatch(valor, /variant-goldwrap|variant-ingeom/);
  assert.doesNotMatch(godMonk, /配置差异待实装/);
});

test("validates reviewed scenarios and renders Trag'Oul guidance from complete data", async () => {
  const [html, guideTypes, page] = await Promise.all([
    render("/builds/tragoul-nova").then((response) => response.text()),
    readFile(new URL("../app/data/build-guides.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  for (const contract of ["BuildConfiguration", "BuildScenario", "BuildChoicePolicy", "ParagonGuide", "BuildReviewStatus"]) {
    assert.match(guideTypes, new RegExp(`export type ${contract}`));
  }
  for (const helper of ["resolveBuildConfiguration", "diffBuildConfigurations", "validateReviewedBuildGuide"]) {
    assert.match(guideTypes, new RegExp(`export function ${helper}`));
  }
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(page, new RegExp(`id: "${scenario}"`));
  }
  assert.match(page, /reviewStatus: "fully-reviewed"/);
  assert.match(page, /TRAGOUL_VALIDATION_ERRORS/);
  assert.match(html, /SCENARIO REVIEW/);
  assert.match(html, /配置差异/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /必须固定/);
  assert.match(html, /条件替换/);
  assert.match(html, /80万–90万/);
  assert.match(html, /攻击速度[^]*1\.67/);
  assert.match(html, /范围伤害[^]*120%/);
});

test("renders the reviewed Wastes Rend scenarios as real runtime loadouts", async () => {
  const [html, barbarianData, page] = await Promise.all([
    render("/builds/wastes-rend").then((response) => response.text()),
    readFile(new URL("../app/data/barbarian-builds.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(barbarianData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["slanderer-wastes", "stone-gauntlets", "bulkathos-vow", "ambos-pride-worn", "hexing-pants", "wreath-of-lightning"]) {
    assert.match(barbarianData, new RegExp(runtimeChoice));
  }
  assert.match(barbarianData, /validateReviewedBuildGuide\(WASTES_REVIEWED_GUIDE\)/);
  assert.match(page, /Object\.values\(activeConfiguration\.gear\)/);
  assert.match(page, /activeConfiguration\?\.skills/);
  assert.match(page, /activeConfiguration\?\.passives/);
  assert.match(page, /activeConfiguration\?\.rotation/);
});

test("renders the reviewed pony-fist-farm scenarios as real speed-farm loadouts", async () => {
  const [html, crusaderData, page] = await Promise.all([
    render("/builds/pony-fist-farm").then((response) => response.text()),
    readFile(new URL("../app/data/crusader-builds.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰 T16 \/ 蓝门 \/ 悬赏/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["speed-low", "speed-high", "push-low", "push-high"]) {
    assert.match(crusaderData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["pony-goldwrap-gear", "pony-avarice", "pony-rechel", "pony-aquila", "pony-furnace", "pony-unity", "pony-coe", "pony-vigilante", "wreath-of-lightning", "bane-of-the-powerful"]) {
    assert.match(crusaderData, new RegExp(runtimeChoice));
  }
  assert.match(crusaderData, /validateReviewedBuildGuide\(PONY_REVIEWED_GUIDE\)/);
  assert.doesNotMatch(crusaderData, /powerSets: \{ push: \["pony-darklight"/);
  assert.match(page, /gogok: \{ name: "迅捷勾玉"/);
  assert.match(page, /"bane-of-the-powerful": POWERFUL_GEM/);
});

test("renders the reviewed god-hungering scenarios as real high-mobility loadouts", async () => {
  const [html, dhData, page] = await Promise.all([
    render("/builds/god-hungering").then((response) => response.text()),
    readFile(new URL("../app/data/demon-hunter-builds.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(dhData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["yang", "ninth-cirri-worn", "vallas-worn", "dawn-cube", "coe-power", "ingeom", "vallas", "simplicity", "boon-of-the-hoarder", "暗影游移"]) {
    assert.match(dhData, new RegExp(runtimeChoice));
  }
  assert.match(dhData, /validateReviewedBuildGuide\(GOD_REVIEWED_GUIDE\)/);
  assert.doesNotMatch(dhData, /powerSets: \{ push:/);
  assert.match(page, /simplicity: \{ name: "至简之力"/);
});

test("renders the reviewed god-monk scenarios as real infinite-dash loadouts", async () => {
  const [html, monkData, page] = await Promise.all([
    render("/builds/god-monk").then((response) => response.text()),
    readFile(new URL("../app/data/monk-builds.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰 T16 \/ 蓝门/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  assert.doesNotMatch(html, /两套都能无限疾风/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(monkData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["god-inna-reach", "god-hybrid-crudest", "god-prides-fall", "god-fleshrake", "god-burst", "god-messerschmidt", "水幻身", "光辉如炬"]) {
    assert.match(monkData, new RegExp(runtimeChoice));
  }
  assert.match(monkData, /validateReviewedBuildGuide\(GOD_MONK_REVIEWED_GUIDE\)/);
  assert.doesNotMatch(monkData, /loadouts: \[/);
  assert.doesNotMatch(monkData, /powerSets: \{/);
});

test("renders the reviewed lod-nova scenarios as real three-nova loadouts", async () => {
  const [html, necData, page] = await Promise.all([
    render("/builds/lod-nova").then((response) => response.text()),
    readFile(new URL("../app/data/necromancer-builds.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(necData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["ingeom", "nemesis-bracers", "steuarts-greaves", "avarice-band", "goldwrap", "bane-of-the-powerful", "boon-of-the-hoarder"]) {
    assert.match(necData, new RegExp(runtimeChoice));
  }
  assert.match(necData, /validateReviewedBuildGuide/);
  assert.match(page, /lod: \{ name: "梦之遗礼"/);
});

test("renders the reviewed inarius-nova scenarios as real bone-storm nova loadouts", async () => {
  const [html, necData] = await Promise.all([
    render("/builds/inarius-nova").then((response) => response.text()),
    readFile(new URL("../app/data/necromancer-builds.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(necData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["INARIUS_NOVA_CONFIGURATION_BASE", "ingeom", "nemesis-bracers", "steuarts-greaves", "bane-of-the-powerful", "boon-of-the-hoarder"]) {
    assert.match(necData, new RegExp(runtimeChoice));
  }
  assert.match(necData, /validateReviewedBuildGuide/);
});

test("renders the reviewed pestilence-lance scenarios as real corpse-lance loadouts", async () => {
  const [html, necData] = await Promise.all([
    render("/builds/pestilence-lance").then((response) => response.text()),
    readFile(new URL("../app/data/necromancer-builds.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(necData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["PESTILENCE_CONFIGURATION_BASE", "messerschmidt", "ingeom", "lost-time", "nemesis-bracers", "steuarts-greaves", "avarice-band", "boon-of-the-hoarder"]) {
    assert.match(necData, new RegExp(runtimeChoice));
  }
  assert.match(necData, /validateReviewedBuildGuide/);
});

test("renders the reviewed lod-corpse-explosion scenarios as real poison-chain loadouts", async () => {
  const [html, necData] = await Promise.all([
    render("/builds/lod-corpse-explosion").then((response) => response.text()),
    readFile(new URL("../app/data/necromancer-builds.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(necData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["LOD_CORPSE_CONFIGURATION_BASE", "reilena", "ingeom", "goldwrap", "nemesis-bracers", "steuarts-greaves", "avarice-band", "boon-of-the-hoarder"]) {
    assert.match(necData, new RegExp(runtimeChoice));
  }
  assert.match(necData, /validateReviewedBuildGuide/);
});

test("renders the reviewed rathma-aotd scenarios as real pet-engine loadouts", async () => {
  const [html, necData] = await Promise.all([
    render("/builds/rathma-aotd").then((response) => response.text()),
    readFile(new URL("../app/data/necromancer-builds.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(necData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["RATHMA_CONFIGURATION_BASE", "corroded-fang", "ingeom", "steuarts-greaves", "avarice-band", "goldwrap", "nemesis-bracers", "boon-of-the-hoarder"]) {
    assert.match(necData, new RegExp(runtimeChoice));
  }
  assert.doesNotMatch(necData, /轮回镰刀.*亡者大军/);
  assert.match(necData, /validateReviewedBuildGuide/);
});

test("renders the reviewed masquerade-spear scenarios as real three-line spear loadouts", async () => {
  const [html, necData] = await Promise.all([
    render("/builds/masquerade-spear").then((response) => response.text()),
    readFile(new URL("../app/data/necromancer-builds.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /低巅峰大秘境冲层/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(necData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["MASQUERADE_CONFIGURATION_BASE", "齿状骨刺", "reilena", "ingeom", "rechel", "avarice-band", "steuarts-greaves", "nemesis-bracers", "boon-of-the-hoarder"]) {
    assert.match(necData, new RegExp(runtimeChoice));
  }
  assert.match(necData, /validateReviewedBuildGuide/);
});

test("renders all reviewed wizard scenarios as real runtime loadouts", async () => {
  const [talHtml, lodOrbHtml, wizardData] = await Promise.all([
    render("/builds/tal-meteor").then((response) => response.text()),
    render("/builds/lod-orb").then((response) => response.text()),
    readFile(new URL("../app/data/wizard-builds.ts", import.meta.url), "utf8"),
  ]);

  for (const html of [talHtml, lodOrbHtml]) {
    assert.match(html, /已逐项校对/);
    assert.match(html, /巅峰加点/);
    assert.match(html, /固定与替换/);
    assert.doesNotMatch(html, /配置差异待实装/);
  }
  for (const buildId of ["tal-meteor", "lod-meteor", "firebird-eb", "delsere-twister", "vyr-archon", "typhon-hydra", "lod-orb"]) {
    assert.match(wizardData, new RegExp(`id: "${buildId}"`));
  }
  for (const runtimeChoice of ["WIZARD_EXTRA_GEAR", "aether-walker", "ingeom", "goldwrap", "avarice-band", "messerschmidt", "validateReviewedBuildGuide"]) {
    assert.match(wizardData, new RegExp(runtimeChoice));
  }
});

test("renders reviewed mundunugu scenarios with branch-specific sources", async () => {
  const [html, wdData, page] = await Promise.all([
    render("/builds/mundunugu-barrage").then((response) => response.text()),
    readFile(new URL("../app/data/witch-doctor-builds.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /蒙嘟噜魂弹/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(wdData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["MUNDUNUGU_CONFIGURATION_BASE", "nemesis-bracers", "warzechian", "goldwrap", "avarice-band", "ingeom", "shukrani"]) {
    assert.match(wdData, new RegExp(runtimeChoice));
  }
  assert.match(wdData, /MUNDUNUGU_SOURCES/);
  assert.match(wdData, /icySpeed/);
  assert.match(page, /function sourceLabel/);
});

test("renders the reviewed raekor-boulder scenarios as real boulder-toss loadouts", async () => {
  const [html, barbarianData] = await Promise.all([
    render("/builds/raekor-boulder").then((response) => response.text()),
    readFile(new URL("../app/data/barbarian-builds.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /蕾蔻巨石/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(barbarianData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["RAEKOR_CONFIGURATION_BASE", "RAEKOR_SOURCES", "nemesis-bracers", "warzechian", "goldwrap", "avarice-band", "ingeom", "messerschmidt", "bane-of-the-powerful", "boon-of-the-hoarder"]) {
    assert.match(barbarianData, new RegExp(runtimeChoice));
  }
  assert.match(barbarianData, /validateReviewedBuildGuide\(RAEKOR_REVIEWED_GUIDE\)/);
});

test("renders the reviewed ik-hota scenarios as real immortal hammer loadouts", async () => {
  const [html, barbarianData] = await Promise.all([
    render("/builds/ik-hota").then((response) => response.text()),
    readFile(new URL("../app/data/barbarian-builds.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /不朽先祖锤/);
  assert.match(html, /已逐项校对/);
  assert.match(html, /巅峰加点/);
  assert.match(html, /固定与替换/);
  assert.doesNotMatch(html, /配置差异待实装/);
  for (const scenario of ["push-low", "push-high", "speed-low", "speed-high"]) {
    assert.match(barbarianData, new RegExp(`id: "${scenario}"`));
  }
  for (const runtimeChoice of ["IK_HOTA_CONFIGURATION_BASE", "IK_HOTA_SOURCES", "nemesis-bracers", "goldwrap", "avarice-band", "remorseless-worn", "echoing-fury-ik", "royal-grandeur", "ingeom", "boon-of-the-hoarder"]) {
    assert.match(barbarianData, new RegExp(runtimeChoice));
  }
  assert.match(barbarianData, /validateReviewedBuildGuide\(IK_HOTA_REVIEWED_GUIDE\)/);
});

test("a non-prototype build uses the unified interactive detail renderer", async () => {
  const response = await render("/builds/typhon-hydra");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /unified-build-detail/);
  assert.match(html, /提丰多头蛇/);
  assert.match(html, /核心 BD 联动/);
  assert.match(html, /实战手法/);
  assert.doesNotMatch(html, /该 BD 正在制作/);
});

test("restores legendary gems and renders class-specific armor gems and stat lookup", async () => {
  const [tragoul, crusader, demonHunter, wizard] = await Promise.all([
    render("/builds/tragoul-nova").then((response) => response.text()),
    render("/builds/valor-fist").then((response) => response.text()),
    render("/builds/ue-multishot").then((response) => response.text()),
    render("/builds/tal-meteor").then((response) => response.text()),
  ]);

  assert.match(tragoul, /困者之灾/);
  assert.match(tragoul, /贼神的复仇之石/);
  assert.match(tragoul, /受罚者之灾/);
  assert.match(crusader, /无瑕皇家红宝石：力量/);
  assert.match(crusader, /点击反查词缀/);
  assert.match(crusader, /力量/);
  assert.match(demonHunter, /无瑕皇家绿宝石：敏捷/);
  assert.match(wizard, /无瑕皇家黄宝石：智力/);
  assert.match(wizard, /class="value">\+1000<\/b>[\s\S]*?智力/);
});

test("keeps the paperdoll on Blizzard's exact pixel slot geometry", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\.paperdoll-gear-zone\s*\{[^}]*width:\s*305px;[^}]*height:\s*425px;/s);
  assert.match(css, /\.loadout-panel \.slot-head\s*\{[^}]*width:\s*66px;[^}]*height:\s*66px;/s);
  assert.match(css, /\.loadout-panel \.slot-chest\s*\{[^}]*width:\s*82px;[^}]*height:\s*115px;/s);
  assert.match(css, /\.loadout-panel \.slot-amulet\s*\{[^}]*width:\s*56px;[^}]*height:\s*56px;/s);
  assert.match(css, /\.loadout-panel \.slot-belt\s*\{[^}]*width:\s*82px;[^}]*height:\s*34px;/s);
  assert.match(css, /\.loadout-panel \.slot-ring1\s*\{[^}]*width:\s*42px;[^}]*height:\s*42px;/s);
  assert.match(css, /\.loadout-panel \.slot-weapon\s*\{[^}]*width:\s*66px;[^}]*height:\s*130px;/s);
  assert.match(css, /border:\s*1px solid #c29337;/);
  assert.match(css, /border-color:\s*#87a73d;/);
});

test("keeps lower paperdoll slots anchored and mirrors Blizzard icon treatments", async () => {
  const [css, page, abilities] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/build/BuildAbilitiesPanel.tsx", import.meta.url), "utf8"),
  ]);

  for (const slot of ["ring1", "ring2", "pants", "weapon", "offhand", "boots"]) {
    assert.match(css, new RegExp(`\\.loadout-panel \\.slot-${slot}\\s*\\{[^}]*top:\\s*auto;[^}]*bottom:`, "s"));
  }
  assert.match(css, /\.paperdoll-label \.bonus-value\s*\{[^}]*font:\s*400 11px/s);
  assert.match(css, /\.rune-e\s*\{\s*background-position:\s*-168px 0;/);
  assert.match(css, /background:\s*url\("\/d3\/passive-skills\.png"\) 0 -41px no-repeat;/);
  assert.match(css, /\.cube-grid button img\s*\{[^}]*margin:\s*4px auto;/s);
  assert.match(css, /\.synergy-panel \.node-icon img\s*\{[^}]*object-position:\s*center center;/s);
  assert.match(abilities, /function runeKeyFor\(/);
  assert.doesNotMatch(abilities, /className="rune-icon rune-a"/);
  assert.match(page, /套装联动/);
  assert.match(page, /皇家华戒/);
});

test("ships the complete local Blizzard item mirror and local-only detail UI", async () => {
  const [itemsText, indexText, pantsText, fatesVowText, categoriesText, page, css, libraryComponents] = await Promise.all([
    readFile(new URL("../public/d3/library/items.json", import.meta.url), "utf8"),
    readFile(new URL("../public/d3/library/items/index.json", import.meta.url), "utf8"),
    readFile(new URL("../public/d3/library/items/by-category/pants.json", import.meta.url), "utf8"),
    readFile(new URL("../public/d3/library/items/detail/fates-vow-P61_Necro_Unique_Helm_22.json", import.meta.url), "utf8"),
    readFile(new URL("../public/d3/library/item-categories.json", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/library/BlizzardItem.tsx", import.meta.url), "utf8"),
  ]);
  const items = JSON.parse(itemsText);
  const index = JSON.parse(indexText);
  const pants = JSON.parse(pantsText);
  const fatesVow = JSON.parse(fatesVowText);
  const categories = JSON.parse(categoriesText);

  assert.equal(categories.length, 55);
  assert.equal(items.length, 2353);
  for (const category of ["pants", "potion", "crafting-material", "dye", "gem"]) {
    assert.ok(items.some((item) => item.category === category), `${category} should be mirrored`);
  }
  assert.equal(index.length, 2353);
  assert.equal(pants.every((item) => item.category === "pants"), true);
  assert.ok(fatesVow.legendaryPower);
  assert.ok(fatesVow.properties);
  assert.equal(items.every((item) => item.schemaVersion === 3), true);
  assert.equal(items.every((item) => !("effects" in item) && !("setBonuses" in item)), true);
  assert.match(page, />物品<\/a>/);
  assert.match(page, /物品详情与原特效均来自本地官方镜像/);
  assert.match(libraryComponents, /function OfficialPropertySections/);
  assert.match(libraryComponents, /function OfficialSetBlock/);
  assert.doesNotMatch(page, /fetch\("\/d3\/library\/items\.json"\)/);
  assert.match(page, /items\/by-category/);
  assert.match(page, /items\/detail/);
  assert.match(css, /\.diablo-item-frame\.quality-set \.diablo-item-frame-surface/);
  assert.match(css, /url\("\/d3\/item-icon-bgs\/green\.png"\)/);
  assert.match(css, /frame-size-md \{ --frame-width: 64px; --frame-height: 128px; \}/);
  assert.match(css, /frame-shape-square \{ --frame-height: var\(--frame-width\); \}/);
  assert.doesNotMatch(page, /className="official-source"/);
  assert.doesNotMatch(page, /<section className="original-effect"><h4>游戏原特效/);
});

test("structures Blizzard properties, choices, set pieces, and bonus tiers", async () => {
  const blackthorne = JSON.parse(await readFile(new URL("../public/d3/library/items/detail/blackthornes-jousting-mail-Unique_Pants_013_x1.json", import.meta.url), "utf8"));

  assert.equal(blackthorne.requiredLevel, 60);
  assert.equal(blackthorne.armorWeapon, "397 - 471\n防具");
  assert.deepEqual(blackthorne.properties.primary, []);
  assert.equal(blackthorne.properties.secondary.length, 4);
  const choices = blackthorne.properties.secondary.filter((entry) => entry.kind === "choice");
  assert.deepEqual(choices.map((entry) => entry.count), [3, 7]);
  assert.deepEqual(choices.map((entry) => entry.options.length), [3, 7]);
  assert.equal(blackthorne.properties.secondary.at(-1).text, "+3 隨機魔法屬性");
  assert.equal(blackthorne.set.name, "黑荊棘戰鎧");
  assert.equal(blackthorne.set.items.length, 5);
  assert.equal(blackthorne.set.items.filter((item) => item.current).length, 1);
  assert.deepEqual(blackthorne.set.bonuses.map((tier) => tier.pieces), [2, 3, 4]);
  assert.deepEqual(blackthorne.set.bonuses.map((tier) => tier.lines.length), [2, 2, 1]);

  const detailNames = [
    "blackthornes-jousting-mail-Unique_Pants_013_x1",
    "fates-vow-P61_Necro_Unique_Helm_22",
  ];
  const details = await Promise.all(detailNames.map(async (id) => JSON.parse(await readFile(new URL(`../public/d3/library/items/detail/${id}.json`, import.meta.url), "utf8"))));
  const allChoices = details.flatMap((item) => Object.values(item.properties ?? {}).flat()).filter((entry) => entry.kind === "choice");
  assert.equal(allChoices.every((entry) => entry.count === entry.options.length), true);
  assert.equal(blackthorne.set.items.filter((piece) => piece.current).length, 1);
});

test("moves shared build UI into components and removes the retired guide stylesheet", async () => {
  const [page, css, gearSlot, gearDetail, abilities, cube, itemFrame, followerPaperdoll, libraryComponents] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/build/PaperdollGearSlot.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/build/GearDetailPanel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/build/BuildAbilitiesPanel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/build/KanaiCubePanel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/items/DiabloItemFrame.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/followers/FollowerPaperdoll.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/library/BlizzardItem.tsx", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(page, /function PaperdollGearSlot|function GearDetailPanel|function BuildAbilitiesPanel|function KanaiCubePanel/);
  assert.match(gearSlot, /item-slot/);
  assert.match(gearSlot, /<DiabloItemFrame/);
  assert.match(gearDetail, /build-gear-effect/);
  assert.match(gearDetail, /<DiabloItemFrame/);
  assert.match(abilities, /skill-grid/);
  assert.match(cube, /cube-grid/);
  assert.match(itemFrame, /export function DiabloItemFrame/);
  assert.match(itemFrame, /itemFrameShapeForSlot/);
  assert.match(libraryComponents, /<DiabloItemFrame/);
  assert.match(followerPaperdoll, /<DiabloItemFrame image=\{item\.image\}/);
  assert.equal((page.match(/<FollowerShowcase/g) ?? []).length, 2);
  assert.doesNotMatch(page, /follower-item-icon/);
  assert.doesNotMatch(gearDetail, /detail-item-icon/);
  assert.doesNotMatch(libraryComponents, /item-list-icon/);
  assert.doesNotMatch(css, /\.guide-/);
});

test("renders complete follower paperdolls with explicit empty slots on a mobile-safe layout", async () => {
  const [html, page, data, paperdoll, css] = await Promise.all([
    render("/builds/tragoul-nova").then((response) => response.text()),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/followers.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/followers/FollowerPaperdoll.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /getFollowerSlotClass|followerItemQuality/);
  assert.match(data, /export const FOLLOWER_SLOT_ORDER/);
  for (const position of ["head", "shoulders", "chest", "gloves", "bracers", "belt", "pants", "boots", "amulet", "ring1", "ring2", "weapon", "offhand", "token"]) {
    assert.match(data, new RegExp(`"${position}"`));
  }
  assert.match(paperdoll, /FOLLOWER_SLOT_ORDER\.map/);
  assert.match(paperdoll, /follower-item-empty/);
  assert.equal((html.match(/class="follower-paperdoll"/g) ?? []).length, 3);
  assert.equal((html.match(/class="follower-item /g) ?? []).length, 42);
  assert.equal((html.match(/follower-item-empty/g) ?? []).length, 2);
  assert.equal((html.match(/follower-skill-strip/g) ?? []).length, 3);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*?body\s*\{[^}]*min-width:\s*0;/);
  assert.match(css, /@media \(max-width: 1100px\)[\s\S]*?\.follower-showcase\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*?\.follower-showcase\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)/);
});

test("preserves paperdoll overflow and enlarges detail artwork without shifting sockets", async () => {
  const [css, gearDetail, itemFrame] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../components/build/GearDetailPanel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/items/DiabloItemFrame.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(
    css,
    /\.loadout-panel \.slot-head \.diablo-item-frame-surface,[\s\S]*?\.loadout-panel \.slot-gloves \.diablo-item-frame-image\s*\{[^}]*overflow:\s*visible;/,
  );
  assert.match(gearDetail, /size="lg"[\s\S]*?fit="contain"[\s\S]*?sockets=\{sockets\}/);
  assert.match(
    css,
    /\.gear-detail-title > \.diablo-item-frame \.diablo-item-frame-sockets\s*\{[^}]*right:\s*-8px;[^}]*bottom:\s*-8px;[^}]*transform:\s*none;/s,
  );
  assert.match(itemFrame, /data-socket-count=\{sockets\.length\}/);
  assert.match(
    css,
    /data-socket-count="2"[^}]*data-socket-count="3"[^}]*\{[^}]*top:\s*50%;[^}]*bottom:\s*auto;[^}]*transform:\s*translateY\(-50%\)/s,
  );
  assert.match(
    css,
    /\.gear-detail-title > \.diablo-item-frame \.diablo-item-frame-sockets img\s*\{[^}]*width:\s*20px;[^}]*height:\s*20px;[^}]*margin:\s*6px auto 0;[^}]*filter:\s*none;/s,
  );
});

test("uses shared readable typography tokens across build, follower, and item descriptions", async () => {
  const [css, tragoul] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    render("/builds/tragoul-nova").then((response) => response.text()),
  ]);

  for (const token of [
    "--text-caption-size: 12px",
    "--text-meta-size: 13px",
    "--text-small-size: 14px",
    "--text-body-size: 16px",
    "--text-heading-sm-size: 18px",
  ]) assert.match(css, new RegExp(token));
  assert.match(css, /\.choice-policy > p,[^]*font-size: var\(--text-small-size\)/);
  assert.match(css, /\.follower-card > p,[^]*font-size: var\(--text-small-size\)/);
  assert.match(css, /\.item-detail-effect p,[^]*font-size: var\(--text-small-size\)/);
  assert.doesNotMatch(css, /clamp\(/);
  assert.match(tragoul, /diablo-item-frame/);
});

test("centralizes season metadata, asset roots, and versions client settings", async () => {
  const [page, season, assets, factory, settings] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/season-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/assets.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/class-build-factory.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/settings/SiteSettings.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(season, /number:\s*39/);
  assert.match(season, /seasonId:\s*"s39-ns-2\.7\.8"/);
  assert.doesNotMatch(page, /第39赛季|PATCH 2\.7\.8/);
  assert.match(assets, /D3_ITEM_ROOT/);
  assert.match(assets, /skillAsset/);
  assert.match(factory, /itemAsset/);
  assert.match(factory, /skillAsset/);
  assert.match(settings, /SETTINGS_VERSION = 2/);
  assert.match(settings, /syncAcrossTabs/);
});
