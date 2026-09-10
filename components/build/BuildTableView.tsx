"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

import { useEffect, useRef, useState } from "react";
import type { GuideAbility } from "../../app/data/build-guides";
import { FOLLOWERS, FOLLOWER_SKILLS, type FollowerKey } from "../../app/data/followers";
import type { BuildGear, CubePowerCard, GearSocket } from "./types";
import "./build-table.css";

export type BuildTableData = {
  id: string;
  name: string;
  className: string;
  classId: string;
  variant: string;
  season: string;
  summary: string;
  notice?: string;
  gear: (Omit<BuildGear, "quality"> & { quality: "set" | "legendary" | "rare"; sockets: GearSocket[] })[];
  skills: (GuideAbility & { runeKey?: string })[];
  passives: GuideAbility[];
  powers: CubePowerCard[];
  rotation: { title: string; action: string; reason: string }[];
  follower: FollowerKey;
  followerReason: string;
  source: string;
};

export function TableEntity({ name, image, quality, kind = "item" }: { name: string; image?: string; quality?: string; kind?: "item" | "skill" | "gem" }) {
  const { entity } = useI18n();
  return <span className={`bd-sheet-entity ${quality ? `bd-sheet-${quality}` : ""} bd-sheet-entity-${kind}`}>
    {image && <span className="bd-sheet-icon"><img src={image} alt="" loading="eager" /></span>}
    <span>{entity({ name, image }, "name")}</span>
  </span>;
}

function GemList({ sockets }: { sockets: GearSocket[] }) {
  const { t } = useI18n();
  const groups = sockets.reduce<{ image: string; label: string; count: number }[]>((result, socket) => {
    const existing = result.find((entry) => entry.label === socket.label);
    if (existing) existing.count += 1;
    else result.push({ ...socket, count: 1 });
    return result;
  }, []);
  return groups.length ? <div className="bd-sheet-gems">{groups.map((gem) => <TableEntity key={gem.label} name={`${gem.label}${gem.count > 1 ? ` ×${gem.count}` : ""}`} image={gem.image} kind="gem" />)}</div> : <span className="bd-sheet-muted">{t("app.bda050585a00f0f6")}</span>;
}

