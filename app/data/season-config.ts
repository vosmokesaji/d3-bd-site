import type { ClassId } from "./site-catalog";

export type GamePlatform = "nintendo-switch" | "pc";

export type SeasonConfig = {
  seasonId: string;
  number: number;
  patch: string;
  platform: GamePlatform;
  platformLabel: string;
  modeLabel: string;
  cubeSlots: number;
  cubeLabel: string;
  theme: string;
  guideBaseline: string;
  starterGiftSets: Partial<Record<ClassId, string>>;
  rules: {
    extraCubeSlot: boolean;
    soloOnly: boolean;
    consoleTargetingNote: boolean;
  };
};

export const CURRENT_SEASON: SeasonConfig = {
  seasonId: "s39-ns-2.7.8",
  number: 39,
  patch: "2.7.8",
  platform: "nintendo-switch",
  platformLabel: "NS",
  modeLabel: "单人攻略",
  cubeSlots: 4,
  cubeLabel: "第四槽开放",
  theme: "赛季主题允许额外装备一个卡奈魔方传奇威能。",
  guideBaseline: "Nintendo Switch · 简体中文 · 单人",
  starterGiftSets: {},
  rules: {
    extraCubeSlot: true,
    soloOnly: true,
    consoleTargetingNote: true,
  },
};

export const SEASON_LABEL = `第${CURRENT_SEASON.number}赛季`;
export const SEASON_PLATFORM_LABEL = `${SEASON_LABEL} · ${CURRENT_SEASON.platformLabel}`;
export const CUBE_SEASON_LABEL = `${SEASON_LABEL} · ${CURRENT_SEASON.cubeLabel}`;
