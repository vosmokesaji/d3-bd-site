import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = "https://eu.diablo3.blizzard.com";
const LOCALE = "/zh-tw/item/";
const OUTPUT_DIR = new URL("../public/d3/library/", import.meta.url);
const ICON_DIR = new URL("../public/d3/library/items/", import.meta.url);
const CACHE_DIR = new URL("../.cache/d3-items/", import.meta.url);
const ONLY = process.argv.find((argument) => argument.startsWith("--only="))?.split("=")[1]?.split(",").filter(Boolean);
const REFRESH = process.argv.includes("--refresh");
const SKIP_IMAGES = process.argv.includes("--skip-images");

const CLASS_NAMES = {
  barbarian: "野蛮人",
  crusader: "圣教军",
  "demon-hunter": "猎魔人",
  monk: "武僧",
  necromancer: "死灵法师",
  "witch-doctor": "巫医",
  wizard: "魔法师",
};

const FOLLOWER_NAMES = { templar: "圣殿骑士", scoundrel: "盗贼", enchantress: "魔女" };
const ARTISAN_NAMES = { blacksmith: "铁匠", jeweler: "珠宝匠", mystic: "秘术师" };
const ARTISAN_ALIASES = {
  blacksmith: ["铁匠", "鐵匠"],
  jeweler: ["珠宝匠", "珠寶匠"],
  mystic: ["秘术师", "秘術師", "灵谕师", "靈諭師"],
};

function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function cleanText(value = "") {
  return decodeEntities(value)
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<span[^>]*tooltip-icon-bullet[^>]*><\/span>/gi, "• ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t\r\f\v]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function fetchText(url, cacheName) {
  const cacheFile = new URL(`${cacheName}.html`, CACHE_DIR);
  if (!REFRESH) {
    try { return await readFile(cacheFile, "utf8"); } catch {}
  }
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "Sanctuary-Archive/1.0 (private local guide mirror)" },
        signal: AbortSignal.timeout(45_000),
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const html = await response.text();
      await writeFile(cacheFile, html);
      return html;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 800));
    }
  }
  throw lastError;
}

function directoryGroup(slug) {
  const weapons = new Set([
    "axe-1h", "dagger", "mace-1h", "spear", "sword-1h", "ceremonial-knife", "fist-weapon", "flail-1h", "mighty-weapon-1h", "scythe-1h",
    "axe-2h", "mace-2h", "polearm", "staff", "sword-2h", "daibo", "flail-2h", "mighty-weapon-2h", "scythe-2h", "bow", "crossbow", "hand-crossbow", "wand",
  ]);
  const other = new Set(["potion", "crafting-material", "blacksmith-plan", "jeweler-design", "page-of-training", "dye", "gem", "misc"]);
  return weapons.has(slug) ? "weapons" : other.has(slug) ? "other" : "armor";
}

function parseDirectory(html) {
  const directory = html.slice(html.indexOf('<div class="db-directory">'));
  const matches = [...directory.matchAll(/<a href="\/zh-tw\/item\/([^/]+)\/" class="([^"]*)">([\s\S]*?)<\/a>/g)];
  const categories = matches.map((match) => {
    const [, slug, classList, labelHtml] = match;
    const tokens = classList.trim().split(/\s+/).filter(Boolean);
    return {
      id: slug,
      // Directory links contain a nested tooltip with class/follower names. The
      // visible category label is the text outside that span.
      name: cleanText(labelHtml.replace(/<span[\s\S]*?<\/span>/gi, "")),
      group: directoryGroup(slug),
      classes: unique(tokens.filter((token) => token.startsWith("class-")).map((token) => token.slice(6))),
      followers: unique(tokens.filter((token) => token.startsWith("follower-")).map((token) => token.slice(9))),
      artisans: unique(tokens.filter((token) => token.startsWith("artisan-")).map((token) => token.slice(8))),
      source: `${ROOT}${LOCALE}${slug}/`,
    };
  });
  return [...new Map(categories.map((category) => [category.id, category])).values()];
}

