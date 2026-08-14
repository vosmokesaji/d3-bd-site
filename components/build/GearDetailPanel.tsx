import type { BuildGear, GearSocket } from "./types";
import { DiabloItemFrame, itemFrameShapeForSlot } from "../items/DiabloItemFrame";

export function GearDetailPanel({
  gear,
  sockets,
  originalEffect,
  socketNote,
}: {
  gear: BuildGear;
  sockets: GearSocket[];
  originalEffect: string;
  socketNote?: string;
}) {
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
        <div className="tooltip-nameplate"><h3>{gear.name}</h3></div>
        <div className="gear-detail-title">
          <DiabloItemFrame image={gear.image} quality={gear.quality} shape={itemFrameShapeForSlot(gear.slot)} size="lg" sockets={sockets} label={gear.name} />
          <div>
            <strong>{gear.quality === "set" ? "套装物品" : "传奇物品"}</strong>
            <small>{gear.slot}</small>
            <b>远古 / 太古均可用</b>
          </div>
        </div>
        <section className="original-effect"><p>{originalEffect}</p></section>
        <div className="tooltip-divider" />
        <section className="build-gear-effect"><h4>这件装备在 BD 里做什么</h4><p>{gear.effect}</p></section>
        {sockets.length > 0 && (
          <section className="socket-advice">
            <h4>镶嵌</h4>
            {sockets.map((socket, index) => <span key={`${socket.label}-${index}`}><img src={socket.image} alt="" />{socket.label}</span>)}
            {socketNote && <small>{socketNote}</small>}
          </section>
        )}
        <div className="detail-columns">
          <div><h4>词缀优先级</h4><ol className="affix-list">{gear.affixes.map((affix, index) => <li key={affix}><b>{index + 1}</b>{affix}</li>)}</ol></div>
          <div><h4>怎么获得</h4><ul className="acquisition-list">{gear.acquisition.map((line) => <li key={line}>{line}</li>)}</ul></div>
        </div>
        {gear.warning && <div className="warning"><b>避坑</b>{gear.warning}</div>}
      </div>
    </div>
  );
}
