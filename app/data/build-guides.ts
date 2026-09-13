export type BuildMode = "push" | "speed";
export type BuildParagon = "low" | "high";
export type BuildPurpose = "greater-rift" | "nephalem-rift" | "echoing-nightmare" | "cosmetic-farm";
export type BuildVariantKey = `${BuildMode}-${BuildParagon}`;
export type BuildContent = "greater-rift-push" | "greater-rift-speed" | "nephalem-rift-t16" | "visions-of-enmity" | "bounty" | "echoing-nightmare" | "goblin-or-cosmetic-farm" | "nephalem-rift" | "cosmetic-farm";
export type ParagonBand = "pre-800" | "low" | "high" | "any";
export type BuildReviewStatus = "draft" | "partial" | "scenario-reviewed" | "fully-reviewed";
export type BuildEvidenceStatus = "unverified" | "source-checked" | "cross-checked" | "switch-tested" | "published";
export type BuildPlatformStatus = "switch-verified" | "console-sourced" | "pc-derived" | "platform-risk";
export type BuildDataProvenance = "hand-authored" | "batch-derived" | "generic-placeholder";
export type BuildApplicability = "recommended" | "viable" | "supported" | "not-recommended" | "not-applicable" | "unverified";

export type BuildSource = {
  id: string;
  url: string;
  title: string;
  publisher: string;
  author?: string;
  updatedAt?: string;
  accessedAt: string;
  season?: string;
  patch?: string;
  platform: "nintendo-switch" | "console" | "pc" | "cross-platform";
  content?: BuildContent[];
  snapshot?: string;
};

export type EvidenceClaim = {
  id: string;
  category: "gear" | "skills" | "passives" | "powers" | "legendary-gems" | "normal-gems" | "stats" | "paragon" | "rotation" | "applicability" | "platform";
  path: string;
  conclusion: string;
  sourceIds: string[];
  status: "unverified" | "single-source" | "cross-checked" | "switch-tested";
  conflictNote?: string;
};

export type BuildConfiguration = {
  gear: Record<string, string>;
  skills: { id: string; rune?: string }[];
  passives: string[];
  powers: Record<string, string>;
  legendaryGems: Record<string, string>;
  normalGems: Record<string, string[]>;
  follower: { id: string; items: string[]; skills: string[] };
  statPriorities: Record<string, string[]>;
  rotation: { title: string; action: string; reason: string }[];
};

export type BuildConfigurationPatch = {
  gear?: Record<string, string>;
  skills?: { id: string; rune?: string }[];
  passives?: string[];
  powers?: Record<string, string>;
  legendaryGems?: Record<string, string>;
  normalGems?: Record<string, string[]>;
  follower?: Partial<BuildConfiguration["follower"]>;
  statPriorities?: Record<string, string[]>;
  rotation?: BuildConfiguration["rotation"];
};

export type BuildScenario = {
  id: BuildVariantKey | string;
  label: string;
  content: BuildContent;
  paragonBand: ParagonBand;
  applicability: BuildApplicability;
  reason: string;
  patch?: BuildConfigurationPatch;
  unchangedReason?: string;
  sourceRefs: string[];
  sourceIds?: string[];
  configurationId?: string;
  sameAsScenarioId?: string;
  reviewedAt: string;
};

export type BuildChoicePolicy = {
  key: string;
  targetType: "gear" | "skill" | "passive" | "power" | "legendary-gem" | "normal-gem" | "follower";
  targetId: string;
  label: string;
  status: "locked" | "conditional" | "flexible";
  reason: string;
  alternatives?: {
    id: string;
    label: string;
    when: string;
    gain: string;
    cost: string;
    incompatibleWith?: string[];
    scenarios?: string[];
  }[];
};

export type ParagonGuide = {
  pre800: Record<"core" | "offense" | "defense" | "utility", { stat: string; target: string; reason: string }[]>;
  post800: { priority: string; when: string; reason: string }[];
  checkpoints: { label: string; target: string; action: string }[];
};

export type BuildConfigurationDiff = {
  category: keyof Omit<BuildConfiguration, "rotation"> | "rotation";
  key: string;
  before?: string;
  after?: string;
};

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
  hands?: 1 | 2;
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
  pushNote?: string;
  speedNote?: string;
  lowNote?: string;
  highNote?: string;
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
  configurationBase?: BuildConfiguration;
  defaultScenarioId?: string;
  scenarios?: BuildScenario[];
  paragonGuide?: ParagonGuide;
  choicePolicies?: BuildChoicePolicy[];
  reviewStatus?: BuildReviewStatus;
  evidenceStatus?: BuildEvidenceStatus;
  platformStatus?: BuildPlatformStatus;
  dataProvenance?: BuildDataProvenance;
  evidenceNote?: string;
  structuredSources?: BuildSource[];
  evidenceClaims?: EvidenceClaim[];
};