export function BuildTableSheet({ data, followerKey = data.follower }: { data: BuildTableData; followerKey?: FollowerKey }) {
  const { tr, t, entity } = useI18n();
  const follower = FOLLOWERS[followerKey];
  return <article className="bd-sheet" aria-label={tr(`${data.name} BD 表格`)}>
    <header className="bd-sheet-header">
      <div className="bd-sheet-heading"><span className="bd-sheet-eyebrow">{t("app.166f372cd4bf81b0")}{" "}{tr(data.className)}</span><div className="bd-sheet-title-line"><h2>{entity(data, "name")}</h2><p>{tr(data.variant)}</p></div><div className="bd-sheet-intro">{tr(data.summary)}</div></div>
      <div className="bd-sheet-season"><strong>{tr(data.season)}</strong><span>{t("app.8e50af4e2bef3df6")}</span></div>
    </header>
    {data.notice && <p className="bd-sheet-notice">{tr(data.notice)}</p>}
    <div className="bd-sheet-columns">
      <div>
        <h3 className="bd-sheet-section"><span>{t("app.938db8c9f82c8cb5")}</span>{" "}{t("app.3ab9f7ee59e79982")}{" "}<small><b className="bd-sheet-rare">{t("app.878711c2f76c167a")}</b> <b className="bd-sheet-set">{t("app.62e38cb5bca949b4")}</b> <b className="bd-sheet-legendary">{t("app.34a721a9751de83d")}</b>{" "}{t("app.0dc0c2054e22ae18")}</small></h3>
        <table className="bd-sheet-gear"><colgroup><col className="bd-sheet-slot-col" /><col className="bd-sheet-item-col" /><col /><col className="bd-sheet-gem-col" /></colgroup><thead><tr><th scope="col">{t("app.c4322846fc0283a7")}</th><th scope="col">{t("app.144a327039fee815")}</th><th scope="col">{t("app.8151bb7f2be16abf")}</th><th scope="col">{t("app.b4bcba98915eb718")}</th></tr></thead><tbody>
          {data.gear.map((item) => <tr key={item.id}><th scope="row">{tr(item.slot)}</th><td><div className="bd-sheet-item-name"><TableEntity name={item.name} image={item.image} quality={item.quality} /><small className="bd-sheet-quality">{tr(item.quality === "set" ? "套装" : item.quality === "rare" ? "稀有" : "传奇")}</small></div></td><td><ol className="bd-sheet-affixes">{[...new Set(item.affixes)].map((affix, index) => <li key={affix}><b>{tr(index + 1)}</b>{tr(affix)}</li>)}</ol>{item.warning && <small className="bd-sheet-warning">{tr(item.warning)}</small>}</td><td><GemList sockets={item.sockets} /></td></tr>)}
        </tbody></table>
        <h3 className="bd-sheet-section"><span>{t("app.a953f09a1b6b6725")}</span>{" "}{t("app.ed6a21fda639bbb9")}</h3>
        <table className="bd-sheet-skills"><thead><tr><th scope="col">{t("app.edb7b4b3a9e3905c")}</th><th scope="col">{t("app.f360525ced2b6a62")}</th><th scope="col">{t("app.a63a1030ef50eb8d")}</th></tr></thead><tbody>
          {data.skills.map((skill) => <tr key={skill.id}><td><TableEntity name={skill.name} image={skill.image} kind="skill" /></td><td><span className="bd-sheet-rune"><i aria-hidden="true" className={`rune-icon rune-${skill.runeKey ?? "none"}`} /><span>{skill.rune ? entity(skill, "rune") : tr("无符文")}</span></span></td><td>{tr(skill.logic)}</td></tr>)}
        </tbody></table>
        <h3 className="bd-sheet-section"><span>{t("app.0b8efa5a3bf10441")}</span>{" "}{t("app.e353d08f0a58de17")}</h3>
        <div className="bd-sheet-passives">{data.passives.map((passive) => <div key={passive.id}><TableEntity name={passive.name} image={passive.image} kind="skill" /><p>{tr(passive.logic)}</p></div>)}</div>
      </div>
      <aside className="bd-sheet-sidebar">
        <h3 className="bd-sheet-section"><span>{t("app.6cd5b6e51936a442")}</span>{" "}{t("app.b43b3c54524fa3a1")}</h3>
        <div className="bd-sheet-powers">{data.powers.map((power) => <div key={power.id}><small>{tr(power.slot)}</small><TableEntity name={power.name} image={power.image} quality="legendary" /><p>{tr(power.summary)}</p></div>)}</div>
        <h3 className="bd-sheet-section"><span>{t("app.c97550ce8213ef5c")}</span>{" "}{t("app.361f1205099b031c")}{" "}{entity(follower, "name")}</h3>
        <p className="bd-sheet-follower-note">{tr(followerKey === data.follower ? data.followerReason : follower.note)}</p>
        <table className="bd-sheet-follower"><thead><tr><th scope="col">{t("app.c4322846fc0283a7")}</th><th scope="col">{t("app.d69df1cc161cb852")}</th></tr></thead><tbody>{follower.items.map((item) => <tr key={item.position}><th scope="row">{tr(item.slot)}</th><td><TableEntity name={item.name} image={item.image} quality={item.quality ?? "legendary"} /><small>{tr(item.reason)}</small></td></tr>)}</tbody></table>
        <div className="bd-sheet-follower-skills">{FOLLOWER_SKILLS[followerKey].map((skill) => <TableEntity key={skill.name} name={skill.name} image={skill.image} kind="skill" />)}</div>
      </aside>
    </div>
    <h3 className="bd-sheet-section"><span>{t("app.aacd834b5cdc64a3")}</span>{" "}{t("app.1611050fd81ecebd")}</h3>
    <ol className="bd-sheet-rotation">{data.rotation.map((step, index) => <li key={`${step.title}-${index}`}><b>{tr(String(index + 1).padStart(2, "0"))}</b><div><h4>{tr(step.title)}</h4><p>{tr(step.action)}</p>{step.reason && <small>{tr(step.reason)}</small>}</div></li>)}</ol>
    <div className="bd-sheet-footer"><span>{t("app.166f372cd4bf81b0")}{" "}{tr(data.className)}{" "}{t("app.8a5edab282632443")}{" "}{entity(data, "name")}</span><span>{tr(data.season)}{" "}{t("app.a137f17a19a09cbe")}{" "}{entity(follower, "name")}</span></div>
  </article>;
}

