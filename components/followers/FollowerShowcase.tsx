import { FOLLOWERS, type FollowerKey } from "../../app/data/followers";
import { FollowerCard } from "./FollowerPaperdoll";

export function FollowerShowcase({
  recommendedFollower,
  recommendation,
}: {
  recommendedFollower?: string;
  recommendation?: string;
}) {
  return (
    <>
      <div className="follower-showcase">
        {(Object.keys(FOLLOWERS) as FollowerKey[]).map((key) => {
          const follower = FOLLOWERS[key];
          return (
            <FollowerCard
              follower={follower}
              recommended={recommendedFollower === follower.name}
              recommendation={recommendation}
              key={key}
            />
          );
        })}
      </div>
      <div className="follower-rule"><b>通用原则</b><span>主属性洗成智力 / 敏捷 / 力量以匹配随从；优先冷却、攻速与坚韧。携带“不死”专属饰品后，再用团结分摊伤害。</span></div>
    </>
  );
}