function firstMatch(value, expression, group = 1) {
  return value.match(expression)?.[group] ?? "";
}

function classExpression(className) {
  return new RegExp(`<([a-z][\\w:-]*)\\b[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>`, "i");
}

/**
 * Return a complete HTML element even when it contains nested elements with the
 * same tag name. Blizzard's item-effects and item-itemset lists both contain
 * nested lists, so a non-greedy regular expression stops too early.
 */
function extractElementByClass(html, className, fromIndex = 0) {
  const source = html.slice(fromIndex);
  const opening = source.match(classExpression(className));
  if (!opening || opening.index === undefined) return null;
  const tag = opening[1].toLowerCase();
  const start = fromIndex + opening.index;
  const openEnd = start + opening[0].length;
  const tokenExpression = new RegExp(`<\\/?${tag}\\b[^>]*>`, "gi");
  tokenExpression.lastIndex = openEnd;
  let depth = 1;
  let token;
  while ((token = tokenExpression.exec(html))) {
    depth += token[0].startsWith("</") ? -1 : 1;
    if (depth === 0) {
      return {
        start,
        end: tokenExpression.lastIndex,
        outer: html.slice(start, tokenExpression.lastIndex),
        inner: html.slice(openEnd, token.index),
        tag,
      };
    }
  }
  return null;
}

function extractDirectClassElements(html, className) {
  const elements = [];
  let cursor = 0;
  while (cursor < html.length) {
    const element = extractElementByClass(html, className, cursor);
    if (!element) break;
    elements.push(element);
    cursor = element.end;
  }
  return elements;
}

function effectLines(html) {
  return decodeEntities(html)
    .replace(/<span[^>]*tooltip-icon-bullet[^>]*><\/span>/gi, "\n__BULLET__")
    .replace(/<span[^>]*tooltip-icon-utility[^>]*><\/span>/gi, "\n__UTILITY__")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(?:li|p)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t\r\f\v]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const icon = line.startsWith("__BULLET__") ? "bullet" : line.startsWith("__UTILITY__") ? "utility" : "none";
      return {
        kind: "property",
        icon,
        text: line.replace(/^__(?:BULLET|UTILITY)__\s*/, "").trim(),
      };
    })
    .filter((line) => line.text);
}

function parseChoiceGroup(choiceHtml) {
  const nestedListStart = choiceHtml.search(/<ul\b/i);
  const headerHtml = nestedListStart === -1 ? choiceHtml : choiceHtml.slice(0, nestedListStart);
  const label = cleanText(headerHtml.replace(/<span class="value">([\s\S]*?)<\/span>/gi, "$1"));
  const optionElements = extractDirectClassElements(choiceHtml, "item-no-background");
  const options = optionElements.flatMap((element) => effectLines(element.inner));
  const countText = cleanText(firstMatch(headerHtml, /<span class="value">([\s\S]*?)<\/span>/));
  return {
    kind: "choice",
    count: /^\d+$/.test(countText) ? Number(countText) : null,
    label,
    options,
  };
}

function parsePropertySegment(segmentHtml) {
  const choices = extractDirectClassElements(segmentHtml, "item-effects-choice");
  if (choices.length === 0) return effectLines(segmentHtml);

  const entries = [];
  let cursor = 0;
  choices.forEach((choice) => {
    entries.push(...effectLines(segmentHtml.slice(cursor, choice.start)));
    entries.push(parseChoiceGroup(choice.inner));
    cursor = choice.end;
  });
  entries.push(...effectLines(segmentHtml.slice(cursor)));
  return entries;
}

