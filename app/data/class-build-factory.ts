import { completeBuildGuide, type BuildConfiguration, type BuildGuide, type BuildLoadout, type BuildScenario, type GuideAbility, type GuideGear, type GuideLink, type GuidePower, type ParagonGuide } from "./build-guides";
import { CURRENT_SEASON } from "./season-config";
import { itemAsset, skillAsset } from "./assets";

export type ClassKey = "crusader" | "demon-hunter" | "monk" | "witch-doctor" | "wizard";

export type GemKey = "trapped" | "stricken" | "zei" | "lod" | "taeguk" | "simplicity" | "enforcer" | "gogok" | "powerful" | "wreath" | "hoarder";

export type GearSeed = {
  id: string;
  slot: string;
  name: string;
  file: string;
  effect: string;
  quality?: "set" | "legendary";
  skill?: string;
  element?: string;
  base?: string;
  method?: string[];
  warning?: string;
  gem?: GemKey;
};

export type AbilitySeed = {
  id: string;
  name: string;
  rune?: string;
  logic: string;
};

export type PowerSeed = {
  id: string;
  slot: string;
  name: string;
  file: string;
  effect: string;
  logic: string;
  method?: string;
};

export type LinkSeed = {
  title: string;
  category: GuideLink["category"];
  conclusion: string;
  steps: Array<[id: string, label: string, detail: string]>;
};

export type LoadoutSeed = {
  id: string;
  label: string;
  title: string;
  summary: string;
  bestFor: string;
  tradeoff: string;
  set?: string;
  core?: string;
  gear?: GearSeed[];
  skills?: AbilitySeed[];
  passives?: AbilitySeed[];
  powers?: PowerSeed[];
  links?: LinkSeed[];
  rotation?: BuildGuide["rotation"];
  powerSets?: BuildGuide["powerSets"];
  consoleNote?: string;
};

export type ClassGuideSeed = {
  classKey: ClassKey;
  id: string;
  name: string;
  set: string;
  core: string;
  summary: string;
  difficulty: string;
  follower: BuildGuide["follower"];
  followerReason: string;
  element: string;
  coreSkill: string;
  gear: GearSeed[];
  skills: AbilitySeed[];
  passives: AbilitySeed[];
  powers: PowerSeed[];
  links: LinkSeed[];
  rotation: BuildGuide["rotation"];
  pushNote: string;
  speedNote: string;
  lowNote: string;
  highNote: string;
  source: string;
  purpose?: BuildGuide["purpose"];
  supportedContent?: string[];
  defaultMode?: BuildGuide["defaultMode"];
  modeLabels?: BuildGuide["modeLabels"];
  consoleNote?: string;
  powerSets?: BuildGuide["powerSets"];
  defaultLoadoutId?: string;
  loadouts?: LoadoutSeed[];
};

export const GEMS: Record<GemKey, { name: string; image: string }> = {
  trapped: { name: "困者之灾", image: itemAsset("bane-of-the-trapped-unique_gem_002_x1.png") },
  stricken: { name: "受罚者之灾", image: itemAsset("bane-of-the-stricken-unique_gem_018_x1.png") },
  zei: { name: "贼神的复仇之石", image: itemAsset("zeis-stone-of-vengeance-unique_gem_012_x1.png") },
  lod: { name: "梦之遗礼", image: itemAsset("legacy-of-dreams-unique_gem_023_x1.png") },
  taeguk: { name: "太极石", image: itemAsset("taeguk-unique_gem_015_x1.png") },
  simplicity: { name: "至简之力", image: itemAsset("simplicitys-strength-unique_gem_013_x1.png") },
  enforcer: { name: "侍从宝石", image: itemAsset("enforcer-unique_gem_010_x1.png") },
  gogok: { name: "迅捷勾玉", image: itemAsset("gogok-of-swiftness-unique_gem_008_x1.png") },
  powerful: { name: "强者之灾", image: itemAsset("bane-of-the-powerful-unique_gem_001_x1.png") },
  wreath: { name: "闪电华冠", image: itemAsset("wreath-of-lightning-unique_gem_004_x1.png") },
  hoarder: { name: "囤宝者的恩惠", image: itemAsset("boon-of-the-hoarder-unique_gem_014_x1.png") },
};

