import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { toBlob } from "html-to-image";
import { strToU8, zipSync } from "fflate";
import { BuildTableSheet, type BuildTableData } from "./BuildTableView";

export function safeFilename(value: string) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").replace(/[. ]+$/g, "").slice(0, 150) || "BD";
}

export function tableFilename(data: BuildTableData) {
  return `${safeFilename(`${data.name}-${data.id}-${data.variant}-${data.season}-${data.follower}`)}.png`;
}

async function readyImages(node: HTMLElement, signal: AbortSignal) {
  await document.fonts.ready;
  await Promise.all(Array.from(node.querySelectorAll("img")).map(async (img) => {
    signal.throwIfAborted();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        img.decode(),
        new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error(`图片加载超时：${img.getAttribute("src")}`)), 15000); }),
      ]);
    } catch {
      throw new Error(`图片加载失败：${img.getAttribute("src")}`);
    } finally { clearTimeout(timer); }
  }));
  signal.throwIfAborted();
}

export async function exportBuildTables(
  builds: BuildTableData[],
  archive: boolean,
  signal: AbortSignal,
  onProgress: (progress: { completed: number; total: number; name: string }) => void,
) {
  if (!builds.length) throw new Error("没有可导出的 BD");
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
      onProgress({ completed: index, total: builds.length, name: `${data.className} · ${data.name}` });
      try {
        flushSync(() => root.render(<BuildTableSheet data={data} />));
        const sheet = host.firstElementChild as HTMLElement;
        await readyImages(sheet, signal);
        const blob = await toBlob(sheet, { pixelRatio: 2, backgroundColor: "#07090a", width: 1440, skipFonts: true, fetchRequestInit: { signal } });
        signal.throwIfAborted();
        if (!blob || !blob.size) throw new Error("浏览器未能生成图片");
        if (archive) files[`${safeFilename(data.className)}/${tableFilename(data)}`] = new Uint8Array(await blob.arrayBuffer());
        else single = blob;
        succeeded += 1;
      } catch (error) {
        signal.throwIfAborted();
        if (!archive) throw error;
        failures.push(`${data.className} / ${data.name} / ${data.id}: ${error instanceof Error ? error.message : String(error)}`);
      }
      onProgress({ completed: index + 1, total: builds.length, name: data.name });
      // Let input and cancellation run between sheets; never mount the full catalog at once.
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    signal.throwIfAborted();
    if (!succeeded) throw new Error(`所有图片均生成失败。${failures[0] ?? "请重试"}`);
    if (!archive && single) return { blob: single, name: tableFilename(builds[0]), succeeded, failed: 0 };
    files["导出说明.txt"] = strToU8(`圣休亚瑞秘典 BD 表格\n赛季：${builds[0].season}\n每个 BD 默认用途、低巅峰、推荐随从，包含全部套装方案。\n成功 ${succeeded} 张 / 共 ${builds.length} 张。\n`);
    if (failures.length) files["失败清单.txt"] = strToU8(failures.join("\n"));
    // PNG is already compressed: STORE avoids expensive recompression and worker/CSP requirements.
    const zipped = zipSync(files, { level: 0 });
    return { blob: new Blob([new Uint8Array(zipped).buffer], { type: "application/zip" }), name: `全职业BD表格-${safeFilename(builds[0].season)}.zip`, succeeded, failed: failures.length };
  } finally {
    root.unmount();
    host.remove();
  }
}