/** Parse Blizzard's visual "主要 / 次要" grouping without flattening choices. */
export function parseItemProperties(html) {
  const effectsElement = extractElementByClass(html, "item-effects");
  const properties = { primary: [], secondary: [], other: [] };
  if (!effectsElement) return properties;

  const categoryExpression = /<p\b[^>]*class="[^"]*\bitem-property-category\b[^"]*"[^>]*>([\s\S]*?)<\/p>/gi;
  const headings = [...effectsElement.inner.matchAll(categoryExpression)];
  let cursor = 0;
  let section = "primary";

  headings.forEach((heading) => {
    const before = effectsElement.inner.slice(cursor, heading.index);
    properties[section].push(...parsePropertySegment(before));
    const label = cleanText(heading[1]);
    section = label.includes("主要") ? "primary" : label.includes("次要") ? "secondary" : "other";
    cursor = (heading.index ?? 0) + heading[0].length;
  });
  properties[section].push(...parsePropertySegment(effectsElement.inner.slice(cursor)));
  return properties;
}

function stripSetListItems(setHtml) {
  const removable = [
    ...extractDirectClassElements(setHtml, "item-itemset-name"),
    ...extractDirectClassElements(setHtml, "item-itemset-piece"),
  ].sort((a, b) => a.start - b.start);
  let output = "";
  let cursor = 0;
  removable.forEach((element) => {
    output += setHtml.slice(cursor, element.start);
    cursor = element.end;
  });
  return output + setHtml.slice(cursor);
}