export function resolveBuildConfiguration(base: BuildConfiguration, patch: BuildConfigurationPatch = {}): BuildConfiguration {
  return {
    gear: { ...base.gear, ...patch.gear },
    skills: patch.skills ?? base.skills,
    passives: patch.passives ?? base.passives,
    powers: { ...base.powers, ...patch.powers },
    legendaryGems: { ...base.legendaryGems, ...patch.legendaryGems },
    normalGems: { ...base.normalGems, ...patch.normalGems },
    follower: {
      id: patch.follower?.id ?? base.follower.id,
      items: patch.follower?.items ?? base.follower.items,
      skills: patch.follower?.skills ?? base.follower.skills,
    },
    statPriorities: { ...base.statPriorities, ...patch.statPriorities },
    rotation: patch.rotation ?? base.rotation,
  };
}

export function resolveBuildScenarioConfiguration(guide: BuildGuide, scenario: BuildScenario): BuildConfiguration | undefined {
  if (!guide.configurationBase) return undefined;
  if (!scenario.sameAsScenarioId) return resolveBuildConfiguration(guide.configurationBase, scenario.patch);
  const visited = new Set([scenario.id]);
  let shared = guide.scenarios?.find((candidate) => candidate.id === scenario.sameAsScenarioId);
  while (shared?.sameAsScenarioId) {
    if (visited.has(shared.id)) return undefined;
    visited.add(shared.id);
    shared = guide.scenarios?.find((candidate) => candidate.id === shared?.sameAsScenarioId);
  }
  return shared ? resolveBuildConfiguration(guide.configurationBase, shared.patch) : undefined;
}

function flatConfiguration(configuration: BuildConfiguration) {
  return {
    gear: configuration.gear,
    skills: Object.fromEntries(configuration.skills.map((skill, index) => [`${index + 1}`, `${skill.id}:${skill.rune ?? ""}`])),
    passives: Object.fromEntries(configuration.passives.map((passive, index) => [`${index + 1}`, passive])),
    powers: configuration.powers,
    legendaryGems: configuration.legendaryGems,
    normalGems: Object.fromEntries(Object.entries(configuration.normalGems).map(([slot, gems]) => [slot, gems.join(",")])),
    follower: {
      id: configuration.follower.id,
      items: configuration.follower.items.join(","),
      skills: configuration.follower.skills.join(","),
    },
    statPriorities: Object.fromEntries(Object.entries(configuration.statPriorities).map(([slot, stats]) => [slot, stats.join(",")])),
    rotation: Object.fromEntries(configuration.rotation.map((step, index) => [`${index + 1}`, `${step.title}:${step.action}:${step.reason}`])),
  };
}

export function diffBuildConfigurations(base: BuildConfiguration, current: BuildConfiguration): BuildConfigurationDiff[] {
  const before = flatConfiguration(base);
  const after = flatConfiguration(current);
  return (Object.keys(before) as (keyof typeof before)[]).flatMap((category) => {
    const oldValues = before[category] as Record<string, string>;
    const newValues = after[category] as Record<string, string>;
    return [...new Set([...Object.keys(oldValues), ...Object.keys(newValues)])].flatMap((key) => (
      oldValues[key] === newValues[key] ? [] : [{ category, key, before: oldValues[key], after: newValues[key] }]
    ));
  });
}

