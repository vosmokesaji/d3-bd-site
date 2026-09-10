import { I18nProvider } from "../../app/i18n/I18nProvider";
import { createTranslator, type Locale } from "../../app/i18n/core";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { toBlob } from "html-to-image";
import { strToU8, zipSync } from "fflate";
import { BuildTableSheet, type BuildTableData } from "./BuildTableView";

export function safeFilename(value: string) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").replace(/[. ]+$/g, "").slice(0, 150) || "BD";
}

export function tableFilename(data: BuildTableData, locale: Locale = "zhCN") {
  const {tr} = createTranslator(locale);
  return `${locale}-${safeFilename(`${tr(data.name)}-${data.id}-${tr(data.variant)}-${tr(data.season)}-${data.follower}`)}.png`;
}

async function readyImages(node: HTMLElement, signal: AbortSignal, locale: Locale) {
  const {tr} = createTranslator(locale);
  await document.fonts.ready;
  await Promise.all(Array.from(node.querySelectorAll("img")).map(async (img) => {
    signal.throwIfAborted();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        img.decode(),
        new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error(tr(`图片加载超时：${img.getAttribute("src")}`))), 15000); }),
      ]);
    } catch {
      throw new Error(tr(`图片加载失败：${img.getAttribute("src")}`));
    } finally { clearTimeout(timer); }
  }));
  signal.throwIfAborted();
}

export async function exportBuildTables(
  builds: BuildTableData[],
  archive: boolean,
  signal: AbortSignal,
  onProgress: (progress: { completed: number; total: number; name: string }) => void,
  locale: Locale = "zhCN",
) {
  const {tr} = createTranslator(locale);
  if (!builds.length) throw new Error(tr("没有可导出的 BD"));
  const host = document.createElement("div");
  host.className = "bd-table-export-host";
  host.setAttribute("aria-hidden", "true");
  document.body.append(host);
  const root = createRoot(host);
  const files: Record<string, Uint8Array> = {};
  const failures: string[] = [];
  let single: Blob | null = null;
  let succeeded = 0;
  try {
    for (const [index, data] of builds.entries()) {
      signal.throwIfAborted();
      onProgress({ completed: index, total: builds.length, name: `${tr(data.className)} · ${tr(data.name)}` });
      try {
        flushSync(() => root.render(<I18nProvider initialLocale={locale} syncDocument={false}><BuildTableSheet data={data} /></I18nProvider>));
        const sheet = host.firstElementChild as HTMLElement;
        await readyImages(sheet, signal, locale);
        const blob = await toBlob(sheet, { pixelRatio: 2, backgroundColor: "#07090a", width: 1440, skipFonts: true, fetchRequestInit: { signal } });
        signal.throwIfAborted();
        if (!blob || !blob.size) throw new Error(tr("浏览器未能生成图片"));
        if (archive) files[`${safeFilename(tr(data.className))}/${tableFilename(data, locale)}`] = new Uint8Array(await blob.arrayBuffer());
        else single = blob;
        succeeded += 1;
      } catch (error) {
        signal.throwIfAborted();
        if (!archive) throw error;
        failures.push(`${tr(data.className)} / ${tr(data.name)} / ${data.id}: ${error instanceof Error ? error.message : String(error)}`);
      }
      onProgress({ completed: index + 1, total: builds.length, name: tr(data.name) });
      // Let input and cancellation run between sheets; never mount the full catalog at once.
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    signal.throwIfAborted();
    if (!succeeded) throw new Error(tr("所有图片均生成失败。") + (failures[0] ?? tr("请重试")));
    if (!archive && single) return { blob: single, name: tableFilename(builds[0], locale), succeeded, failed: 0 };
    files["README.txt"] = strToU8(tr(`圣休亚瑞秘典 BD 表格\n赛季：${builds[0].season}\n每个 BD 默认用途、低巅峰、推荐随从，包含全部套装方案。\n成功 ${succeeded} 张 / 共 ${builds.length} 张。\n`));
    if (failures.length) files["failures.txt"] = strToU8(failures.join("\n"));
    // PNG is already compressed: STORE avoids expensive recompression and worker/CSP requirements.
    const zipped = zipSync(files, { level: 0 });
    return { blob: new Blob([new Uint8Array(zipped).buffer], { type: "application/zip" }), name: `${locale}-All-builds-${safeFilename(tr(builds[0].season))}.zip`, succeeded, failed: failures.length };
  } finally {
    root.unmount();
    host.remove();
  }
}
