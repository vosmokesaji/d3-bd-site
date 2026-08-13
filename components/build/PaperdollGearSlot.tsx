"use client";

import type { BuildGear, GearSocket } from "./types";

function GearSocketStack({ sockets }: { sockets: GearSocket[] }) {
  if (sockets.length === 0) return null;
  return (
    <span className="socket-stack" aria-label={sockets.map((socket) => socket.label).join("、")}>
      {sockets.map((socket, index) => (
        <span className="socket" key={`${socket.label}-${index}`}>
          <img src={socket.image} alt="" />
        </span>
      ))}
    </span>
  );
}

export function PaperdollGearSlot({
  gear,
  position,
  selected,
  related,
  dimmed,
  sockets = [],
  onSelect,
  onPreview,
}: {
  gear: BuildGear;
  position?: string;
  selected?: boolean;
  related?: boolean;
  dimmed?: boolean;
  sockets?: GearSocket[];
  onSelect: (id: string) => void;
  onPreview: (id: string) => void;
}) {
  return (
    <button
      className={`item-slot ${gear.quality} ${position ? `slot-${position}` : ""} ${selected ? "selected" : ""} ${related ? "related" : ""} ${dimmed ? "dimmed" : ""}`}
      onClick={() => onSelect(gear.id)}
      onMouseEnter={() => onPreview(gear.id)}
      onFocus={() => onPreview(gear.id)}
      aria-label={`${gear.slot}：${gear.name}`}
    >
      <span className="item-glow" />
      <span className="item-image"><img src={gear.image} alt="" /></span>
      <GearSocketStack sockets={sockets} />
      <span className="slot-label">{gear.slot}</span>
    </button>
  );
}