export function validateReviewedBuildGuide(guide: BuildGuide): string[] {
  if (!guide.configurationBase || !guide.scenarios) return guide.reviewStatus && guide.reviewStatus !== "draft" ? ["已评审 BD 缺少完整场景配置"] : [];
  const errors: string[] = [];
  const scenarioIds = guide.scenarios.map((scenario) => scenario.id);
  if (new Set(scenarioIds).size !== scenarioIds.length) errors.push("场景 ID 重复");
  if (!guide.defaultScenarioId || !scenarioIds.includes(guide.defaultScenarioId)) errors.push("默认场景不存在");
  const knownGear = new Set(guide.gear.map((item) => item.id));
  const knownSkills = new Set(guide.skills.map((item) => item.id));
  const knownPassives = new Set(guide.passives.map((item) => item.id));
  const knownPowers = new Set(guide.powers.map((item) => item.id));

  for (const scenario of guide.scenarios) {
    if (!scenario.reviewedAt || scenario.sourceRefs.length === 0) errors.push(`${scenario.id} 缺少校对日期或来源`);
    if (scenario.sameAsScenarioId && (!scenarioIds.includes(scenario.sameAsScenarioId) || scenario.sameAsScenarioId === scenario.id)) errors.push(`${scenario.id}:SHARED_CONFIGURATION_TARGET_INVALID`);
    if (scenario.sameAsScenarioId && scenario.patch) errors.push(`${scenario.id}:SHARED_CONFIGURATION_WITH_PATCH`);
    const configuration = resolveBuildScenarioConfiguration(guide, scenario);
    if (!configuration) {
      errors.push(`${scenario.id}:SHARED_CONFIGURATION_CYCLE_OR_MISSING`);
      continue;
    }
    if (!["supported", "recommended", "viable"].includes(scenario.applicability)) continue;
    if (new Set(Object.values(configuration.gear)).size !== Object.values(configuration.gear).length) errors.push(`${scenario.id} 存在重复装备`);
    if (new Set(configuration.skills.map((skill) => skill.id)).size !== configuration.skills.length) errors.push(`${scenario.id} 存在重复技能`);
    if (new Set(configuration.passives).size !== configuration.passives.length) errors.push(`${scenario.id} 存在重复被动`);
    if (new Set(Object.values(configuration.powers)).size !== Object.values(configuration.powers).length) errors.push(`${scenario.id} 存在重复萃取`);
    Object.values(configuration.gear).filter((id) => !knownGear.has(id)).forEach((id) => errors.push(`${scenario.id} 使用未知装备 ${id}`));
    configuration.skills.filter((skill) => !knownSkills.has(skill.id)).forEach((skill) => errors.push(`${scenario.id} 使用未知技能 ${skill.id}`));
    configuration.passives.filter((id) => !knownPassives.has(id)).forEach((id) => errors.push(`${scenario.id} 使用未知被动 ${id}`));
    Object.values(configuration.powers).filter((id) => !knownPowers.has(id)).forEach((id) => errors.push(`${scenario.id} 使用未知萃取 ${id}`));
    if (scenario.id !== guide.defaultScenarioId && diffBuildConfigurations(guide.configurationBase, configuration).length === 0 && !scenario.unchangedReason) {
      errors.push(`${scenario.id} 与基础配置无差异且未说明原因`);
    }
  }

  for (const policy of guide.choicePolicies ?? []) {
    if (policy.status === "conditional" && !(policy.alternatives?.length)) errors.push(`${policy.key} 条件替换项缺少备选`);
    policy.alternatives?.forEach((alternative) => {
      if (!alternative.when || !alternative.gain || !alternative.cost) errors.push(`${policy.key}/${alternative.id} 缺少替换条件或取舍`);
    });
  }
  if (guide.reviewStatus === "fully-reviewed") {
    if (!guide.paragonGuide) errors.push("完整评审 BD 缺少巅峰指导");
    if (!guide.choicePolicies?.length) errors.push("完整评审 BD 缺少固定/替换策略");
  }
  return [...new Set(errors)];
}

export function validateBuildSemantics(guide: BuildGuide): string[] {
  if (!guide.configurationBase || !guide.scenarios) return [];
  const errors: string[] = [];
  const configurations = guide.scenarios
    .filter((scenario) => scenario.applicability !== "not-applicable")
    .flatMap((scenario) => {
      const configuration = resolveBuildScenarioConfiguration(guide, scenario);
      return configuration ? [[scenario.id, configuration] as const] : [];
    });

  for (const [scenarioId, configuration] of configurations) {
    const weaponId = configuration.gear.weapon;
    const equippedWeapon = guide.gear.find((item) => item.id === weaponId);
    if (equippedWeapon?.hands === 2 && configuration.gear.offhand && !configuration.passives.includes("heavenly-strength")) {
      errors.push(`${scenarioId}:TWO_HANDED_WITH_OFFHAND_REQUIRES_HEAVENLY_STRENGTH`);
    }
  }

  if (guide.id.startsWith("lod-")) {
    for (const [scenarioId, configuration] of configurations) {
      const gems = Object.values(configuration.legendaryGems);
      if (!gems.includes("lod") && !gems.includes("legacy-of-dreams") && !gems.includes("梦之遗礼")) errors.push(`${scenarioId} 缺少梦之遗礼`);
    }
  }

  if (guide.id.includes("bombardment") || guide.id.includes("thorns")) {
    for (const [scenarioId, configuration] of configurations) {
      if (configuration.normalGems.weapon?.includes("flawless-royal-emerald")) errors.push(`${scenarioId} 荆棘构筑不能使用武器绿宝石`);
    }
  }

  if (guide.dataProvenance === "generic-placeholder" && guide.reviewStatus === "fully-reviewed") {
    errors.push("通用占位数据不能标记为完整评审");
  }
  if (guide.dataProvenance === "generic-placeholder") {
    const expectedAttribute = ["力量", "敏捷", "智力"].find((attribute) => guide.gear.some((item) => item.affixes.includes(attribute)));
    const coreStats = guide.paragonGuide?.pre800.core.map((entry) => entry.stat) ?? [];
    if (expectedAttribute && !coreStats.includes(expectedAttribute)) errors.push("GENERIC_MAIN_ATTRIBUTE_MISMATCH");
    for (const [scenarioId, configuration] of configurations) {
      const armorGems = configuration.normalGems.armor ?? [];
      if (armorGems.length === 5 && armorGems.every((gem) => gem === "flawless-royal-diamond")) errors.push(`${scenarioId}:GENERIC_HIGH_PARAGON_DIAMOND_TEMPLATE`);
    }
  }
  return [...new Set(errors)];
}

