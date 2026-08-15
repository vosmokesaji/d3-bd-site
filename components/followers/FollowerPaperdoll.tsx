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
  const items = new Map(follower.items.map((item) => [item.position, item]));

  return (
    <div className="follower-paperdoll" aria-label={`${follower.name}装备盘`}>
      <div className="follower-card-model" style={{ backgroundImage: `url(${follower.model})` }} aria-hidden="true" />
      <div className="follower-silhouette" aria-hidden="true" />
      {FOLLOWER_SLOT_ORDER.map((position) => {
        const item = items.get(position);
        const slotLabel = item?.slot ?? follower.emptySlotLabels[position] ?? DEFAULT_SLOT_LABELS[position];

        if (!item) {
          return (
            <span className={`follower-item follower-item-empty follower-slot-${position}`} key={position} aria-label={`${slotLabel}：未装备`}>
              <span className="follower-empty-slot" aria-hidden="true" />
              <small>{slotLabel}</small>
            </span>
          );
        }

        return (
          <button
            type="button"
            key={`${position}-${item.name}`}
            className={`follower-item follower-slot-${position}`}
            title={`${item.name}：${item.reason}`}
          >
            <DiabloItemFrame image={item.image} quality={item.quality ?? "legendary"} shape="fill" size="fill" fit="contain" />
            <small>{slotLabel}</small>
            <span className="follower-item-copy"><strong>{item.name}</strong><em>{item.reason}</em></span>
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
  return (
    <section className={`follower-card follower-${follower.key} ${recommended ? "recommended" : ""}`}>
      <header>
        <span><strong>{follower.name}</strong><small>{recommended ? `首选 · ${follower.role}` : `备选 · ${follower.role}`}</small></span>
        <img src={follower.model} alt="" />
      </header>
      <FollowerPaperdoll follower={follower} />
      <div className="follower-skill-strip">
        {FOLLOWER_SKILLS[follower.key].map((skill) => <span key={skill.name}><img src={skill.image} alt="" /><strong>{skill.name}</strong></span>)}
      </div>
      <p>{recommended && recommendation ? recommendation : follower.note}</p>
    </section>
  );
}
