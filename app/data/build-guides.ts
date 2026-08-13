export type BuildMode = "push" | "speed";
export type BuildParagon = "low" | "high";
export type BuildPurpose = "greater-rift" | "nephalem-rift" | "echoing-nightmare" | "cosmetic-farm";
export type BuildVariantKey = `${BuildMode}-${BuildParagon}`;

export type BuildVariantProfile = {
  key: BuildVariantKey;
  mode: BuildMode;
  paragon: BuildParagon;
  title: string;
  differenceReason: string;
  gearOverrides: {
    affixPolicy: "survival" | "endgame";
    movementBoots: boolean;
    legendaryGem: "unchanged" | "boon-of-the-hoarder" | "bane-of-the-powerful";
  };
  powerOverrides: {
    replaceLastWith: "none" | "unity" | "goldwrap" | "ingeom";
  };
  skillOverrides: string[];
  statPriorities: string[];
  rotationOverrides: string[];
};

export type GuideGear = {
  id: string;
  slot: string;
  name: string;
  image: string;
  quality: "set" | "legendary";
  effect: string;
  affixes: string[];
  acquisition: string[];
  warning?: string;
  gem?: { name: string; image: string };
};

export type GuideAbility = {
  id: string;
  name: string;
  rune?: string;
  image: string;
  logic: string;
};

export type GuidePower = {
  id: string;
  slot: string;
  name: string;
  image: string;
  effect: string;
  logic: string;
  acquisition: string;
};

export type GuideLink = {
  title: string;
  category: "damage" | "defense" | "resource" | "movement";
  steps: { id: string; label: string; detail: string }[];
  conclusion: string;
};

export type BuildLoadout = {
  id: string;
  label: string;
  title: string;
  summary: string;
  bestFor: string;
  tradeoff: string;
  set?: string;
  core?: string;
  gear?: GuideGear[];
  skills?: GuideAbility[];
  passives?: GuideAbility[];
  powers?: GuidePower[];
  links?: GuideLink[];
  rotation?: { title: string; action: string; reason: string }[];
  powerSets?: Partial<Record<BuildMode, string[]>>;
  consoleNote?: string;
};

export type BuildGuide = {
  id: string;
  name: string;
  set: string;
  core: string;
  summary: string;
  difficulty: string;
  follower: "魔女" | "盗贼" | "圣殿骑士";
  followerReason: string;
  gear: GuideGear[];
  skills: GuideAbility[];
  passives: GuideAbility[];
  powers: GuidePower[];
  variants: Record<BuildMode | BuildParagon, { title: string; note: string; changes: string[] }>;
  variantProfiles?: Record<BuildVariantKey, BuildVariantProfile>;
  variantCompleteness?: "complete" | "documented-shared";
  links: GuideLink[];
  rotation: { title: string; action: string; reason: string }[];
  source: string;
  seasonId?: string;
  purpose?: BuildPurpose;
  supportedContent?: string[];
  defaultMode?: BuildMode;
  modeLabels?: Partial<Record<BuildMode, string>>;
  consoleNote?: string;
  powerSets?: Partial<Record<BuildMode, string[]>>;
  defaultLoadoutId?: string;
  loadouts?: BuildLoadout[];
};

type VariantNotes = BuildGuide["variants"];

export function createVariantProfiles(variants: VariantNotes): Record<BuildVariantKey, BuildVariantProfile> {
  const make = (mode: BuildMode, paragon: BuildParagon): BuildVariantProfile => ({
    key: `${mode}-${paragon}`,
    mode,
    paragon,
    title: `${variants[mode].title} · ${variants[paragon].title}`,
    differenceReason: `${variants[mode].note}；${variants[paragon].note}`,
    gearOverrides: {
      affixPolicy: paragon === "low" ? "survival" : "endgame",
      movementBoots: false,
      legendaryGem: "unchanged",
    },
    powerOverrides: {
      replaceLastWith: "none",
    },
    skillOverrides: [],
    statPriorities: variants[paragon].changes,
    rotationOverrides: variants[mode].changes,
  });
  return {
    "push-low": make("push", "low"),
    "push-high": make("push", "high"),
    "speed-low": make("speed", "low"),
    "speed-high": make("speed", "high"),
  };
}

export function completeBuildGuide<T extends Omit<BuildGuide, "variantProfiles" | "variantCompleteness" | "seasonId">>(guide: T, seasonId: string): T & BuildGuide {
  const candidate = guide as T & Partial<BuildGuide>;
  const hasExplicitRuntimeVariants = Boolean(
    candidate.powerSets
      || candidate.loadouts?.some((loadout) => (
        loadout.gear
        || loadout.skills
        || loadout.passives
        || loadout.powers
        || loadout.links
        || loadout.rotation
        || loadout.powerSets
      )),
  );
  return {
    ...guide,
    variantProfiles: createVariantProfiles(guide.variants),
    variantCompleteness: hasExplicitRuntimeVariants ? "complete" : "documented-shared",
    seasonId,
  };
}
