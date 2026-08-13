"use client";

import type { BuildFlowNode, CubePowerCard } from "./types";

export function KanaiCubePanel({
  powers,
  selectedPower,
  activeNode,
  relatedIds,
  seasonLabel,
  onPowerSelect,
}: {
  powers: CubePowerCard[];
  selectedPower: CubePowerCard;
  activeNode: BuildFlowNode | null;
  relatedIds: Set<string>;
  seasonLabel: string;
  onPowerSelect: (power: CubePowerCard) => void;
}) {
  return (
    <article className="panel cube-panel" id="cube">
      <div className="panel-heading"><div><span className="section-index">03</span><h2>卡奈魔方</h2></div><small>{seasonLabel}</small></div>
      <div className="cube-grid">
        {powers.map((power) => (
          <button
            key={`${power.slot}-${power.id}`}
            className={`${selectedPower.id === power.id ? "selected" : ""} ${activeNode && relatedIds.has(power.id) ? "related" : ""} ${activeNode && !relatedIds.has(power.id) ? "dimmed" : ""}`}
            onClick={() => onPowerSelect(power)}
          >
            <span>{power.slot}</span>
            <img src={power.image} alt="" />
            <strong>{power.name}</strong>
          </button>
        ))}
      </div>
      <div className="cube-detail">
        <div><img src={selectedPower.image} alt="" /><span><small>当前威能</small><strong>{selectedPower.name}</strong></span></div>
        <h4>游戏原特效</h4>
        <p>{selectedPower.original}</p>
        <div className="tooltip-divider" />
        <h4>一句话看懂</h4>
        <p>{selectedPower.summary}</p>
      </div>
    </article>
  );
}