export function validateBuildEvidence(guide: BuildGuide): string[] {
  const errors: string[] = [];
  if (!guide.evidenceStatus) errors.push("缺少证据状态");
  if (!guide.platformStatus) errors.push("缺少平台状态");
  const sources = guide.structuredSources ?? [];
  const sourceIds = sources.map((source) => source.id);
  const knownSourceIds = new Set(sourceIds);
  if (new Set(sourceIds).size !== sourceIds.length) errors.push("STRUCTURED_SOURCE_ID_DUPLICATE");
  for (const scenario of guide.scenarios ?? []) {
    scenario.sourceRefs.forEach((source) => {
      try {
        const url = new URL(source);
        if (url.protocol !== "https:") errors.push(`${scenario.id} 来源不是 HTTPS`);
      } catch {
        errors.push(`${scenario.id} 来源不是有效 URL`);
      }
    });
    scenario.sourceIds?.forEach((id) => {
      const source = sources.find((candidate) => candidate.id === id);
      if (!source) {
        errors.push(`${scenario.id}:UNKNOWN_SOURCE_ID:${id}`);
        return;
      }
      if (!scenario.sourceRefs.includes(source.url)) errors.push(`${scenario.id}:SOURCE_ID_URL_NOT_IN_REFS:${id}`);
      if (source.content?.length && !source.content.includes(scenario.content)) errors.push(`${scenario.id}:SOURCE_CONTENT_MISMATCH:${id}`);
    });
  }
  for (const source of sources) {
    if (!source.title.trim()) errors.push(`${source.id}:SOURCE_TITLE_MISSING`);
    if (!source.publisher.trim()) errors.push(`${source.id}:SOURCE_PUBLISHER_MISSING`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.accessedAt)) errors.push(`${source.id}:SOURCE_ACCESSED_DATE_INVALID`);
    if (source.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(source.updatedAt)) errors.push(`${source.id}:SOURCE_UPDATED_DATE_INVALID`);
    try {
      const url = new URL(source.url);
      if (url.protocol !== "https:") errors.push(`${source.id}:SOURCE_NOT_HTTPS`);
      if (url.pathname === "/" || url.pathname === "") errors.push(`${source.id}:SOURCE_NOT_EXACT_PAGE`);
    } catch {
      errors.push(`${source.id}:SOURCE_URL_INVALID`);
    }
  }
  const claimIds = (guide.evidenceClaims ?? []).map((claim) => claim.id);
  if (new Set(claimIds).size !== claimIds.length) errors.push("EVIDENCE_CLAIM_ID_DUPLICATE");
  for (const claim of guide.evidenceClaims ?? []) {
    if (claim.sourceIds.length === 0 && claim.status !== "unverified") errors.push(`${claim.id}:CLAIM_WITHOUT_SOURCE`);
    claim.sourceIds.filter((id) => !knownSourceIds.has(id)).forEach((id) => errors.push(`${claim.id}:UNKNOWN_SOURCE_ID:${id}`));
    if (claim.status === "cross-checked") {
      const publishers = new Set(claim.sourceIds.flatMap((id) => {
        const source = sources.find((candidate) => candidate.id === id);
        return source ? [source.publisher.trim().toLowerCase()] : [];
      }));
      if (publishers.size < 2) errors.push(`${claim.id}:CROSS_CHECK_REQUIRES_TWO_PUBLISHERS`);
    }
  }
  if (guide.evidenceStatus === "published" && guide.platformStatus !== "switch-verified") {
    errors.push("发布状态缺少 Nintendo Switch 实机验证");
  }
  if (guide.evidenceStatus === "published") {
    const publishers = new Set(sources.map((source) => source.publisher));
    if (publishers.size < 2) errors.push("PUBLISHED_REQUIRES_TWO_PUBLISHERS");
    if (!(guide.evidenceClaims?.length)) errors.push("PUBLISHED_REQUIRES_CLAIM_EVIDENCE");
    if (guide.evidenceClaims?.some((claim) => claim.status === "unverified" || claim.status === "single-source")) errors.push("PUBLISHED_HAS_INCOMPLETE_CLAIMS");
  }
  if (guide.dataProvenance === "generic-placeholder" && guide.evidenceStatus !== "unverified") {
    errors.push("通用占位数据必须保持未验证状态");
  }
  return [...new Set(errors)];
}

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
    reviewStatus: hasExplicitRuntimeVariants ? "partial" : "draft",
    seasonId,
  };
}
