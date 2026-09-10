"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

import { resolveRuneKey } from "../../app/i18n/core";
import type { AbilityCard, BuildFlowNode } from "./types";


export function BuildAbilitiesPanel({
  skills,
  passives,
  activeNode,
  relatedIds,
  onNodeSelect,
}: {
  skills: AbilityCard[];
  passives: AbilityCard[];
  activeNode: BuildFlowNode | null;
  relatedIds: Set<string>;
  onNodeSelect: (node: BuildFlowNode) => void;
}) {
  const { tr, t, entity } = useI18n();
  return (
    <article className="panel skills-panel" id="skills">
      <div className="panel-heading"><div><span className="section-index">{t("app.a953f09a1b6b6725")}</span><h2>{t("app.ed6a21fda639bbb9")}</h2></div><small>{t("app.96cb3b6759188a4b")}</small></div>
      <div className="skill-grid">
        {skills.map((skill) => {
          const runeId = skill.runeId ?? `${skill.id}-rune`;
          const runeLogic = skill.runeLogic ?? skill.logic;
          const skillRelated = Boolean(activeNode && relatedIds.has(skill.id));
          const runeRelated = Boolean(activeNode && relatedIds.has(runeId));
          const key = resolveRuneKey(skill);
          return (
            <div className={`skill-card ${skillRelated || runeRelated ? "related" : ""} ${activeNode && !skillRelated && !runeRelated ? "dimmed" : ""}`} key={skill.id}>
              <button className={`skill-main ${activeNode?.id === skill.id ? "active" : ""}`} onClick={() => onNodeSelect({ id: skill.id, label: skill.name, detail: skill.logic, kind: "skill", image: skill.image })}>
                <span className="skill-icon"><img src={skill.image} alt="" /></span>
                <span><strong>{entity(skill, "name")}</strong><small>{tr(skill.logic)}</small></span>
              </button>
              {skill.rune && (
                <button className={`rune-choice ${activeNode?.id === runeId ? "active" : ""}`} onClick={() => onNodeSelect({ id: runeId, label: skill.rune ?? "符文", detail: runeLogic, kind: "rune", image: skill.image })}>
                  <i className={`rune-icon rune-${key}`} />
                  <span><strong>{entity(skill, "rune")}</strong><small>{tr(runeLogic)}</small></span>
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="passives">
        <span className="passive-title">{t("app.e353d08f0a58de17")}</span>
        {passives.map((passive) => (
          <button
            key={passive.id}
            className={`${activeNode?.id === passive.id ? "active" : ""} ${activeNode && relatedIds.has(passive.id) ? "related" : ""} ${activeNode && !relatedIds.has(passive.id) ? "dimmed" : ""}`}
            onClick={() => onNodeSelect({ id: passive.id, label: passive.name, detail: passive.logic, kind: "passive", image: passive.image })}
          >
            <span><img src={passive.image} alt="" /></span>
            <strong>{entity(passive, "name")}</strong>
            <small>{tr(passive.logic)}</small>
          </button>
        ))}
      </div>
    </article>
  );
}
