"use client";

import { useI18n } from "../../app/i18n/I18nProvider";

import { FOLLOWERS, type FollowerKey } from "../../app/data/followers";
import { FollowerCard } from "./FollowerPaperdoll";

export function FollowerShowcase({
  recommendedFollower,
  recommendation,
}: {
  recommendedFollower?: string;
  recommendation?: string;
}) {
  const { t } = useI18n();
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
      <div className="follower-rule"><b>{t("app.fede4b57e32f274f")}</b><span>{t("app.e7e4b06becf4f5c0")}</span></div>
    </>
  );
}