export function BuildTableView({ data, getAllBuilds }: { data: BuildTableData; getAllBuilds: () => BuildTableData[] }) {
  const { tr, t, entity, locale } = useI18n();
  const [follower, setFollower] = useState<FollowerKey>(data.follower);
  const [progress, setProgress] = useState<{ completed: number; total: number; name: string } | null>(null);
  const [message, setMessage] = useState("");
  const [download, setDownload] = useState<{ url: string; name: string } | null>(null);
  const controller = useRef<AbortController | null>(null);
  const downloadUrl = useRef<string | null>(null);
  useEffect(() => () => {
    controller.current?.abort();
    if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current);
  }, []);

  async function runExport(all: boolean) {
    if (controller.current) return;
    const abort = new AbortController();
    controller.current = abort;
    setMessage("");
    setProgress({ completed: 0, total: 1, name: "准备图片" });
    try {
      const { exportBuildTables } = await import("./export-build-tables");
      const result = await exportBuildTables(all ? getAllBuilds() : [{ ...data, follower }], all, abort.signal, setProgress, locale);
      if (abort.signal.aborted) return;
      if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current);
      const url = URL.createObjectURL(result.blob);
      downloadUrl.current = url;
      setDownload({ url, name: result.name });
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = result.name;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setMessage(result.failed ? `已生成 ${result.succeeded} 张，${result.failed} 张失败，详情见压缩包内失败清单。` : `已生成 ${result.succeeded} 张 BD 表格图。`);
    } catch (error) {
      if (!abort.signal.aborted) setMessage(`导出失败：${error instanceof Error ? error.message : "请重试"}`);
    } finally {
      if (controller.current === abort) {
        controller.current = null;
        setProgress(null);
      }
    }
  }

  return <section className="bd-table-view" aria-label={tr("BD 表格视图")}>
    <div className="bd-table-toolbar">
      <div className="bd-table-followers" role="group" aria-label={tr("表格随从配装")}><span>{t("app.34448448dda154c2")}</span>{Object.values(FOLLOWERS).map((entry) => <button key={entry.key} aria-pressed={follower === entry.key} onClick={() => setFollower(entry.key)}>{entity(entry, "name")}{tr(entry.key === data.follower ? " · 推荐" : "")}</button>)}</div>
      <div className="bd-table-actions"><button disabled={!!progress} onClick={() => runExport(false)}>{t("app.410bcae20d3db386")}</button><button disabled={!!progress} onClick={() => runExport(true)}>{t("app.0ab380532ec5c75b")}</button></div>
    </div>
    <p className="bd-table-help">{t("app.efa56f3072182769")}</p>
    <div className="bd-table-status" aria-live="polite" aria-atomic="true">
      {progress ? <><progress value={progress.completed} max={progress.total} /><span>{tr(progress.completed)}{" "}{t("app.8a5edab282632443")}{" "}{tr(progress.total)}{" "}{t("app.a137f17a19a09cbe")}{" "}{entity(progress, "name")}</span><button onClick={() => { controller.current?.abort(); setMessage("已取消导出。"); }}>{t("app.7eefaaff791f0761")}</button></> : message}
      {!progress && download && <a href={download.url} download={download.name}>{t("app.ff8d2afbf63e1811")}</a>}
    </div>
    <div className="bd-table-scroll" tabIndex={0} role="region" aria-label={tr("BD 表格，可横向滚动")}><BuildTableSheet data={data} followerKey={follower} /></div>
  </section>;
}
