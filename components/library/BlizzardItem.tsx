"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

import type { OfficialItemRecord, OfficialItemSet, OfficialPropertyNode } from "./types";
import { DiabloItemFrame, type DiabloItemFrameSize } from "../items/DiabloItemFrame";

export type ItemIconShape = "default" | "square" | "big";

const SQUARE_ITEM_CATEGORIES = new Set([
  "amulet", "belt", "mighty-belt", "ring", "enchantress-focus", "scoundrel-token", "templar-relic",
  "potion", "crafting-material", "blacksmith-plan", "jeweler-design", "page-of-training", "dye", "gem", "misc",
]);

const BIG_ITEM_CATEGORIES = new Set(["chest-armor", "cloak"]);

export function officialItemIconShape(category?: string): ItemIconShape {
  if (category && BIG_ITEM_CATEGORIES.has(category)) return "big";
  if (category && SQUARE_ITEM_CATEGORIES.has(category)) return "square";
  return "default";
}

export function BlizzardItemIcon({ record, size = "md" }: { record: OfficialItemRecord; size?: DiabloItemFrameSize }) {

  const shape = officialItemIconShape(record.category);
  const quality = record.quality ?? (record.crafted ? "crafted" : "common");
  return <DiabloItemFrame image={record.image} quality={quality} shape={shape} size={size} />;
}

export function OfficialPropertyList({ entries, legendaryPower }: { entries: OfficialPropertyNode[]; legendaryPower?: string }) {
  const { tr } = useI18n();
  return (
    <ul className="official-property-list">
      {entries.map((entry, index) => {
        if (entry.kind === "choice") {
          return (
            <li className="official-property-choice" key={`${entry.label}-${index}`}>
              <span className="official-property-choice-label"><i />{tr(entry.label)}</span>
              <ul>
                {entry.options.map((option, optionIndex) => (
                  <li className={`property-icon-${option.icon}`} key={`${option.text}-${optionIndex}`}><i />{tr(option.text)}</li>
                ))}
              </ul>
            </li>
          );
        }
        const legendary = Boolean(legendaryPower && entry.text === legendaryPower);
        return <li className={`property-icon-${entry.icon} ${legendary ? "property-legendary" : ""}`} key={`${entry.text}-${index}`}><i />{tr(entry.text)}</li>;
      })}
    </ul>
  );
}

export function OfficialPropertySections({ record }: { record: OfficialItemRecord }) {
  const { tr } = useI18n();
  const sections = [
    { id: "primary", label: "主要", entries: record.properties?.primary ?? [] },
    { id: "secondary", label: "次要", entries: record.properties?.secondary ?? [] },
    { id: "other", label: "其他", entries: record.properties?.other ?? [] },
  ].filter((section) => section.entries.length > 0);
  if (sections.length === 0) return null;
  return (
    <section className="item-detail-properties" aria-label={tr("物品属性")}>
      {sections.map((section) => (
        <div className={`item-property-section section-${section.id}`} key={section.id}>
          <h3>{tr(section.label)}</h3>
          <OfficialPropertyList entries={section.entries} legendaryPower={record.legendaryPower} />
        </div>
      ))}
    </section>
  );
}

export function OfficialSetBlock({ itemSet, records }: { itemSet: OfficialItemSet; records: OfficialItemRecord[] }) {
  const { tr, t, entity } = useI18n();
  return (
    <section className="item-detail-set" aria-label={tr("套装组成与效果")}>
      {itemSet.name && <h3>{entity(itemSet, "name")}</h3>}
      <ul className="item-set-pieces">
        {itemSet.items.map((piece) => {
          const localRecord = records.find((record) => record.id === piece.id);
          const copy = <span className={piece.current ? "current" : ""}>{entity(piece, "name")}</span>;
          return <li key={piece.id}>{localRecord?.category ? <a href={`/library/${localRecord.category}/${encodeURIComponent(localRecord.id)}`}>{tr(copy)}</a> : copy}</li>;
        })}
      </ul>
      <div className="item-set-bonuses">
        {itemSet.bonuses.map((tier) => (
          <div key={tier.pieces}>
            <h4>{t("app.32ebb1abcc1c601c")}{tr(tier.pieces)}{t("app.632f9f80001afd73")}</h4>
            <OfficialPropertyList entries={tier.lines} />
          </div>
        ))}
      </div>
    </section>
  );
}
