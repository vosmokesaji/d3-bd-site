"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

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
  const { tr, t, entity } = useI18n();
  return (
    <article className="panel cube-panel" id="cube">
      <div className="panel-heading"><div><span className="section-index">{t("app.0b8efa5a3bf10441")}</span><h2>{t("app.01beb6a296240ebb")}</h2></div><small>{tr(seasonLabel)}</small></div>
      <div className="cube-grid">
        {powers.map((power) => (
          <button
            key={`${power.slot}-${power.id}`}
            className={`${selectedPower.id === power.id ? "selected" : ""} ${activeNode && relatedIds.has(power.id) ? "related" : ""} ${activeNode && !relatedIds.has(power.id) ? "dimmed" : ""}`}
            onClick={() => onPowerSelect(power)}
          >
            <span>{tr(power.slot)}</span>
            <img src={power.image} alt="" />
            <strong>{entity(power, "name")}</strong>
          </button>
        ))}
      </div>
      <div className="cube-detail">
        <div><img src={selectedPower.image} alt="" /><span><small>{t("app.403d3e66a5ba6453")}</small><strong>{entity(selectedPower, "name")}</strong></span></div>
        <h4>{t("app.6d598ccd441c9718")}</h4>
        <p>{tr(selectedPower.original)}</p>
        <div className="tooltip-divider" />
        <h4>{t("app.89a95bc774764b66")}</h4>
        <p>{tr(selectedPower.summary)}</p>
      </div>
    </article>
  );
}
