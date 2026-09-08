"use client";

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
  return <span className={`bd-sheet-entity ${quality ? `bd-sheet-${quality}` : ""} bd-sheet-entity-${kind}`}>
    {image && <span className="bd-sheet-icon"><img src={image} alt="" loading="eager" /></span>}
    <span>{name}</span>
  </span>;
}

function GemList({ sockets }: { sockets: GearSocket[] }) {
  const groups = sockets.reduce<{ image: string; label: string; count: number }[]>((result, socket) => {
    const existing = result.find((entry) => entry.label === socket.label);
    if (existing) existing.count += 1;
    else result.push({ ...socket, count: 1 });
    return result;
  }, []);
  return groups.length ? <div className="bd-sheet-gems">{groups.map((gem) => <TableEntity key={gem.label} name={`${gem.label}${gem.count > 1 ? ` ×${gem.count}` : ""}`} image={gem.image} kind="gem" />)}</div> : <span className="bd-sheet-muted">—</span>;
}

export function BuildTableSheet({ data, followerKey = data.follower }: { data: BuildTableData; followerKey?: FollowerKey }) {
  const follower = FOLLOWERS[followerKey];
  return <article className="bd-sheet" aria-label={`${data.name} BD 表格`}>
    <header className="bd-sheet-header">
      <div><span className="bd-sheet-eyebrow">圣休亚瑞秘典 · {data.className}</span><h2>{data.name}</h2><p>{data.variant}</p></div>
      <div className="bd-sheet-season"><strong>{data.season}</strong><span>单人 BD 配装速查</span></div>
    </header>
    <div className="bd-sheet-intro">{data.summary}</div>
    {data.notice && <p className="bd-sheet-notice">{data.notice}</p>}
    <div className="bd-sheet-columns">
      <div>
        <h3 className="bd-sheet-section"><span>01</span> 装备与宝石 <small><b className="bd-sheet-rare">● 稀有</b> <b className="bd-sheet-set">● 套装</b> <b className="bd-sheet-legendary">● 传奇</b> · 词缀由高到低</small></h3>
        <table className="bd-sheet-gear"><colgroup><col className="bd-sheet-slot-col" /><col className="bd-sheet-item-col" /><col /><col className="bd-sheet-gem-col" /></colgroup><thead><tr><th scope="col">部位</th><th scope="col">装备</th><th scope="col">词缀优先级</th><th scope="col">镶嵌宝石</th></tr></thead><tbody>
          {data.gear.map((item) => <tr key={item.id}><th scope="row">{item.slot}</th><td><TableEntity name={item.name} image={item.image} quality={item.quality} /><small className="bd-sheet-quality">{item.quality === "set" ? "套装" : item.quality === "rare" ? "稀有" : "传奇"}</small></td><td><ol className="bd-sheet-affixes">{[...new Set(item.affixes)].map((affix, index) => <li key={affix}><b>{index + 1}</b>{affix}</li>)}</ol>{item.warning && <small className="bd-sheet-warning">{item.warning}</small>}</td><td><GemList sockets={item.sockets} /></td></tr>)}
        </tbody></table>
        <h3 className="bd-sheet-section"><span>02</span> 技能与符文</h3>
        <table className="bd-sheet-skills"><thead><tr><th scope="col">主动技能</th><th scope="col">技能符文</th><th scope="col">使用要点</th></tr></thead><tbody>
          {data.skills.map((skill) => <tr key={skill.id}><td><TableEntity name={skill.name} image={skill.image} kind="skill" /></td><td><span className="bd-sheet-rune"><i aria-hidden="true" className={`rune-icon rune-${skill.runeKey ?? "none"}`} /><span>{skill.rune ?? "无符文"}</span></span></td><td>{skill.logic}</td></tr>)}
        </tbody></table>
        <h3 className="bd-sheet-section"><span>03</span> 被动技能</h3>
        <div className="bd-sheet-passives">{data.passives.map((passive) => <div key={passive.id}><TableEntity name={passive.name} image={passive.image} kind="skill" /><p>{passive.logic}</p></div>)}</div>
      </div>
      <aside className="bd-sheet-sidebar">
        <h3 className="bd-sheet-section"><span>04</span> 卡奈魔方 · 萃取</h3>
        <div className="bd-sheet-powers">{data.powers.map((power) => <div key={power.id}><small>{power.slot}</small><TableEntity name={power.name} image={power.image} quality="legendary" /><p>{power.summary}</p></div>)}</div>
        <h3 className="bd-sheet-section"><span>05</span> 随从 · {follower.name}</h3>
        <p className="bd-sheet-follower-note">{followerKey === data.follower ? data.followerReason : follower.note}</p>
        <table className="bd-sheet-follower"><thead><tr><th scope="col">部位</th><th scope="col">配装与作用</th></tr></thead><tbody>{follower.items.map((item) => <tr key={item.position}><th scope="row">{item.slot}</th><td><TableEntity name={item.name} image={item.image} quality={item.quality ?? "legendary"} /><small>{item.reason}</small></td></tr>)}</tbody></table>
        <div className="bd-sheet-follower-skills">{FOLLOWER_SKILLS[followerKey].map((skill) => <TableEntity key={skill.name} name={skill.name} image={skill.image} kind="skill" />)}</div>
      </aside>
    </div>
    <h3 className="bd-sheet-section"><span>06</span> 输出手法</h3>
    <ol className="bd-sheet-rotation">{data.rotation.map((step, index) => <li key={`${step.title}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b><div><h4>{step.title}</h4><p>{step.action}</p>{step.reason && <small>{step.reason}</small>}</div></li>)}</ol>
    <div className="bd-sheet-footer"><span>圣休亚瑞秘典 · {data.className} / {data.name}</span><span>{data.season} · {follower.name}</span></div>
  </article>;
}

export function BuildTableView({ data, getAllBuilds }: { data: BuildTableData; getAllBuilds: () => BuildTableData[] }) {
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
      const result = await exportBuildTables(all ? getAllBuilds() : [{ ...data, follower }], all, abort.signal, setProgress);
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

  return <section className="bd-table-view" aria-label="BD 表格视图">
    <div className="bd-table-toolbar">
      <div className="bd-table-followers" role="group" aria-label="表格随从配装"><span>随从</span>{Object.values(FOLLOWERS).map((entry) => <button key={entry.key} aria-pressed={follower === entry.key} onClick={() => setFollower(entry.key)}>{entry.name}{entry.key === data.follower ? " · 推荐" : ""}</button>)}</div>
      <div className="bd-table-actions"><button disabled={!!progress} onClick={() => runExport(false)}>↓ 导出当前 PNG</button><button disabled={!!progress} onClick={() => runExport(true)}>↓ 全职业全部 BD · ZIP</button></div>
    </div>
    <p className="bd-table-help">当前图包含所选配置与随从。全量包含每个 BD 的默认用途、低巅峰、推荐随从及全部套装方案，按职业归档。</p>
    <div className="bd-table-status" aria-live="polite" aria-atomic="true">
      {progress ? <><progress value={progress.completed} max={progress.total} /><span>{progress.completed} / {progress.total} · {progress.name}</span><button onClick={() => { controller.current?.abort(); setMessage("已取消导出。"); }}>取消导出</button></> : message}
      {!progress && download && <a href={download.url} download={download.name}>重新下载</a>}
    </div>
    <div className="bd-table-scroll" tabIndex={0} role="region" aria-label="BD 表格，可横向滚动"><BuildTableSheet data={data} followerKey={follower} /></div>
  </section>;
}
