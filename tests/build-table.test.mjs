import assert from "node:assert/strict";
import test from "node:test";
import { build } from "esbuild";
import { access, mkdir, writeFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { unzipSync, strFromU8 } from "fflate";

const out = new URL("../.cache/build-table-tests/", import.meta.url);
await mkdir(out, { recursive: true });
const bundle = await build({
  stdin: { contents: `export { createTranslator } from './app/i18n/core'; export { I18nProvider } from './app/i18n/I18nProvider'; export { allBuildTableData } from './app/page'; export { BuildTableSheet } from './components/build/BuildTableView'; export { CURRENT_SEASON, SEASON_CATALOG } from './app/data/season-config'; export { BUILD_CATALOG } from './app/data/site-catalog';`, resolveDir: process.cwd(), loader: "tsx" },
  bundle: true, platform: "node", format: "esm", write: false, external: ["react", "react-dom", "react-dom/*"],
  plugins: [{ name: "static-test-inputs", setup(builder) {
    builder.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: "navigation", namespace: "test" }));
    builder.onLoad({ filter: /.*/, namespace: "test" }, () => ({ contents: `export const usePathname = () => ''; export const useSearchParams = () => new URLSearchParams();` }));
    builder.onLoad({ filter: /\.css$/ }, () => ({ contents: "", loader: "js" }));
  } }],
});
await writeFile(new URL("catalog.mjs", out), bundle.outputFiles[0].text);
const { allBuildTableData, BuildTableSheet, CURRENT_SEASON, BUILD_CATALOG, createTranslator, I18nProvider } = await import(new URL("catalog.mjs", out));
const all = allBuildTableData(CURRENT_SEASON);

test("export catalog covers every BD, seven classes and every loadout with complete local imagery", async () => {
  assert.equal(new Set(all.map((data) => data.classId)).size, 7);
  assert.equal(new Set(all.map((data) => data.id)).size, all.length);
  for (const entry of BUILD_CATALOG) assert.ok(all.some((data) => data.id === entry.id || data.id.startsWith(`${entry.id}-`)), entry.id);
  const paths = new Set();
  for (const data of all) {
    assert.ok(data.gear.length >= 12, data.id);
    assert.equal(data.skills.length, 6, data.id);
    assert.equal(data.passives.length, 4, data.id);
    assert.ok(data.powers.length >= 3, data.id);
    assert.ok(data.rotation.length > 0, data.id);
    const html = renderToStaticMarkup(createElement(BuildTableSheet, { data }));
    for (const [, path] of html.matchAll(/src="([^"]+)"/g)) paths.add(path);
  }
  const missing = [];
  for (const path of paths) {
    try { await access(new URL(`../public${path}`, import.meta.url)); } catch { missing.push(path); }
  }
  assert.deepEqual(missing, []);
});

