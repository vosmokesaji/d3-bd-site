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
  gear: (Omit<BuildGear, "quality"> & { quality: "set" | "legendary"; sockets: GearSocket[] })[];
  skills: (GuideAbility & { runeKey?: string })[];
  passives: GuideAbility[];
  powers: CubePowerCard[];
  rotation: { title: string; action: string; reason: string }[];
  follower: FollowerKey;
  followerReason: string;
  source: string;
};

type BuildRole = "output" | "boost" | "defense" | "movement" | "control";

const BUILD_ROLES: { key: BuildRole; label: string }[] = [
  { key: "output", label: "主要输出" },
  { key: "boost", label: "增伤" },
  { key: "defense", label: "减伤" },
  { key: "movement", label: "位移" },
  { key: "control", label: "控制" },
];

function buildRoles(entry: { name: string; logic?: string; summary?: string }): BuildRole[] {
  const text = `${entry.name} ${entry.logic ?? ""} ${entry.summary ?? ""}`;
  const roles: BuildRole[] = [];
  if (/主要伤害|主伤害|主输出|核心输出|唯一主伤|伤害来源|复制.*(?:伤害|技能)|自动施放.*(?:伤害|技能)/.test(text)) roles.push("output");
  if (/增伤|提高.*伤害|伤害提高|放大|乘区|易伤|暴击|攻速|元素周期|承受.*伤害/.test(text)) roles.push("boost");
  if (/减伤|伤害减免|护甲|保命|无敌|治疗|恢复|护盾|坚韧|免疫/.test(text)) roles.push("defense");
  if (/位移|移速|移动速度|跳图|赶路|冲刺|传送|穿行/.test(text)) roles.push("movement");
  if (/控制|眩晕|昏迷|冻结|冰冻|击退|聚怪|恐惧|减速|定身|致盲|诅咒/.test(text)) roles.push("control");
  if (entry.name === "血魂双分") return [...new Set<BuildRole>(["boost", ...roles.filter((role) => role !== "output")])];
  if (entry.name === "死亡新星") return [...new Set<BuildRole>(["output", ...roles])];
  return roles.length ? roles : ["boost"];
}

function RoleMarks({ roles }: { roles: BuildRole[] }) {
  const { tr } = useI18n();
  return <span className="bd-sheet-role-marks">{roles.map((role) => <small key={role} className={`bd-sheet-role bd-sheet-role-${role}`}>{tr(BUILD_ROLES.find((item) => item.key === role)?.label ?? role)}</small>)}</span>;
}

function RoleLegend() {
  const { tr } = useI18n();
  return <small className="bd-sheet-role-legend">{BUILD_ROLES.map((role) => <b key={role.key} className={`bd-sheet-role bd-sheet-role-${role.key}`}>{tr(role.label)}</b>)}</small>;
}

function isCraftedGear(item: BuildTableData["gear"][number]) {
  return [...item.acquisition, item.warning ?? ""].some((line) => /铁匠.*锻造|锻造套装|设计图/.test(line));
}

