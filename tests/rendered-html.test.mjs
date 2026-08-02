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
  assert.match(html, /七大职业共 49 套单人主流 BD 已完整接入/);
  for (const className of ["野蛮人", "圣教军", "猎魔人", "武僧", "死灵法师", "巫医", "魔法师"]) {
    assert.match(html, new RegExp(className));
  }
  assert.doesNotMatch(html, /待制作|即将接入/);
});

test("all 49 catalog entries resolve through data-driven class guide modules", async () => {
  const [catalog, page] = await Promise.all([
    readFile(new URL("../app/data/site-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);
  const buildBlock = catalog.slice(
    catalog.indexOf("export const BUILD_CATALOG"),
    catalog.indexOf("// All catalog entries"),
  );
  const ids = [...buildBlock.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);

  assert.equal(ids.length, 49);
  assert.equal(new Set(ids).size, 49);
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
    render("/builds/god-hungering").then((response) => response.text()),
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
  const [css, page] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  for (const slot of ["ring1", "ring2", "pants", "weapon", "offhand", "boots"]) {
    assert.match(css, new RegExp(`\\.loadout-panel \\.slot-${slot}\\s*\\{[^}]*top:\\s*auto;[^}]*bottom:`, "s"));
  }
  assert.match(css, /\.paperdoll-label \.bonus-value\s*\{[^}]*font:\s*400 11px/s);
  assert.match(css, /\.rune-e\s*\{\s*background-position:\s*-168px 0;/);
  assert.match(css, /background:\s*url\("\/d3\/passive-skills\.png"\) 0 -41px no-repeat;/);
  assert.match(css, /\.cube-grid button img\s*\{[^}]*margin:\s*4px auto;/s);
  assert.match(css, /\.synergy-panel \.node-icon img\s*\{[^}]*object-position:\s*center center;/s);
  assert.match(page, /function runeKeyFor\(/);
  assert.doesNotMatch(page, /className="rune-icon rune-a"/);
  assert.match(page, /套装联动/);
  assert.match(page, /皇家华戒/);
});

test("ships the complete local Blizzard item mirror and local-only detail UI", async () => {
  const [itemsText, categoriesText, page, css] = await Promise.all([
    readFile(new URL("../public/d3/library/items.json", import.meta.url), "utf8"),
    readFile(new URL("../public/d3/library/item-categories.json", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  const items = JSON.parse(itemsText);
  const categories = JSON.parse(categoriesText);

  assert.equal(categories.length, 55);
  assert.equal(items.length, 2353);
  for (const category of ["pants", "potion", "crafting-material", "dye", "gem"]) {
    assert.ok(items.some((item) => item.category === category), `${category} should be mirrored`);
  }
  const fatesVow = items.find((item) => item.id === "fates-vow-P61_Necro_Unique_Helm_22");
  assert.ok(fatesVow?.legendaryPower);
  assert.ok(fatesVow?.effects?.length);
  assert.equal(items.every((item) => item.schemaVersion === 2), true);
  assert.match(page, />物品<\/a>/);
  assert.match(page, /物品详情与原特效均来自本地官方镜像/);
  assert.match(page, /function OfficialPropertySections/);
  assert.match(page, /function OfficialSetBlock/);
  assert.match(css, /url\("\/d3\/item-icon-bgs\/green\.png"\)/);
  assert.match(css, /\.item-icon-default \.item-list-icon-inner \{ width: 64px; height: 128px; \}/);
  assert.match(css, /\.item-icon-square \.item-list-icon-inner \{ width: 64px; height: 64px; \}/);
  assert.doesNotMatch(page, /className="official-source"/);
  assert.doesNotMatch(page, /<section className="original-effect"><h4>游戏原特效/);
});

test("structures Blizzard properties, choices, set pieces, and bonus tiers", async () => {
  const items = JSON.parse(await readFile(new URL("../public/d3/library/items.json", import.meta.url), "utf8"));
  const blackthorne = items.find((item) => item.id === "blackthornes-jousting-mail-Unique_Pants_013_x1");

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

  const allChoices = items.flatMap((item) => Object.values(item.properties ?? {}).flat()).filter((entry) => entry.kind === "choice");
  assert.equal(allChoices.every((entry) => entry.count === entry.options.length), true);
  const itemSets = items.filter((item) => item.set?.items?.length);
  assert.equal(itemSets.length, 319);
  assert.equal(itemSets.every((item) => item.set.items.filter((piece) => piece.current).length === 1), true);
});