test("the table renders complete text, socket counts, rune and all three follower configurations", () => {
  const data = all.find((data) => data.id === "tragoul-nova");
  for (const [followerKey, name, token] of [["enchantress", "魔女", "烟熏香炉"], ["scoundrel", "痞子", "骷髅钥匙"], ["templar", "圣殿骑士", "附魔之恩"]]) {
    const html = renderToStaticMarkup(createElement(BuildTableSheet, { data, followerKey }));
    assert.ok(html.includes(name));
    assert.ok(html.includes(createTranslator("zhCN").tr(token)));
    for (const item of data.gear) assert.ok(html.includes(createTranslator("zhCN").entity(item)));
    for (const skill of data.skills) assert.ok(html.includes(createTranslator("zhCN").entity(skill,"rune")));
    for (const step of data.rotation) assert.ok(html.includes(createTranslator("zhCN").tr(step.action)));
    assert.match(html, /×3/);
    assert.match(html, /紫 · 生命%/);
    assert.doesNotMatch(html, /无瑕(?:的)?皇家紫宝石/);
    assert.match(html, /怎么获得/);
    assert.match(html, /血岩碎片：赌头盔/);
    assert.match(html, /词缀优先级/);
    assert.match(html, /下方小字为单件最大值/);
    assert.match(html, /<strong>技能伤<\/strong><small>15%<\/small>/);
    assert.match(html, /<strong>暴率<\/strong><small>6%<\/small>/);
    assert.doesNotMatch(html, /<li><b>[1-4]<\/b><span>/);
    assert.match(html, /CDR=冷却缩减 · AD=范围伤害 · ED=百分比伤害/);
    assert.match(html, /主要输出/);
    const skillRows = html.match(/<tr class="bd-sheet-role-row[\s\S]*?<\/tr>/g) ?? [];
    assert.match(skillRows.find((row) => row.includes("死亡新星")) ?? "", /bd-sheet-role-row-output/);
    assert.doesNotMatch(skillRows.find((row) => row.includes("血魂双分")) ?? "", /bd-sheet-role-row-output|主要输出/);
    assert.doesNotMatch(html, /使用要点/);
    assert.match(html, /bd-sheet-core-grid/);
    assert.ok(html.indexOf("02") < html.indexOf("03") && html.indexOf("03") < html.indexOf("04"));
    assert.equal((html.match(/bd-sheet-block/g) ?? []).length, 6);
    assert.match(html, /bd-sheet-follower-items/);
    assert.match(html, /输出手法/);
  }
});

test("season without fourth cube slot produces three-slot images", () => {
  const tables = allBuildTableData({ ...CURRENT_SEASON, cubeSlots: 3 });
  for (const data of tables) assert.ok(!data.powers.some((power) => ["第4槽", "赛季槽", "赛季"].includes(power.slot)));
});

// Exercise the real export loop, archive bytes and lifecycle with deterministic rendering boundaries.
const exporter = await build({
  entryPoints: ["components/build/export-build-tables.tsx"], bundle: true, platform: "node", format: "esm", write: false,
  external: ["react", "react/jsx-runtime", "fflate"],
  plugins: [{ name: "export-render-boundary", setup(builder) {
    builder.onResolve({ filter: /^(react-dom\/client|react-dom|html-to-image)$|\/BuildTableView$/ }, (args) => ({ path: args.path, namespace: "mock" }));
    builder.onLoad({ filter: /.*/, namespace: "mock" }, ({ path }) => ({ contents: path === "react-dom/client" ? `export const createRoot = () => ({ render: node => { globalThis.exportHarness.current = node.props.children.props.data; }, unmount: () => { globalThis.exportHarness.unmounted++; } });` : path === "react-dom" ? `export const flushSync = fn => fn();` : path === "html-to-image" ? `export const toBlob = async (node, options) => globalThis.exportHarness.capture(options);` : `export const BuildTableSheet = () => null;` }));
  } }],
});
await writeFile(new URL("exporter.mjs", out), exporter.outputFiles[0].text);
const { exportBuildTables, safeFilename, tableFilename } = await import(new URL("exporter.mjs", out));
function harness() {
  const state = { current: null, unmounted: 0, removed: 0, capture: (options) => { assert.equal(options.pixelRatio, 2); assert.equal(options.width, 1440); return new Blob([new Uint8Array([137, 80, 78, 71])], { type: "image/png" }); } };
  globalThis.exportHarness = state;
  globalThis.document = { fonts: { ready: Promise.resolve() }, body: { append() {} }, createElement: () => ({ setAttribute() {}, firstElementChild: { querySelectorAll: () => [] }, remove() { state.removed++; } }) };
  return state;
}

test("PNG and ZIP exports use distinct safe names and store every generated image", async () => {
  const state = harness();
  const controller = new AbortController();
  const png = await exportBuildTables([all[0]], false, controller.signal, () => {});
  assert.equal(png.blob.type, "image/png");
  assert.equal(png.name, tableFilename(all[0]));
  const zip = await exportBuildTables(all, true, controller.signal, () => {});
  const files = unzipSync(new Uint8Array(await zip.blob.arrayBuffer()));
  assert.equal(Object.keys(files).filter((name) => name.endsWith(".png")).length, all.length);
  assert.equal(zip.failed, 0);
  assert.equal(zip.succeeded, all.length);
  assert.equal(state.unmounted, 2);
  assert.equal(state.removed, 2);
  assert.ok(!/[<>:"/\\|?*]/.test(safeFilename('a/b:c<d>')));
});

test("a failed image is reported, remaining builds export, cancellation cleans up", async () => {
  const state = harness();
  const capture = state.capture;
  state.capture = (options) => { if (state.current.id === all[0].id) throw new Error("missing image"); return capture(options); };
  const controller = new AbortController();
  const result = await exportBuildTables(all.slice(0, 2), true, controller.signal, () => {});
  assert.equal(result.failed, 1);
  assert.equal(result.succeeded, 1);
  const files = unzipSync(new Uint8Array(await result.blob.arrayBuffer()));
  assert.match(strFromU8(files["failures.txt"]), /missing image/);
  await assert.rejects(exportBuildTables(all, true, controller.signal, () => controller.abort()), { name: "AbortError" });
  assert.equal(state.unmounted, 2);
  assert.equal(state.removed, 2);
});

test("all export sheets render in three locales without missing prose or unprocessed tokens", () => {
  for (const locale of ["zhCN", "zhTW", "enUS"]) for (const data of all) {
    const html = renderToStaticMarkup(createElement(I18nProvider, {initialLocale: locale, syncDocument: false}, createElement(BuildTableSheet, {data})));
    assert.doesNotMatch(html, /译文待补齐|譯文待補齊|Translation pending|ZXQ\d+XZ|Script Formula|\[\[|\{\d+\}/, `${locale}: ${data.id}`);
  }
});
