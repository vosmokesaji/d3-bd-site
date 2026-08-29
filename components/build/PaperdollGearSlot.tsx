"use client";

import type { BuildGear, GearSocket } from "./types";
import { DiabloItemFrame } from "../items/DiabloItemFrame";

export function PaperdollGearSlot({
  gear,
  position,
  selected,
  related,
  dimmed,
  sockets = [],
  onSelect,
  onFocusSelect,
}: {
  gear: BuildGear;
  position?: string;
  selected?: boolean;
  related?: boolean;
  dimmed?: boolean;
  sockets?: GearSocket[];
  onSelect: (id: string) => void;
  onFocusSelect?: (id: string) => void;
}) {
  return (
    <button
      className={`item-slot ${gear.quality} ${position ? `slot-${position}` : ""} ${selected ? "selected" : ""} ${related ? "related" : ""} ${dimmed ? "dimmed" : ""}`}
      onClick={() => onSelect(gear.id)}
      onFocus={() => onFocusSelect?.(gear.id)}
      aria-label={`${gear.slot}：${gear.name}`}
    >
      <DiabloItemFrame image={gear.image} quality={gear.quality} shape="fill" size="fill" sockets={sockets} fit="native" />
      <span className="slot-label">{gear.slot}</span>
    </button>
  );
}
