"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

import {
  FOLLOWER_SKILLS,
  FOLLOWER_SLOT_ORDER,
  type FollowerDefinition,
  type FollowerSlotKey,
} from "../../app/data/followers";
import { DiabloItemFrame } from "../items/DiabloItemFrame";

const DEFAULT_SLOT_LABELS: Record<FollowerSlotKey, string> = {
  head: "头部",
  shoulders: "肩部",
  chest: "胸部",
  gloves: "手部",
  bracers: "腕部",
  belt: "腰部",
  pants: "腿部",
  boots: "脚部",
  amulet: "颈部",
  ring1: "戒指",
  ring2: "戒指",
  weapon: "武器",
  offhand: "副手",
  token: "专属饰品",
};

export function FollowerPaperdoll({ follower }: { follower: FollowerDefinition }) {
  const { tr, entity } = useI18n();
  const items = new Map(follower.items.map((item) => [item.position, item]));

  return (
    <div className="follower-paperdoll" aria-label={tr(`${follower.name}装备盘`)}>
      <div className="follower-card-model" style={{ backgroundImage: `url(${follower.model})` }} aria-hidden="true" />
      <div className="follower-silhouette" aria-hidden="true" />
      {FOLLOWER_SLOT_ORDER.map((position) => {
        const item = items.get(position);
        const slotLabel = item?.slot ?? follower.emptySlotLabels[position] ?? DEFAULT_SLOT_LABELS[position];

        if (!item) {
          return (
            <span className={`follower-item follower-item-empty follower-slot-${position}`} key={position} aria-label={tr(`${slotLabel}：未装备`)}>
              <span className="follower-empty-slot" aria-hidden="true" />
              <small>{tr(slotLabel)}</small>
            </span>
          );
        }

        return (
          <button
            type="button"
            key={`${position}-${item.name}`}
            className={`follower-item follower-slot-${position}`}
            title={`${entity(item, "name")}${tr("：")}${tr(item.reason)}`}
          >
            <DiabloItemFrame image={item.image} quality={item.quality ?? "legendary"} shape="fill" size="fill" fit="contain" />
            <small>{tr(slotLabel)}</small>
            <span className="follower-item-copy"><strong>{entity(item, "name")}</strong><em>{tr(item.reason)}</em></span>
          </button>
        );
      })}
    </div>
  );
}

export function FollowerCard({
  follower,
  recommended,
  recommendation,
}: {
  follower: FollowerDefinition;
  recommended: boolean;
  recommendation?: string;
}) {
  const { tr, entity } = useI18n();
  return (
    <section className={`follower-card follower-${follower.key} ${recommended ? "recommended" : ""}`}>
      <header>
        <span><strong>{entity(follower, "name")}</strong><small>{tr(recommended ? `首选 · ${follower.role}` : `备选 · ${follower.role}`)}</small></span>
        <img src={follower.model} alt="" />
      </header>
      <FollowerPaperdoll follower={follower} />
      <div className="follower-skill-strip">
        {FOLLOWER_SKILLS[follower.key].map((skill) => <span key={skill.name}><img src={skill.image} alt="" /><strong>{entity(skill, "name")}</strong></span>)}
      </div>
      <p>{tr(recommended && recommendation ? recommendation : follower.note)}</p>
    </section>
  );
}
