import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { parseItemFixture } from "../scripts/scrape-diablo-items.mjs";

const fixture = (name) => readFile(new URL(`./fixtures/diablo-items/${name}.html`, import.meta.url), "utf8");

test("parses a regular legendary fixture into primary and secondary groups", async () => {
  const parsed = parseItemFixture(await fixture("legendary"));
  assert.equal(parsed.requiredLevel, 70);
  assert.equal(parsed.imageSource, "https://assets.diablo3.blizzard.com/item/legendary.png");
  assert.equal(parsed.properties.primary[0].text, "+1000 智力");
  assert.equal(parsed.properties.secondary[0].icon, "utility");
});

test("parses set identity, pieces, and independent bonus tiers", async () => {
  const parsed = parseItemFixture(await fixture("set-item"), "https://eu.diablo3.blizzard.com/zh-tw/item/current-set-piece");
  assert.equal(parsed.set.name, "黑荆棘战铠");
  assert.deepEqual(parsed.set.bonuses.map((tier) => tier.pieces), [2, 3]);
  assert.equal(parsed.set.items.filter((item) => item.current).length, 1);
});

test("parses crafted plans without flattening their property group", async () => {
  const parsed = parseItemFixture(await fixture("crafted-plan"));
  assert.equal(parsed.type, "铁匠设计图");
  assert.equal(parsed.craftedBy, "铁匠（等级 12）");
  assert.equal(parsed.properties.other[0].text, "教会铁匠制作套装");
});

test("preserves a nested choice and its declared option count", async () => {
  const parsed = parseItemFixture(await fixture("choice"));
  const choice = parsed.properties.secondary[0];
  assert.equal(choice.kind, "choice");
  assert.equal(choice.count, 2);
  assert.deepEqual(choice.options.map((option) => option.text), ["火焰技能伤害", "冰霜技能伤害"]);
});

test("parses follower and artisan fixture metadata", async () => {
  const parsed = parseItemFixture(await fixture("follower-crafted"));
  assert.equal(parsed.type, "魔女法器");
  assert.equal(parsed.craftedBy, "珠宝匠");
  assert.match(parsed.imageSource, /follower\.png$/);
});