function compactAffixLabel(affix: string, locale: string) {
  const sockets = affix.match(/(\d+)(?:个)?镶孔/);
  if (sockets) return locale === "enUS" ? `Sockets ×${sockets[1]}` : `孔×${sockets[1]}`;
  const source = affix.replace(/（[^）]*）|\([^)]*\)/g, "").replace(/\s*→.*$/, "").trim();
  const en: [RegExp, string][] = [
    [/智力/, "INT"], [/力量/, "STR"], [/敏捷/, "DEX"], [/体能/, "VIT"], [/全元素抗性|全抗/, "All Res"],
    [/暴击几率/, "CHC"], [/暴击伤害/, "CHD"], [/冷却缩减/, "CDR"], [/范围伤害/, "AD"], [/精英伤害/, "Elite dmg"],
    [/攻击速度|攻速/, "IAS"], [/生命%/, "Life%"], [/护甲/, "Armor"], [/移动速度/, "Move"], [/资源减耗|能量消耗降低/, "RCR"],
    [/镶孔|拉玛兰迪打孔/, "Socket"], [/高伤害范围/, "Damage range"], [/高白字伤害|高白字/, "Weapon dmg"], [/伤害%/, "ED"],
    [/物理技能伤害/, "Physical"], [/冰霜技能伤害/, "Cold"], [/火焰技能伤害/, "Fire"], [/毒素技能伤害/, "Poison"], [/闪电技能伤害/, "Lightning"],
    [/.*(?:技能)?伤害/, "Skill dmg"],
  ];
  if (locale === "enUS") return en.find(([pattern]) => pattern.test(source))?.[1] ?? source;
  const elemental = source.match(/(物理|冰霜|火焰|毒素|闪电)技能伤害/);
  if (elemental) return elemental[1] + String.fromCodePoint(locale === "zhTW" ? 20663 : 20260);
  const replacements: [RegExp, string][] = [
    [/智力/, "智"], [/力量/, "力"], [/敏捷/, "敏"], [/体能/, locale === "zhTW" ? "體" : "体"],
    [/全元素抗性/, "全抗"], [/暴击几率/, locale === "zhTW" ? "爆率" : "暴率"], [/暴击伤害/, "爆伤"],
    [/冷却缩减/, "CDR"], [/范围伤害/, "AD"], [/精英伤害/, "精英伤"], [/伤害%/, "ED"], [/攻击速度/, "攻速"],
    [/镶孔|拉玛兰迪打孔/, "孔"], [/高伤害范围/, "白字范围"], [/高白字伤害|高白字/, "白字"],
    [/死亡新星伤害|尸爆伤害|尸枪术伤害|骨矛伤害|旋风斩伤害|痛割伤害|上古之矛伤害|先祖之锤伤害|地震伤害|狂乱伤害/, "技能伤"],
  ];
  return replacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), source);
}

function affixMaximum(affix: string, slot: string, locale: string) {
  const source = affix.replace(/（[^）]*）|\([^)]*\)/g, "");
  const value = (() => {
    const sockets = source.match(/(\d+)(?:个)?镶孔/);
    if (sockets) return `${sockets[1]}孔`;
    if (/镶孔|拉玛兰迪打孔/.test(source)) return "1孔";
    if (/暴击几率/.test(source)) return ["手部", "颈部", "副手"].includes(slot) ? "10%" : "6%";
    if (/暴击伤害/.test(source)) return slot === "颈部" ? "100%" : "50%";
    if (/冷却缩减/.test(source)) return slot === "主手" ? "10%" : "8%";
    if (/范围伤害/.test(source)) return slot === "主手" ? "24%" : "20%";
    if (/精英伤害/.test(source)) return "30%";
    if (/攻击速度|攻速/.test(source)) return "7%";
    if (/(物理|冰霜|火焰|毒素|闪电)技能伤害/.test(source)) return "20%";
    if (/技能伤害|死亡新星伤害|尸爆伤害|尸枪术伤害|骨矛伤害|旋风斩伤害|痛割伤害|上古之矛伤害|先祖之锤伤害|地震伤害|狂乱伤害/.test(source)) return "15%";
    if (/生命%/.test(source)) return "15%";
    if (/伤害%/.test(source)) return "10%";
    if (/移动速度/.test(source)) return "12%";
    if (/资源减耗|能量消耗降低/.test(source)) return "8%";
    if (/全元素抗性|全抗/.test(source)) return "130";
    if (/护甲/.test(source)) return "775";
    if (/智力|力量|敏捷|体能/.test(source)) return ["手部", "颈部", "主手", "副手"].includes(slot) ? "1000" : "650";
    if (/最大.*(?:能量|魂能|怒气|奥能|精气|憎恨|戒律)/.test(source)) return "20";
    if (/特效/.test(source)) return source.match(/\d+%/)?.[0] ?? "满特效";
    if (/高伤害范围|高白字/.test(source)) return "满白字";
    return "满值";
  })();
  if (locale === "enUS") return value.replace("孔", " socket").replace("满白字", "max roll").replace("满特效", "max power").replace("满值", "max roll");
  return locale === "zhTW" ? value.replace("满", "滿") : value;
}

export function TableEntity({ name, image, quality, kind = "item" }: { name: string; image?: string; quality?: string; kind?: "item" | "skill" | "gem" }) {
  const { entity } = useI18n();
  return <span className={`bd-sheet-entity ${quality ? `bd-sheet-${quality}` : ""} bd-sheet-entity-${kind}`}>
    {image && <span className="bd-sheet-icon"><img src={image} alt="" loading="eager" /></span>}
    <span>{entity({ name, image }, "name")}</span>
  </span>;
}

