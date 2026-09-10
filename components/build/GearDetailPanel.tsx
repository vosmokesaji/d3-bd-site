"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

import type { BuildGear, GearSocket } from "./types";
import { DiabloItemFrame, itemFrameShapeForSlot } from "../items/DiabloItemFrame";

export function GearDetailPanel({
  gear,
  sockets,
  originalEffect,
  officialItemHref,
  socketNote,
}: {
  gear: BuildGear;
  sockets: GearSocket[];
  originalEffect: string;
  officialItemHref?: string;
  socketNote?: string;
}) {
  const { tr, t, entity } = useI18n();
  return (
    <div className={`gear-detail-shell quality-${gear.quality}`}>
      <span className="tooltip-frame tooltip-frame-top" aria-hidden="true" />
      <span className="tooltip-frame tooltip-frame-right" aria-hidden="true" />
      <span className="tooltip-frame tooltip-frame-bottom" aria-hidden="true" />
      <span className="tooltip-frame tooltip-frame-left" aria-hidden="true" />
      <span className="tooltip-frame tooltip-frame-top-left" aria-hidden="true" />
      <span className="tooltip-frame tooltip-frame-top-right" aria-hidden="true" />
      <span className="tooltip-frame tooltip-frame-bottom-left" aria-hidden="true" />
      <span className="tooltip-frame tooltip-frame-bottom-right" aria-hidden="true" />
      <div className={`gear-detail blizzard-tooltip quality-${gear.quality}`}>
        <div className="tooltip-nameplate"><h3>{entity(gear, "name")}</h3></div>
        <div className="gear-detail-title">
          <DiabloItemFrame image={gear.image} quality={gear.quality} shape={itemFrameShapeForSlot(gear.slot)} size="lg" fit="contain" sockets={sockets} label={gear.name} />
          <div>
            <strong>{tr(gear.quality === "set" ? "套装物品" : "传奇物品")}</strong>
            <small>{tr(gear.slot)}</small>
            <b>{t("app.d5d059c3c9302097")}</b>
            {officialItemHref && <a className="gear-library-link" href={officialItemHref}>{t("app.38602f32df6d8ed5")}</a>}
          </div>
        </div>
        <section className="original-effect"><p>{tr(originalEffect)}</p></section>
        <div className="tooltip-divider" />
        <section className="build-gear-effect"><h4>{t("app.019c1b4eda17a160")}</h4><p>{tr(gear.effect)}</p></section>
        {sockets.length > 0 && (
          <section className="socket-advice">
            <h4>{t("app.d26be62e5c768b00")}</h4>
            {sockets.map((socket, index) => <span key={`${socket.label}-${index}`}><img src={socket.image} alt="" />{tr(socket.label)}</span>)}
            {socketNote && <small>{tr(socketNote)}</small>}
          </section>
        )}
        <div className="detail-columns">
          <div><h4>{t("app.8151bb7f2be16abf")}</h4><ol className="affix-list">{gear.affixes.map((affix, index) => <li key={affix}><b>{tr(index + 1)}</b>{tr(affix)}</li>)}</ol></div>
          <div><h4>{t("app.22d7a734fbd07997")}</h4><ul className="acquisition-list">{gear.acquisition.map((line) => <li key={line}>{tr(line)}</li>)}</ul></div>
        </div>
        {gear.warning && <div className="warning"><b>{t("app.a46603950c1df4c0")}</b>{tr(gear.warning)}</div>}
      </div>
    </div>
  );
}
