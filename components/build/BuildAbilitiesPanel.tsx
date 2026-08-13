"use client";

import type { AbilityCard, BuildFlowNode } from "./types";

function runeKeyFor(skillId: string, rune?: string) {
  if (!rune || rune.includes("全符文")) return "none";
  const keys = ["a", "b", "c", "d", "e"] as const;
  const score = Array.from(`${skillId}:${rune}`).reduce((sum, character) => sum + (character.codePointAt(0) ?? 0), 0);
  return keys[score % keys.length];
}

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
  return (
    <article className="panel skills-panel" id="skills">
      <div className="panel-heading"><div><span className="section-index">02</span><h2>技能与符文</h2></div><small>技能、符文、被动均可点击联动</small></div>
      <div className="skill-grid">
        {skills.map((skill) => {
          const runeId = skill.runeId ?? `${skill.id}-rune`;
          const runeLogic = skill.runeLogic ?? skill.logic;
          const skillRelated = Boolean(activeNode && relatedIds.has(skill.id));
          const runeRelated = Boolean(activeNode && relatedIds.has(runeId));
          const key = skill.runeKey ?? runeKeyFor(skill.id, skill.rune);
          return (
            <div className={`skill-card ${skillRelated || runeRelated ? "related" : ""} ${activeNode && !skillRelated && !runeRelated ? "dimmed" : ""}`} key={skill.id}>
              <button className={`skill-main ${activeNode?.id === skill.id ? "active" : ""}`} onClick={() => onNodeSelect({ id: skill.id, label: skill.name, detail: skill.logic, kind: "skill", image: skill.image })}>
                <span className="skill-icon"><img src={skill.image} alt="" /></span>
                <span><strong>{skill.name}</strong><small>{skill.logic}</small></span>
              </button>
              {skill.rune && (
                <button className={`rune-choice ${activeNode?.id === runeId ? "active" : ""}`} onClick={() => onNodeSelect({ id: runeId, label: skill.rune ?? "符文", detail: runeLogic, kind: "rune", image: skill.image })}>
                  <i className={`rune-icon rune-${key}`} />
                  <span><strong>{skill.rune}</strong><small>{runeLogic}</small></span>
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="passives">
        <span className="passive-title">被动技能</span>
        {passives.map((passive) => (
          <button
            key={passive.id}
            className={`${activeNode?.id === passive.id ? "active" : ""} ${activeNode && relatedIds.has(passive.id) ? "related" : ""} ${activeNode && !relatedIds.has(passive.id) ? "dimmed" : ""}`}
            onClick={() => onNodeSelect({ id: passive.id, label: passive.name, detail: passive.logic, kind: "passive", image: passive.image })}
          >
            <span><img src={passive.image} alt="" /></span>
            <strong>{passive.name}</strong>
            <small>{passive.logic}</small>
          </button>
        ))}
      </div>
    </article>
  );
}