function GemList({ sockets }: { sockets: GearSocket[] }) {
  const { t, tr, locale } = useI18n();
  const compactLabel = (label: string) => {
    const match = label.match(/([红白绿黄紫])宝石[：:](.+)$/);
    if (!match) return tr(label);
    const colorCode = match[1].codePointAt(0) ?? 0;
    const englishColors: Record<number, string> = { 32418: "Red", 30333: "White", 32511: "Green", 40644: "Yellow", 32043: "Purple" };
    const traditionalColors: Record<number, number> = { 32418: 32005, 30333: 30333, 32511: 32160, 40644: 40643, 32043: 32043 };
    const color = locale === "enUS" ? englishColors[colorCode] : String.fromCodePoint(locale === "zhTW" ? traditionalColors[colorCode] : colorCode);
    const effect = match[2].includes("/") ? `${tr("冷却缩减")} / ${tr("全抗")}` : tr(match[2]);
    return `${color} · ${effect}`;
  };
  const groups = sockets.reduce<{ image: string; label: string; count: number }[]>((result, socket) => {
    const existing = result.find((entry) => entry.label === socket.label);
    if (existing) existing.count += 1;
    else result.push({ ...socket, count: 1 });
    return result;
  }, []);
  return groups.length ? <div className="bd-sheet-gems">{groups.map((gem) => <span key={gem.label} className="bd-sheet-entity bd-sheet-entity-gem"><span className="bd-sheet-icon"><img src={gem.image} alt="" loading="eager" /></span><span>{compactLabel(gem.label)}{gem.count > 1 ? ` ×${gem.count}` : ""}</span></span>)}</div> : <span className="bd-sheet-muted">{t("app.bda050585a00f0f6")}</span>;
}

function GearNotes({ item }: { item: BuildTableData["gear"][number] }) {
  const { tr, t } = useI18n();
  return <div className="bd-sheet-gear-notes">
    <ul>{item.acquisition.map((line) => <li key={line}>{tr(line)}</li>)}</ul>
    {item.warning && <p><b>{t("app.a46603950c1df4c0")}</b>{tr(item.warning)}</p>}
  </div>;
}

