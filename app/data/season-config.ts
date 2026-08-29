import type { ClassId } from "./site-catalog";

export type GamePlatform = "nintendo-switch" | "pc";

export type SeasonConfig = {
  seasonId: string;
  label: string;
  number?: number;
  patch: string;
  platform: GamePlatform;
  platformLabel: string;
  modeLabel: string;
  cubeSlots: number;
  cubeLabel: string;
  theme: string;
  guideBaseline: string;
  availability: "current" | "preview";
  starterGiftSets: Partial<Record<ClassId, string>>;
  rules: {
    extraCubeSlot: boolean;
    soloOnly: boolean;
    consoleTargetingNote: boolean;
  };
};

export const CURRENT_SEASON: SeasonConfig = {
  seasonId: "s39-ns-2.7.8",
  label: "第39赛季",
  number: 39,
  patch: "2.7.8",
  platform: "nintendo-switch",
  platformLabel: "NS",
  modeLabel: "单人攻略",
  cubeSlots: 4,
  cubeLabel: "第四槽开放",
  theme: "赛季主题允许额外装备一个卡奈魔方传奇威能。",
  guideBaseline: "Nintendo Switch · 简体中文 · 单人",
  availability: "current",
  starterGiftSets: {},
  rules: {
    extraCubeSlot: true,
    soloOnly: true,
    consoleTargetingNote: true,
  },
};

// Future entries are rotation presets, not claims about an announced Blizzard season.
export const SEASON_CATALOG: SeasonConfig[] = [
  CURRENT_SEASON,
  {
    seasonId: "rotation-standard-three-slot",
    label: "标准三槽轮换",
    patch: "待定",
    platform: "nintendo-switch",
    platformLabel: "NS",
    modeLabel: "单人攻略预设",
    cubeSlots: 3,
    cubeLabel: "标准三槽",
    theme: "用于没有额外卡奈魔方槽位的轮换；页面会收起第四槽，并保留其替换提示。",
    guideBaseline: "轮换预设 · 需按实装主题复核",
    availability: "preview",
    starterGiftSets: {},
    rules: { extraCubeSlot: false, soloOnly: true, consoleTargetingNote: true },
  },
  {
    seasonId: "rotation-fourth-cube-slot",
    label: "第四槽轮换",
    patch: "待定",
    platform: "nintendo-switch",
    platformLabel: "NS",
    modeLabel: "单人攻略预设",
    cubeSlots: 4,
    cubeLabel: "第四槽开放",
    theme: "用于再次开放第四个卡奈魔方槽位的轮换；复用当前四槽阅读结构。",
    guideBaseline: "轮换预设 · 需按实装主题复核",
    availability: "preview",
    starterGiftSets: {},
    rules: { extraCubeSlot: true, soloOnly: true, consoleTargetingNote: true },
  },
];

export function seasonById(seasonId?: string) {
  return SEASON_CATALOG.find((season) => season.seasonId === seasonId) ?? CURRENT_SEASON;
}

export function seasonLabel(season: SeasonConfig) {
  return season.label;
}

export function seasonPlatformLabel(season: SeasonConfig) {
  return `${seasonLabel(season)} · ${season.platformLabel}`;
}

export function cubeSeasonLabel(season: SeasonConfig) {
  return `${seasonLabel(season)} · ${season.cubeLabel}`;
}

export const SEASON_LABEL = seasonLabel(CURRENT_SEASON);
export const SEASON_PLATFORM_LABEL = seasonPlatformLabel(CURRENT_SEASON);
export const CUBE_SEASON_LABEL = cubeSeasonLabel(CURRENT_SEASON);
