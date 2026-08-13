import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const LIBRARY_DIR = new URL("../public/d3/library/", import.meta.url);
const ITEM_OUTPUT_DIR = new URL("items/", LIBRARY_DIR);
const CATEGORY_OUTPUT_DIR = new URL("by-category/", ITEM_OUTPUT_DIR);
const DETAIL_OUTPUT_DIR = new URL("detail/", ITEM_OUTPUT_DIR);

export function itemAssetKey(path = "") {
  return path.split("/").pop()?.replace(/\.[^.]+$/, "").toLowerCase() ?? "";
}

export function normalizeStructuredItem(record) {
  const { effects: _effects, setBonuses: _setBonuses, ...structured } = record;
  return { ...structured, schemaVersion: 3 };
}

export function toItemIndexRecord(record) {
  return {
    id: record.id,
    name: record.name,
    image: record.image,
    assetKey: itemAssetKey(record.image),
    category: record.category,
    categoryName: record.categoryName,
    group: record.group,
    quality: record.quality,
    crafted: record.crafted,
    requiredLevel: record.requiredLevel,
    type: record.type,
    classes: record.classes ?? [],
    followers: record.followers ?? [],
    artisans: record.artisans ?? [],
    legendaryPower: record.legendaryPower,
  };
}

export function toItemAssetRecord(record) {
  return {
    id: record.id,
    name: record.name,
    image: record.image,
    assetKey: itemAssetKey(record.image),
    category: record.category,
  };
}

export async function writeItemLibraryOutputs(inputRecords) {
  const records = inputRecords.map(normalizeStructuredItem);
  const index = records.map(toItemIndexRecord);
  const assetIndex = records.map(toItemAssetRecord);
  const byCategory = Map.groupBy(index, (record) => record.category ?? "misc");

  await Promise.all([
    mkdir(CATEGORY_OUTPUT_DIR, { recursive: true }),
    mkdir(DETAIL_OUTPUT_DIR, { recursive: true }),
  ]);

  await Promise.all([
    writeFile(new URL("index.json", ITEM_OUTPUT_DIR), `${JSON.stringify(index)}\n`),
    writeFile(new URL("asset-index.json", ITEM_OUTPUT_DIR), `${JSON.stringify(assetIndex)}\n`),
    ...[...byCategory].map(([category, categoryRecords]) => (
      writeFile(new URL(`${encodeURIComponent(category)}.json`, CATEGORY_OUTPUT_DIR), `${JSON.stringify(categoryRecords)}\n`)
    )),
    ...records.map((record) => (
      writeFile(new URL(`${encodeURIComponent(record.id)}.json`, DETAIL_OUTPUT_DIR), `${JSON.stringify(record)}\n`)
    )),
  ]);

  const manifest = {
    schemaVersion: 3,
    generatedAt: new Date().toISOString(),
    itemCount: records.length,
    itemIndex: "/d3/library/items/index.json",
    itemAssetIndex: "/d3/library/items/asset-index.json",
    itemCategories: "/d3/library/item-categories.json",
    categoryPattern: "/d3/library/items/by-category/<category>.json",
    detailPattern: "/d3/library/items/detail/<id>.json",
  };
  await writeFile(new URL("manifest.json", LIBRARY_DIR), `${JSON.stringify(manifest, null, 2)}\n`);
  return { records, index, manifest };
}

export async function main() {
  const source = JSON.parse(await readFile(new URL("items.json", LIBRARY_DIR), "utf8"));
  const { records, manifest } = await writeItemLibraryOutputs(source);
  await writeFile(new URL("items.json", LIBRARY_DIR), `${JSON.stringify(records, null, 2)}\n`);
  process.stdout.write(`item library: ${manifest.itemCount} structured details and category shards\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