export const itemFile = itemAsset;

export function setGear(id: string, slot: string, name: string, file: string, effect: string, skill?: string): GearSeed {
  return { id, slot, name, file, effect, quality: "set", skill };
}

export function legendary(id: string, slot: string, name: string, file: string, effect: string, extra: Partial<GearSeed> = {}): GearSeed {
  return { id, slot, name, file, effect, quality: "legendary", ...extra };
}

export function jewelry(kind: "squirt" | "traveler" | "compass" | "coe" | "focus" | "restraint" | "unity" | "karini" | "emptiness" | "elusive" | "zodiac", gem?: GemKey): GearSeed {
  const entries: Record<typeof kind, GearSeed> = {
    squirt: legendary("squirts", "颈部", "斯奎特的项链", "squirts-necklace-p66_unique_amulet_010.png", "未受伤时逐层提高伤害；护盾、走位和控场决定层数能否保住。", { gem }),
    traveler: legendary("travelers-pledge", "颈部", "旅者之誓", "the-travelers-pledge-unique_amulet_008_x1.png", "与罗盘玫瑰组成无尽之途；移动减伤，站定逐步转为增伤。", { gem }),
    compass: legendary("compass-rose", "手指", "罗盘玫瑰", "the-compass-rose-unique_ring_013_x1.png", "无尽之途戒指，按移动和站定状态自动切换攻防。", { gem }),
    coe: legendary("coe", "手指", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "对应元素周期提供独立爆发乘区。", { gem }),
    focus: legendary("focus", "手指", "克己", "focus-unique_ring_set_001_x1.png", "生成技能命中后启动意志壁垒的一半增伤。", { quality: "set", gem, warning: "必须和守心同时穿戴，并主动触发生成端。" }),
    restraint: legendary("restraint", "手指", "守心", "restraint-unique_ring_set_002_x1.png", "消耗技能命中后启动意志壁垒的另一半增伤。", { quality: "set", gem, warning: "必须和克己同时穿戴，并主动触发消耗端。" }),
    unity: legendary("unity", "手指", "团结", "unity-unique_ring_010_x1.png", "随从佩戴同名戒指且拥有不死饰品时，双方分摊伤害。", { gem, warning: "随从没有不死饰品时，团结会把随从承受的伤害反传给角色。" }),
    karini: legendary("karini", "手指", "卡里尼的光环", "halo-of-karini-p61_unique_ring_03.png", "风暴护甲命中远处敌人后获得巨额减伤。", { gem }),
    emptiness: legendary("emptiness", "手指", "虚空之戒", "ring-of-emptiness-p42_unique_ring_haunt.png", "敌人同时受到蚀魂或虫群影响时，角色与宠物伤害提高。", { gem }),
    elusive: legendary("elusive", "手指", "残影之戒", "elusive-ring-p4_unique_ring_02.png", "使用翻滚、暗影之力或烟雾弹后获得巨额减伤。", { gem }),
    zodiac: legendary("zodiac", "手指", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗资源的攻击命中时缩短一个冷却技能。", { gem }),
  };
  return entries[kind];
}

function affixesFor(seed: GearSeed, guide: ClassGuideSeed): string[] {
  const skill = seed.skill ?? guide.coreSkill;
  const mainAttribute = guide.classKey === "crusader"
    ? "力量"
    : guide.classKey === "demon-hunter" || guide.classKey === "monk"
      ? "敏捷"
      : "智力";
  switch (seed.slot) {
    case "头部": return [skill ? `${skill}伤害` : "暴击几率", "暴击几率", mainAttribute, "镶孔"];
    case "肩部": return [skill ? `${skill}伤害` : "范围伤害", "范围伤害", "冷却缩减", mainAttribute];
    case "胸部": return [skill ? `${skill}伤害` : "生命%", "3个镶孔", mainAttribute, "体能"];
    case "手部": return ["暴击几率", "暴击伤害", "范围伤害", "冷却缩减"];
    case "腕部": return [`${seed.element ?? guide.element}技能伤害`, "暴击几率", mainAttribute, "体能"];
    case "腰部": return [skill ? `${skill}伤害` : "生命%", mainAttribute, "体能", "生命%"];
    case "腿部": return ["2个镶孔", mainAttribute, "体能", "全元素抗性"];
    case "脚部": return [skill ? `${skill}伤害` : "全元素抗性", mainAttribute, "体能", "护甲"];
    case "颈部": return ["镶孔", `${seed.element ?? guide.element}技能伤害`, "暴击伤害", "暴击几率"];
    case "手指": return ["镶孔", "暴击几率", "暴击伤害", "范围伤害"];
    case "主手": return ["高白字", "伤害%", "范围伤害", "冷却缩减", "拉玛兰迪打孔"];
    case "副手": return [skill ? `${skill}伤害` : "暴击几率", "暴击几率", "范围伤害", "冷却缩减"];
    default: return [mainAttribute, "体能", "冷却缩减", "范围伤害"];
  }
}

function acquisitionFor(seed: GearSeed): string[] {
  if (seed.method) return seed.method;
  if (seed.quality === "set") return [`血岩碎片：赌博${seed.slot}`, "重复套装部件使用魔盒“套装转换”", "海德格赠礼或世界掉落补齐套装"];
  if (seed.slot === "主手" || seed.slot === "副手") return [`黄装升级：70级${seed.base ?? seed.slot}，必须选对底材`, "世界掉落与大秘境结算", "武器先看传奇特效，再追远古白字"];
  if (seed.slot === "手指" || seed.slot === "颈部") return [`黄装升级：70级${seed.slot === "手指" ? "戒指" : "项链"}`, "世界掉落与大秘境结算", "首饰池很大，先保镶孔和特效"];
  return [`血岩碎片：赌博${seed.slot}`, `黄装升级：70级${seed.slot}`, "世界掉落与大秘境结算"];
}

function makeGear(seed: GearSeed, guide: ClassGuideSeed): GuideGear {
  return {
    id: seed.id,
    slot: seed.slot,
    name: seed.name,
    image: itemFile(seed.file),
    quality: seed.quality ?? "legendary",
    effect: seed.effect,
    affixes: affixesFor(seed, guide),
    acquisition: acquisitionFor(seed),
    warning: seed.warning,
    gem: seed.gem ? GEMS[seed.gem] : undefined,
  };
}

function makeAbility(seed: AbilitySeed, classKey: ClassKey, passive = false): GuideAbility {
  return {
    id: seed.id,
    name: seed.name,
    rune: seed.rune,
    image: skillAsset(classKey, passive ? "passive" : "active", seed.id),
    logic: seed.logic,
  };
}

function makePower(seed: PowerSeed): GuidePower {
  return {
    id: seed.id,
    slot: seed.slot,
    name: seed.name,
    image: itemFile(seed.file),
    effect: seed.effect,
    logic: seed.logic,
    acquisition: seed.method ?? "黄装升级对应底材或世界掉落后，用卡奈魔方萃取。",
  };
}

function makeLoadout(seed: LoadoutSeed, guide: ClassGuideSeed): BuildLoadout {
  return {
    ...seed,
    gear: seed.gear?.map((gear) => makeGear(gear, guide)),
    skills: seed.skills?.map((skill) => makeAbility(skill, guide.classKey)),
    passives: seed.passives?.map((skill) => makeAbility(skill, guide.classKey, true)),
    powers: seed.powers?.map(makePower),
    links: seed.links?.map((link) => ({
      title: link.title,
      category: link.category,
      conclusion: link.conclusion,
      steps: link.steps.map(([id, label, detail]) => ({ id, label, detail })),
    })),
  };
}

export function createClassGuide(seed: ClassGuideSeed): BuildGuide {
  return completeBuildGuide({
    id: seed.id,
    name: seed.name,
    set: seed.set,
    core: seed.core,
    summary: seed.summary,
    difficulty: seed.difficulty,
    follower: seed.follower,
    followerReason: seed.followerReason,
    gear: seed.gear.map((gear) => makeGear(gear, seed)),
    skills: seed.skills.map((skill) => makeAbility(skill, seed.classKey)),
    passives: seed.passives.map((skill) => makeAbility(skill, seed.classKey, true)),
    powers: seed.powers.map(makePower),
    variants: {
      push: { title: seed.modeLabels?.push ?? "大秘境冲层", note: seed.pushNote, changes: ["保留完整减伤与元素爆发窗", "首领阶段使用受罚者之灾"] },
      speed: { title: seed.modeLabels?.speed ?? "T16 / 速刷", note: seed.speedNote, changes: ["以位移和击杀触发替代过量坚韧", "受罚者可换强者之灾或囤宝者"] },
      low: { title: "低巅峰 < 2000", note: seed.lowNote, changes: ["优先体能、抗性和稳定减伤", "普通传奇高特效优于错误词缀远古"] },
      high: { title: "高巅峰 2000+", note: seed.highNote, changes: ["武器、手套和肩部补范围伤", "卡德山只强化正确词缀底子"] },
    },
    links: seed.links.map((link) => ({
      title: link.title,
      category: link.category,
      conclusion: link.conclusion,
      steps: link.steps.map(([id, label, detail]) => ({ id, label, detail })),
    })),
    rotation: seed.rotation,
    source: seed.source,
    purpose: seed.purpose,
    supportedContent: seed.supportedContent,
    defaultMode: seed.defaultMode,
    modeLabels: seed.modeLabels,
    consoleNote: seed.consoleNote,
    powerSets: seed.powerSets,
    defaultLoadoutId: seed.defaultLoadoutId,
    loadouts: seed.loadouts?.map((loadout) => makeLoadout(loadout, seed)),
  }, CURRENT_SEASON.seasonId);
}

const genericReviewedSources: Record<string, string> = {
  "marauder-sentry": "https://www.icy-veins.com/d3/demon-hunter-marauders-sentry-build",
  "ue-multishot": "https://www.icy-veins.com/d3/demon-hunter-unhallowed-essence-multishot-build",
  "natalya-trap": "https://www.icy-veins.com/d3/demon-hunter-natalyas-vengeful-traps-build",
  "shadow-impale": "https://www.icy-veins.com/d3/demon-hunter-shadow-impale-build",
  "lod-rapid-fire": "https://www.icy-veins.com/d3/demon-hunter-lod-rapid-fire-build",
  "inna-ally": "https://www.icy-veins.com/d3/monk-inna-mystic-ally-build",
  "poj-tempest": "https://www.icy-veins.com/d3/monk-patterns-of-justice-tempest-rush-build",
  "sunwuko-tempest": "https://www.icy-veins.com/d3/monk-sunwuko-tempest-rush-build",
  "sunwuko-wol": "https://www.icy-veins.com/d3/monk-sunwuko-wave-of-light-build",
  "lod-wol": "https://www.icy-veins.com/d3/monk-lod-wave-of-light-build",
  "uliana-palm": "https://www.icy-veins.com/d3/monk-uliana-exploding-palm-build",
  "raiment-dash": "https://www.icy-veins.com/d3/monk-raiment-tempest-rush-build",
  "arachyr-spiders": "https://www.icy-veins.com/d3/witch-doctor-arachyr-spiders-build",
  "arachyr-chicken": "https://www.icy-veins.com/d3/witch-doctor-arachyr-chicken-build",
  "zuni-darts": "https://www.icy-veins.com/d3/witch-doctor-zunimassa-poison-dart-build",
  "jade-harvest": "https://www.icy-veins.com/d3/witch-doctor-jade-harvester-build",
  "helltooth-garg": "https://www.icy-veins.com/d3/witch-doctor-helltooth-gargantuan-build",
  "lod-barrage": "https://www.icy-veins.com/d3/witch-doctor-lod-spirit-barrage-build",
  "earth-leapquake": "https://www.icy-veins.com/d3/barbarian-earthquake-build",
  "h90-frenzy": "https://www.icy-veins.com/d3/barbarian-h90-frenzy-build",
  "ik-charge": "https://www.icy-veins.com/d3/barbarian-furious-charge-build-with-immortal-king-and-raekor",
  "seeker-hammer": "https://www.icy-veins.com/d3/crusader-blessed-hammer-build-with-seeker-of-the-light-set",
  "lod-bombardment": "https://www.icy-veins.com/d3/crusader-bombardment-build-with-legacy-of-dreams-set",
};

export function createGenericReviewedGuide(guide: BuildGuide, source = genericReviewedSources[guide.id] ?? guide.source): BuildGuide {
  const used = new Set<string>();
  const pickGear = (slot: string) => {
    const item = guide.gear.find((candidate) => candidate.slot === slot && !used.has(candidate.id)) ?? guide.gear.find((candidate) => !used.has(candidate.id));
    if (!item) return undefined;
    used.add(item.id); return item.id;
  };
  const gear: Record<string, string> = {};
  for (const [key, slot] of [["head", "头部"], ["shoulders", "肩部"], ["chest", "胸部"], ["gloves", "手部"], ["bracers", "腕部"], ["belt", "腰部"], ["pants", "腿部"], ["boots", "脚部"], ["amulet", "颈部"], ["ring1", "手指"], ["ring2", "手指"], ["weapon", "主手"], ["offhand", "副手"]] as const) {
    const id = pickGear(slot); if (id) gear[key] = id;
  }
  const isLegacyOfDreams = guide.id.startsWith("lod-");
  const mainAttribute = ["力量", "敏捷", "智力"].find((attribute) => guide.gear.some((item) => item.affixes.includes(attribute))) ?? "主属性";
  const configurationBase: BuildConfiguration = {
    gear,
    skills: guide.skills.slice(0, 6).map((skill) => ({ id: skill.id, rune: skill.rune })),
    passives: guide.passives.slice(0, 4).map((passive) => passive.id),
    powers: Object.fromEntries(["weapon", "armor", "jewelry", "season"].map((slot, index) => [slot, guide.powers[index].id])),
    legendaryGems: { control: "bane-of-the-trapped", [isLegacyOfDreams ? "engine" : "power"]: isLegacyOfDreams ? "lod" : "gogok", boss: "bane-of-the-stricken" },
    normalGems: { head: ["flawless-royal-diamond"], weapon: [guide.id === "lod-bombardment" ? "flawless-royal-topaz" : "flawless-royal-emerald"] },
    follower: { id: guide.follower === "魔女" ? "enchantress" : guide.follower === "盗贼" ? "scoundrel" : "templar", items: ["不死圣物"], skills: ["治疗", "冷却增强"] },
    statPriorities: { global: ["冷却缩减", "攻击速度", "技能伤"], survival: ["全元素抗性", "体能", "护甲"], endgame: ["范围伤害", "首领阶段受罚者"] },
    rotation: guide.rotation,
  };
  const paragonGuide: ParagonGuide = {
    pre800: {
      core: [{ stat: "移动速度", target: "装备+巅峰合计25%", reason: guide.lowNote ?? guide.summary }, { stat: mainAttribute, target: "其余点数", reason: guide.summary }, { stat: "体能", target: "生存不足时投入", reason: guide.lowNote ?? guide.summary }, { stat: "最大资源", target: "最后", reason: guide.summary }],
      offense: [{ stat: "冷却缩减", target: "优先", reason: guide.summary }, { stat: "暴击几率", target: "第二", reason: guide.summary }, { stat: "暴击伤害", target: "第三", reason: guide.summary }, { stat: "攻击速度", target: "完成断点", reason: guide.summary }],
      defense: [{ stat: "全元素抗性", target: "优先点满", reason: guide.summary }, { stat: "生命%", target: "第二", reason: guide.summary }, { stat: "护甲", target: "第三", reason: guide.summary }, { stat: "生命恢复", target: "最后", reason: guide.summary }],
      utility: [{ stat: "能量消耗降低", target: "优先", reason: guide.summary }, { stat: "范围伤害", target: "第二", reason: guide.summary }, { stat: "击中回复生命", target: "第三", reason: guide.summary }, { stat: "金币拾取范围", target: "最后", reason: guide.summary }],
    },
    post800: [{ priority: "主属性", when: "默认", reason: guide.summary }, { priority: "体能", when: "生存不足", reason: guide.lowNote ?? guide.summary }, { priority: "冷却、攻速与技能伤", when: "高巅峰", reason: guide.highNote ?? guide.summary }],
    checkpoints: [{ label: "刚成型", target: guide.name, action: guide.summary }, { label: "巅峰800", target: "冷却与三颗核心传奇宝石", action: guide.pushNote ?? guide.summary }, { label: "巅峰2000+", target: "正确词缀与生存", action: guide.highNote ?? guide.summary }],
  };
  const scenarios: Pick<BuildScenario, "id" | "label" | "content" | "paragonBand" | "reason" | "patch">[] = [
    { id: "push-low", label: "大秘境冲层 · 低巅峰 < 2000", content: "greater-rift-push" as const, paragonBand: "low" as const, reason: guide.lowNote ?? guide.pushNote ?? guide.summary },
    { id: "push-high", label: "大秘境冲层 · 高巅峰（未验证）", content: "greater-rift-push" as const, paragonBand: "high" as const, reason: guide.highNote ?? guide.pushNote ?? guide.summary, patch: { statPriorities: { ...configurationBase.statPriorities, endgame: ["冷却、攻速与范围伤", "首领阶段受罚者"] } } },
    { id: "speed-low", label: "大秘境速刷（未验证）", content: "greater-rift-speed" as const, paragonBand: "low" as const, reason: guide.speedNote ?? guide.summary, patch: { legendaryGems: { boss: "bane-of-the-powerful" }, statPriorities: { ...configurationBase.statPriorities, global: ["25%移速上限", "冷却缩减", "技能伤"] } } },
    { id: "speed-high", label: "T16 / 速刷（未验证）", content: "nephalem-rift" as const, paragonBand: "high" as const, reason: guide.speedNote ?? guide.summary, patch: { legendaryGems: { power: "wreath-of-lightning", boss: "boon-of-the-hoarder" }, statPriorities: { ...configurationBase.statPriorities, global: ["25%移速上限", "拾取范围", "冷却缩减"] } } },
  ];
  const reviewed: BuildGuide = { ...guide, source, configurationBase, defaultMode: "push", defaultScenarioId: "push-low", scenarios: scenarios.map((scenario) => ({ ...scenario, applicability: "unverified" as const, sourceRefs: [source], reviewedAt: "2026-09-12" })), paragonGuide, choicePolicies: [{ key: `${guide.id}-core`, targetType: "gear", targetId: Object.values(configurationBase.gear)[0], label: guide.name, status: "locked", reason: guide.summary }, { key: `${guide.id}-speed`, targetType: "legendary-gem", targetId: "bane-of-the-powerful", label: "速刷宝石（待验证）", status: "conditional", reason: guide.speedNote ?? guide.summary, alternatives: [{ id: "boon-of-the-hoarder", label: "囤宝者", when: "T16 / 速刷", gain: guide.speedNote ?? guide.summary, cost: guide.lowNote ?? guide.summary, scenarios: ["speed-high"] }] }], reviewStatus: "draft", variantCompleteness: "documented-shared", evidenceStatus: "unverified", platformStatus: "pc-derived", dataProvenance: "generic-placeholder", evidenceNote: "由通用工厂生成的占位配置，尚未完成构筑专属来源、用途与 Nintendo Switch 验证。" };
  return reviewed;
}

export const passive = (id: string, name: string, logic: string): AbilitySeed => ({ id, name, logic });
export const skill = (id: string, name: string, rune: string, logic: string): AbilitySeed => ({ id, name, rune, logic });
export const power = (id: string, slot: string, name: string, file: string, effect: string, logic: string, method?: string): PowerSeed => ({ id, slot, name, file, effect, logic, method });