/** Parse set identity, its member list, and each bonus tier independently. */
export function parseItemSet(html, currentSource = "") {
  const setElement = extractElementByClass(html, "item-itemset");
  if (!setElement) return null;

  const nameElement = extractElementByClass(setElement.inner, "item-itemset-name");
  const name = nameElement ? cleanText(nameElement.inner) : null;
  const items = extractDirectClassElements(setElement.inner, "item-itemset-piece").flatMap((element) => {
    const anchor = element.inner.match(/<a\b([^>]*)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/i);
    if (!anchor) return [];
    const href = decodeEntities(anchor[2]);
    const source = href.startsWith("http") ? href : `${ROOT}${href}`;
    const classes = `${anchor[1]} ${anchor[3]}`;
    return [{
      id: href.match(/\/item\/([^/?#]+)/)?.[1] ?? slugify(cleanText(anchor[4])),
      name: cleanText(anchor[4]),
      source,
      current: /\bd3-color-white\b/.test(classes) || (currentSource && source === currentSource),
    }];
  });

  const bonusHtml = stripSetListItems(setElement.inner);
  const tierExpression = /\((\d+)\)件[：:]/g;
  const tierMatches = [...bonusHtml.matchAll(tierExpression)];
  const parsedBonuses = tierMatches.map((match, index) => {
    const start = match.index ?? 0;
    const end = tierMatches[index + 1]?.index ?? bonusHtml.length;
    const lines = effectLines(bonusHtml.slice(start, end))
      .map((line) => ({ ...line, text: line.text.replace(/^\(\d+\)件[：:]\s*/, "").trim() }))
      .filter((line) => line.text);
    return { pieces: Number(match[1]), lines };
  });
  const bonuses = [];
  parsedBonuses.forEach((tier) => {
    const existing = bonuses.find((candidate) => candidate.pieces === tier.pieces);
    if (existing) existing.lines.push(...tier.lines);
    else bonuses.push(tier);
  });

  return { name, items, bonuses };
}

function flattenProperties(properties) {
  return unique(Object.values(properties).flatMap((entries) => entries.flatMap((entry) => (
    entry.kind === "choice" ? [entry.label, ...entry.options.map((option) => option.text)] : [entry.text]
  ))));
}

function flattenSetBonuses(itemSet) {
  return itemSet?.bonuses.flatMap((tier) => [`(${tier.pieces})件：`, ...tier.lines.map((line) => line.text)]) ?? [];
}

function undupeGridName(value) {
  const decoded = decodeEntities(value).trim();
  for (const match of decoded.matchAll(/\s+/g)) {
    const split = match.index;
    const left = decoded.slice(0, split).trim();
    const right = decoded.slice(split + match[0].length).trim();
    if (left === right) return left;
  }
  return decoded;
}

function parseGridRows(html, category, existingBySource, existingByImageSource) {
  return [...html.matchAll(/<div class="data-cell"[^>]*data-raw="([^"]*)"[^>]*>([\s\S]*?)<\/a>\s*<\/div>/g)].flatMap((match, rowIndex) => {
    const [, dataRaw, cell] = match;
    const href = firstMatch(cell, /<a href="([^"]+)"/);
    const imageSource = decodeEntities(firstMatch(cell, /background-image:\s*url\((https:\/\/assets\.diablo3\.blizzard\.com\/[^)]+)\)/));
    const name = undupeGridName(dataRaw);
    if (!href || !imageSource || !name) return [];
    const source = href.startsWith("http") ? href : `${ROOT}${href}`;
    const existing = existingBySource.get(source) ?? existingByImageSource.get(imageSource);
    const itemHrefId = href.match(/\/item\/([^/?#]+)/)?.[1];
    const id = existing?.id ?? itemHrefId ?? `${category.id}:${slugify(name)}:${rowIndex}`;
    const quality = /d3-icon-item-green/.test(cell) ? "set" : /d3-icon-item-orange/.test(cell) ? "legendary" : "common";
    return [{
      schemaVersion: 2,
      id,
      name,
      category: category.id,
      categoryName: category.name,
      group: category.group,
      quality,
      crafted: false,
      requiredLevel: null,
      type: category.name,
      classes: category.classes,
      followers: category.followers,
      artisans: category.artisans,
      effects: [],
      setBonuses: [],
      extras: [],
      imageSource,
      image: existing?.image ?? `/d3/library/items/${slugify(id)}.png`,
      source,
    }];
  });
}

function hydrateGridRecord(record, html) {
  const requiredLevelText = cleanText(firstMatch(html, /<span class="detail-level-number">([\s\S]*?)<\/span>/));
  const classSlug = firstMatch(html, /item-class-specific[\s\S]*?href="\/zh-tw\/class\/([^/]+)\//);
  const descriptionText = cleanText(firstMatch(html, /<div class="item-description[^>]*>([\s\S]*?)<\/div>/));
  const extrasText = cleanText(firstMatch(html, /<ul class="item-extras">([\s\S]*?)<\/ul>/));
  const craftedBy = cleanText(firstMatch(html, /製作者：\s*<span class="value">([\s\S]*?)<\/span>/));
  const properties = parseItemProperties(html);
  const itemSet = parseItemSet(html, record.source);
  return {
    ...record,
    requiredLevel: requiredLevelText ? Number(requiredLevelText) : record.requiredLevel,
    type: cleanText(firstMatch(html, /<ul class="item-type">([\s\S]*?)<\/ul>/)) || record.type,
    slot: cleanText(firstMatch(html, /<li class="item-slot">([\s\S]*?)<\/li>/)) || undefined,
    classId: classSlug || undefined,
    className: classSlug ? CLASS_NAMES[classSlug] : undefined,
    classes: classSlug ? [classSlug] : record.classes,
    craftedBy: craftedBy || undefined,
    armorWeapon: cleanText(firstMatch(html, /<ul class="item-armor-weapon[^>]*>([\s\S]*?)<\/ul>/)) || undefined,
    properties,
    effects: unique([descriptionText, ...flattenProperties(properties)]),
    legendaryPower: cleanText(firstMatch(html, /<span class="d3-color-ffff8000">([\s\S]*?)<br\s*\/?>/)) || undefined,
    set: itemSet ?? undefined,
    setBonuses: flattenSetBonuses(itemSet),
    extras: unique(extrasText.split("\n").map((line) => line.trim())),
    flavor: cleanText(firstMatch(html, /<div class="db-flavor-text">[\s\S]*?<span class="d3-color-ffc7b377">([\s\S]*?)<\/span>/)) || undefined,
  };
}

function parseRows(html, category, existingBySource, existingByImageSource) {
  return [...html.matchAll(/<tr class="([^"]*\brow\d?\b[^"]*)"[^>]*>([\s\S]*?)<\/tr>/g)].flatMap((match, rowIndex) => {
    const [, rowClasses, row] = match;
    const href = firstMatch(row, /<a href="([^"]+)" rel="np"/);
    const name = cleanText(firstMatch(row, /<h3 class="subheader-3"[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h3>/));
    const imageSource = decodeEntities(firstMatch(row, /background-image:\s*url\((https:\/\/assets\.diablo3\.blizzard\.com\/[^)]+)\)/));
    if (!href || !name || !imageSource) return [];

    const flags = new Set(rowClasses.trim().split(/\s+/));
    const quality = flags.has("set") ? "set" : flags.has("legendary") ? "legendary" : flags.has("crafted") ? "crafted" : "common";
    const crafted = flags.has("crafted");
    const source = href.startsWith("http") ? href : `${ROOT}${href}`;
    const existing = existingBySource.get(source) ?? existingByImageSource.get(imageSource);
    const itemHrefId = href.match(/\/item\/([^/?#]+)/)?.[1];
    const id = existing?.id ?? itemHrefId ?? `${category.id}:${slugify(name)}:${rowIndex}`;
    const localFile = existing?.image ?? `/d3/library/items/${slugify(id)}.png`;
    const levelRaw = firstMatch(row, /class="column-level[^"\n]*"[^>]*data-raw="(\d*)"/);
    const requiredLevel = levelRaw === "" ? null : Number(levelRaw);
    const classSlug = firstMatch(row, /item-class-specific[\s\S]*?href="\/zh-tw\/class\/([^/]+)\//);
    const type = cleanText(firstMatch(row, /<ul class="item-type">([\s\S]*?)<\/ul>/));
    const armorWeapon = cleanText(firstMatch(row, /<ul class="item-armor-weapon[^>]*>([\s\S]*?)<\/ul>/));
    const extrasText = cleanText(firstMatch(row, /<ul class="item-extras">([\s\S]*?)<\/ul>/));
    const legendaryPower = cleanText(firstMatch(row, /<span class="d3-color-ffff8000">([\s\S]*?)<br\s*\/?>/));
    const flavor = cleanText(firstMatch(row, /<span class="d3-color-ffc7b377">([\s\S]*?)<\/span>/));
    const craftedBy = cleanText(firstMatch(row, /製作者：\s*<span class="value">([\s\S]*?)<\/span>/));
    const properties = parseItemProperties(row);
    const itemSet = parseItemSet(row, source);
    const effects = flattenProperties(properties);
    const setBonuses = flattenSetBonuses(itemSet);
    const artisans = unique([
      ...category.artisans,
      ...Object.entries(ARTISAN_ALIASES).filter(([, aliases]) => aliases.some((label) => craftedBy.includes(label))).map(([key]) => key),
    ]);

    return [{
      schemaVersion: 2,
      id,
      name,
      category: category.id,
      categoryName: category.name,
      group: category.group,
      quality,
      crafted,
      requiredLevel,
      type,
      slot: cleanText(firstMatch(row, /<li class="item-slot">([\s\S]*?)<\/li>/)),
      classId: classSlug || undefined,
      className: classSlug ? CLASS_NAMES[classSlug] : undefined,
      classes: classSlug ? [classSlug] : category.classes,
      followers: category.followers,
      artisans,
      craftedBy: craftedBy || undefined,
      armorWeapon: armorWeapon || undefined,
      properties,
      effects,
      legendaryPower: legendaryPower || undefined,
      set: itemSet ?? undefined,
      setBonuses,
      extras: unique(extrasText.split("\n")),
      flavor: flavor || undefined,
      imageSource,
      image: localFile,
      source,
    }];
  });
}

async function mapLimit(values, concurrency, mapper) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker));
  return results;
}

async function downloadIcon(record) {
  const target = new URL(record.image.replace(/^\/d3\/library\/items\//, ""), ICON_DIR);
  try { await readFile(target); return; } catch {}
  const response = await fetch(record.imageSource, {
    headers: { "user-agent": "Sanctuary-Archive/1.0 (private local guide mirror)" },
    signal: AbortSignal.timeout(45_000),
  });
  if (!response.ok) throw new Error(`Icon ${response.status}: ${record.imageSource}`);
  await writeFile(target, Buffer.from(await response.arrayBuffer()));
}

function detailCacheName(record) {
  return `detail-${record.id.replace(/[^\w.-]+/g, "-")}`;
}

export async function main() {
await Promise.all([mkdir(OUTPUT_DIR, { recursive: true }), mkdir(ICON_DIR, { recursive: true }), mkdir(CACHE_DIR, { recursive: true })]);
const existingItems = JSON.parse(await readFile(new URL("items.json", OUTPUT_DIR), "utf8").catch(() => "[]"));
const existingBySource = new Map(existingItems.map((record) => [record.source, record]));
const existingByImageSource = new Map(existingItems.map((record) => [record.imageSource, record]));
const indexHtml = await fetchText(`${ROOT}${LOCALE}`, "index");
const allCategories = parseDirectory(indexHtml);
const categories = ONLY?.length ? allCategories.filter((category) => ONLY.includes(category.id)) : allCategories;

const categoryRecords = await mapLimit(categories, 4, async (category) => {
  const html = await fetchText(category.source, category.id);
  let records = parseRows(html, category, existingBySource, existingByImageSource);
  if (records.length === 0) {
    records = parseGridRows(html, category, existingBySource, existingByImageSource);
    records = await mapLimit(records, 8, async (record) => {
      const detailHtml = await fetchText(record.source, detailCacheName(record));
      return hydrateGridRecord(record, detailHtml);
    });
  } else {
    // Category rows contain bonus tiers, but Blizzard only emits the set name
    // and member list on an item's detail page. Hydrate set items only; regular
    // and legendary rows are already complete in the category page.
    records = await mapLimit(records, 8, async (record) => {
      if (record.quality !== "set") return record;
      const detailHtml = await fetchText(record.source, detailCacheName(record));
      return hydrateGridRecord(record, detailHtml);
    });
  }
  process.stdout.write(`${category.id}: ${records.length}\n`);
  return records;
});
const scraped = categoryRecords.flat();
const records = ONLY?.length
  ? [...existingItems.filter((record) => !ONLY.includes(record.category)), ...scraped]
  : scraped;
records.sort((a, b) => a.category.localeCompare(b.category) || (a.requiredLevel ?? -1) - (b.requiredLevel ?? -1) || a.name.localeCompare(b.name, "zh-Hant"));

if (!SKIP_IMAGES) {
  let completed = 0;
  await mapLimit(records, 8, async (record) => {
    await downloadIcon(record);
    completed += 1;
    if (completed % 100 === 0) process.stdout.write(`icons: ${completed}/${records.length}\n`);
  });
}

const categoryCounts = new Map(records.map((record) => [record.category, 0]));
records.forEach((record) => categoryCounts.set(record.category, (categoryCounts.get(record.category) ?? 0) + 1));
const enrichedCategories = allCategories.map((category) => ({
  ...category,
  classNames: category.classes.map((id) => CLASS_NAMES[id] ?? id),
  followerNames: category.followers.map((id) => FOLLOWER_NAMES[id] ?? id),
  artisanNames: category.artisans.map((id) => ARTISAN_NAMES[id] ?? id),
  count: categoryCounts.get(category.id) ?? 0,
}));

await Promise.all([
  writeFile(new URL("items.json", OUTPUT_DIR), `${JSON.stringify(records, null, 2)}\n`),
  writeFile(new URL("item-categories.json", OUTPUT_DIR), `${JSON.stringify(enrichedCategories, null, 2)}\n`),
]);
process.stdout.write(`done: ${records.length} items across ${enrichedCategories.length} categories\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