export function BuildTableSheet({ data, followerKey = data.follower }: { data: BuildTableData; followerKey?: FollowerKey }) {
  const { tr, t, entity, locale } = useI18n();
  const follower = FOLLOWERS[followerKey];
  return <article className="bd-sheet" aria-label={tr(`${data.name} BD 表格`)}>
    <header className="bd-sheet-header">
      <div className="bd-sheet-heading"><span className="bd-sheet-eyebrow">{t("app.166f372cd4bf81b0")}{" "}{tr(data.className)}</span><div className="bd-sheet-title-line"><h2>{entity(data, "name")}</h2><p>{tr(data.variant)}</p></div><div className="bd-sheet-intro">{tr(data.summary)}</div></div>
      <div className="bd-sheet-season"><strong>{tr(data.season)}</strong><span>{t("app.8e50af4e2bef3df6")}</span></div>
    </header>
    {data.notice && <p className="bd-sheet-notice">{tr(data.notice)}</p>}
    <div className="bd-sheet-content">
        <h3 className="bd-sheet-section"><span>{t("app.938db8c9f82c8cb5")}</span>{" "}{t("app.3ab9f7ee59e79982")}{" "}<small className="bd-sheet-legend"><b className="bd-sheet-crafted">{tr("铁匠锻造")}</b><b className="bd-sheet-set">{t("app.62e38cb5bca949b4")}</b><b className="bd-sheet-legendary">{t("app.34a721a9751de83d")}</b><em>{tr("CDR=冷却缩减 · AD=范围伤害 · ED=百分比伤害")}</em></small></h3>
        <table className="bd-sheet-gear"><colgroup><col className="bd-sheet-slot-col" /><col className="bd-sheet-item-col" /><col className="bd-sheet-affix-col" /><col className="bd-sheet-gem-col" /><col className="bd-sheet-note-col" /></colgroup><thead><tr><th scope="col">{t("app.c4322846fc0283a7")}</th><th scope="col">{t("app.144a327039fee815")}</th><th scope="col"><span>{t("app.8151bb7f2be16abf")}</span><small>{tr("下方小字为单件最大值")}</small></th><th scope="col">{t("app.b4bcba98915eb718")}</th><th scope="col"><span>{t("app.22d7a734fbd07997")}</span><small>{t("app.a46603950c1df4c0")}</small></th></tr></thead><tbody>
          {data.gear.map((item) => {
            const displayQuality = isCraftedGear(item) ? "crafted" : item.quality;
            return <tr key={item.id}><th scope="row">{tr(item.slot)}</th><td><div className="bd-sheet-item-name"><TableEntity name={item.name} image={item.image} quality={displayQuality} /><span className="bd-sheet-sr-only">{tr(displayQuality === "crafted" ? "铁匠锻造" : displayQuality === "set" ? "套装" : "传奇")}</span></div></td><td><ol className="bd-sheet-affixes">{[...new Set(item.affixes)].map((affix) => <li key={affix}><strong>{compactAffixLabel(affix, locale)}</strong><small>{affixMaximum(affix, item.slot, locale)}</small></li>)}</ol></td><td><GemList sockets={item.sockets} /></td><td><GearNotes item={item} /></td></tr>;
          })}
        </tbody></table>
        <div className="bd-sheet-skills-cube-grid">
          <section>
            <h3 className="bd-sheet-section"><span>{t("app.a953f09a1b6b6725")}</span>{" "}{t("app.ed6a21fda639bbb9")}<RoleLegend /></h3>
            <table className="bd-sheet-skills"><thead><tr><th scope="col">{t("app.edb7b4b3a9e3905c")}</th><th scope="col">{t("app.f360525ced2b6a62")}</th></tr></thead><tbody>
              {data.skills.map((skill) => { const roles = buildRoles(skill); return <tr key={skill.id} className={`bd-sheet-role-row bd-sheet-role-row-${roles[0]}`}><td><div className="bd-sheet-role-head"><TableEntity name={skill.name} image={skill.image} kind="skill" /><RoleMarks roles={roles} /></div></td><td><span className="bd-sheet-rune"><i aria-hidden="true" className={`rune-icon rune-${skill.runeKey ?? "none"}`} /><span>{skill.rune ? entity(skill, "rune") : tr("无符文")}</span></span></td></tr>; })}
            </tbody></table>
          </section>
          <section className="bd-sheet-cube-section">
            <h3 className="bd-sheet-section"><span>{t("app.6cd5b6e51936a442")}</span>{" "}{t("app.b43b3c54524fa3a1")}</h3>
            <div className="bd-sheet-powers">{data.powers.map((power) => { const roles = buildRoles(power); return <div key={power.id} className={`bd-sheet-role-panel bd-sheet-role-panel-${roles[0]}`}><div className="bd-sheet-role-head"><small>{tr(power.slot)}</small><TableEntity name={power.name} image={power.image} quality="legendary" /><RoleMarks roles={roles} /></div><p>{tr(power.summary)}</p></div>; })}</div>
          </section>
        </div>
        <h3 className="bd-sheet-section"><span>{t("app.0b8efa5a3bf10441")}</span>{" "}{t("app.e353d08f0a58de17")}</h3>
        <div className="bd-sheet-passives">{data.passives.map((passive) => { const roles = buildRoles(passive); return <div key={passive.id} className={`bd-sheet-role-panel bd-sheet-role-panel-${roles[0]}`}><div className="bd-sheet-role-head"><TableEntity name={passive.name} image={passive.image} kind="skill" /><RoleMarks roles={roles} /></div><p>{tr(passive.logic)}</p></div>; })}</div>
        <section className="bd-sheet-follower-section">
          <h3 className="bd-sheet-section"><span>{t("app.c97550ce8213ef5c")}</span>{" "}{t("app.361f1205099b031c")}{" "}{entity(follower, "name")}</h3>
          <p className="bd-sheet-follower-note">{tr(followerKey === data.follower ? data.followerReason : follower.note)}</p>
          <div className="bd-sheet-follower-items">{follower.items.map((item) => <div key={item.position}><small>{tr(item.slot)}</small><TableEntity name={item.name} image={item.image} quality={item.quality ?? "legendary"} /><p>{tr(item.reason)}</p></div>)}</div>
          <div className="bd-sheet-follower-skills">{FOLLOWER_SKILLS[followerKey].map((skill) => <TableEntity key={skill.name} name={skill.name} image={skill.image} kind="skill" />)}</div>
        </section>
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
