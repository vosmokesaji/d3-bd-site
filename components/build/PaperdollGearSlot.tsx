"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

import type { BuildGear, GearSocket } from "./types";
import { DiabloItemFrame } from "../items/DiabloItemFrame";

// These sprites intentionally break their frame bounds in Blizzard's paperdoll art.
const ART_OVERFLOW_POSITIONS = new Set(["head", "shoulders", "gloves", "bracers", "boots"]);

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
  const { tr, entity } = useI18n();
  return (
    <button
      className={`item-slot ${gear.quality} ${position ? `slot-${position}` : ""} ${position && ART_OVERFLOW_POSITIONS.has(position) ? "art-overflow" : ""} ${selected ? "selected" : ""} ${related ? "related" : ""} ${dimmed ? "dimmed" : ""}`}
      onClick={() => onSelect(gear.id)}
      onFocus={() => onFocusSelect?.(gear.id)}
      aria-label={`${tr(gear.slot)}: ${entity(gear)}`}
    >
      <DiabloItemFrame image={gear.image} quality={gear.quality} shape="fill" size="fill" sockets={sockets} fit="native" />
      <span className="slot-label">{tr(gear.slot)}</span>
    </button>
  );
}
