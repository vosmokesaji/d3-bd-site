import { readFile } from "node:fs/promises";
import { parseItemProperties, parseItemSet } from "./scrape-diablo-items.mjs";

const file = process.argv[2];
if (!file) {
  process.stderr.write("usage: node scripts/inspect-diablo-item.mjs <cached-detail.html> [official-url]\n");
  process.exitCode = 1;
} else {
  const html = await readFile(file, "utf8");
  const source = process.argv[3] ?? "";
  process.stdout.write(`${JSON.stringify({
    properties: parseItemProperties(html),
    set: parseItemSet(html, source),
  }, null, 2)}\n`);
}
