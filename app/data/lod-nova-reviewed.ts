import {
  validateBuildEvidence,
  validateBuildSemantics,
  validateReviewedBuildGuide,
  type BuildChoicePolicy,
  type BuildConfiguration,
  type BuildGuide,
  type BuildScenario,
  type BuildSource,
  type EvidenceClaim,
  type GuideAbility,
  type GuideGear,
  type GuidePower,
  type ParagonGuide,
} from "./build-guides";

const REVIEWED_AT = "2026-09-13";

const URLS = {
  overview: "https://www.icy-veins.com/d3/necromancer-blood-nova-build-with-lod",
  skills: "https://www.icy-veins.com/d3/lod-blood-nova-necromancer-skills-and-runes",
  gear: "https://www.icy-veins.com/d3/lod-blood-nova-necromancer-bis-gear-gems-paragon-points",
  d3guides: "https://www.d3guides.de/en/build/necromancer-no-set-death-nova",
  season: "https://www.d3guides.de/en/season-39",
  lod: "https://us.diablo3.blizzard.com/en-us/item/legacy-of-dreams-Unique_Gem_023_x1",
  ironRose: "https://us.diablo3.blizzard.com/en-gb/item/iron-rose-P74_Unique_Phylactery_04",
} as const;

const SOURCES: BuildSource[] = [
  { id: "icy-lod-overview", url: URLS.overview, title: "Necromancer Blood Nova Build With LoD", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push", "greater-rift-speed"], snapshot: "页面将构筑标为单人、速刷、顶级，并给出物理鲜血新星的完整入口；没有独立T16配置页。" },
  { id: "icy-lod-skills", url: URLS.skills, title: "LoD Blood Nova Necromancer Skills and Runes", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push", "greater-rift-speed"], snapshot: "给出力量转移、鲜血新星、鲜血与白骨、鲜血灌注、白骨脱臼、脆弱光环及四个被动；正文仍残留亡者领域旧描述。" },
  { id: "icy-lod-gear", url: URLS.gear, title: "LoD Blood Nova Necromancer BiS Gear, Gems, and Paragon Points", publisher: "Icy Veins", author: "Deadset", updatedAt: "2026-06-24", accessedAt: REVIEWED_AT, season: "39", patch: "2.7.8", platform: "pc", content: ["greater-rift-push", "greater-rift-speed"], snapshot: "装备、词缀、宝石、巅峰、随从与四魔方槽；明确高层用受罚者、低层可换强者，头部使用白宝石。" },
  { id: "d3guides-lod-nova", url: URLS.d3guides, title: "No set Death Nova — Necromancer", publisher: "d3guides.de", author: "eRnstl", updatedAt: "2026-08-31", accessedAt: REVIEWED_AT, season: "39", platform: "pc", content: ["greater-rift-push", "greater-rift-speed", "nephalem-rift-t16"], snapshot: "S39构筑列出GR冲层、速刷和T16，但采用毒新星、团结、斯图亚特等另一套完整方案，不能与Icy物理方案混拼。" },
  { id: "d3guides-season-39", url: URLS.season, title: "Diablo 3 Season 39", publisher: "d3guides.de", accessedAt: REVIEWED_AT, season: "39", platform: "cross-platform", snapshot: "确认第39赛季开放第四魔方槽。" },
  { id: "blizzard-lod", url: URLS.lod, title: "Legacy of Dreams", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认没有激活套装奖励时，每件传奇提供增伤和减伤。" },
  { id: "blizzard-iron-rose", url: URLS.ironRose, title: "Iron Rose", publisher: "Blizzard Entertainment", accessedAt: REVIEWED_AT, patch: "2.7.8", platform: "cross-platform", snapshot: "官方物品页确认鲜血虹吸100%触发免费鲜血新星，并按累计失去生命叠加新星伤害。" },
];

const GEAR_IDS = [
  "leoric-crown", "mantle-channeling", "aquila", "stone-gauntlets", "krelm-bracers", "witching-hour", "blackthorne-pants", "ice-climbers",
  "haunted-visions", "krysbin", "coe", "funerary-pick", "iron-rose",
] as const;

const GEAR_OVERRIDES: Partial<Record<(typeof GEAR_IDS)[number], Partial<GuideGear>>> = {
  "leoric-crown": {
    effect: "放大头部白宝石的冷却缩减，帮助骨甲、鲜血穿行与手动新星周转。",
    affixes: ["智力", "暴击几率", "死亡新星伤害", "镶孔"],
    acquisition: ["血岩碎片赌博头盔", "黄装升级：70级头盔", "普通传奇也能启动；远古版本只是在该部位获得更高梦遗倍率"],
  },
  "mantle-channeling": {
    effect: "引导鲜血虹吸时同时提供增伤与减伤。",
    affixes: ["智力", "冷却缩减", "体能", "范围伤害 / 生命%"],
    acquisition: ["血岩碎片赌博护肩", "黄装升级：70级护肩", "护肩不能洗出死亡新星技能伤"],
  },
  aquila: { affixes: ["智力", "3个镶孔", "体能", "精英伤害减免", "护甲"] },
  "stone-gauntlets": { affixes: ["暴击伤害", "暴击几率", "范围伤害", "智力 / 体能"] },
  "krelm-bracers": { affixes: ["智力", "暴击几率", "物理技能伤害", "体能"] },
  "blackthorne-pants": { warning: "只穿这一件黑荆棘；一旦激活任何套装奖励，梦之遗礼立即失效。" },
  "haunted-visions": { affixes: ["镶孔", "暴击伤害", "暴击几率", "物理技能伤害", "智力"] },
  krysbin: { affixes: ["镶孔", "暴击伤害", "暴击几率", "冷却缩减"] },
  coe: { affixes: ["镶孔", "暴击伤害", "暴击几率", "冷却缩减"] },
  "funerary-pick": { affixes: ["高白字伤害", "智力", "冷却缩减", "范围伤害", "拉玛兰迪打孔"] },
  "iron-rose": { affixes: ["智力", "暴击几率", "冷却缩减", "死亡新星伤害"] },
};

function reviewedGear(base: BuildGuide): GuideGear[] {
  const byId = new Map(base.gear.map((item) => [item.id, item]));
  return GEAR_IDS.map((id) => {
    const item = byId.get(id);
    if (!item) throw new Error(`梦遗新星缺少装备定义：${id}`);
    return { ...item, ...GEAR_OVERRIDES[id] };
  });
}

function reviewedAbilities(base: BuildGuide): GuideAbility[] {
  const activeIds = new Set(["siphon-blood", "death-nova", "simulacrum", "blood-rush", "bone-armor", "frailty"]);
  return base.skills.filter((entry) => activeIds.has(entry.id)).map((entry) => (
    entry.id === "blood-rush" ? { ...entry, rune: "鲜血灌注", logic: "移动、穿怪并回复生命；本配置不用强韧符文，也不借此虚构速刷移速套件。" } : entry
  ));
}

function reviewedPassives(base: BuildGuide): GuideAbility[] {
  const passiveIds = new Set(["swift-harvesting", "eternal-torment", "spreading-malediction", "stand-alone"]);
  return base.passives.filter((entry) => passiveIds.has(entry.id));
}

function reviewedPowers(base: BuildGuide): GuidePower[] {
  const powerIds = new Set(["bloodtide-blade", "dayntee", "wisdom-kalan", "scythe-cycle"]);
  const powers = base.powers.filter((entry) => powerIds.has(entry.id));
  const haunted = base.gear.find((entry) => entry.id === "haunted-visions");
  if (!haunted) throw new Error("梦遗新星缺少鬼灵面容定义");
  powers.push({
    id: "haunted-visions-power", slot: "首饰", name: "鬼灵面容", image: haunted.image,
    effect: "让血魂双分永久存在，并复制死亡新星。",
    logic: "当卡兰之睿的穿戴词缀更好时，两条项链可交换穿戴与萃取；两项威能必须同时保留。",
    acquisition: "黄装升级：70级项链，或世界掉落",
  });
  return powers;
}

const PROGRESSION_ROTATION: BuildConfiguration["rotation"] = [
  { title: "先建立骨甲", action: "进图寻找威胁较低的怪群，用白骨脱臼尽量命中多个目标。", reason: "先拿到骨甲减伤，并启动第39赛季轮回镰刀的次要技能增伤。" },
  { title: "开启永久双分", action: "确认安全后施放鲜血与白骨；死亡或换装后重新检查。", reason: "鬼灵面容让两个分身常驻并复制死亡新星。" },
  { title: "贴身聚集密度", action: "用鲜血穿行调整位置，把精英和小怪留在新星半径内。", reason: "血潮利刃按25码内敌人数放大新星，零散目标会损失主要密度收益。" },
  { title: "物理周期爆发", action: "全能法戒进入物理周期时刷新白骨脱臼，再对核心目标持续虹吸并按需手动新星。", reason: "鲜血新星是物理伤害；强控同时提高克里斯宾收益。" },
  { title: "检查三条防线", action: "骨甲层数、诅咒目标或高魂能任一断开时先重建，不要原地硬引导。", reason: "骨甲、戴恩提和天鹰分别依赖自己的运行条件。" },
];

const CONFIGURATION_BASE: BuildConfiguration = {
  gear: {
    head: "leoric-crown", shoulders: "mantle-channeling", chest: "aquila", gloves: "stone-gauntlets",
    bracers: "krelm-bracers", belt: "witching-hour", pants: "blackthorne-pants", boots: "ice-climbers",
    amulet: "haunted-visions", ring1: "krysbin", ring2: "coe", weapon: "funerary-pick", offhand: "iron-rose",
  },
  skills: [
    { id: "siphon-blood", rune: "力量转移" }, { id: "death-nova", rune: "鲜血新星" }, { id: "simulacrum", rune: "鲜血与白骨" },
    { id: "blood-rush", rune: "鲜血灌注" }, { id: "bone-armor", rune: "白骨脱臼" }, { id: "frailty", rune: "脆弱光环" },
  ],
  passives: ["swift-harvesting", "eternal-torment", "spreading-malediction", "stand-alone"],
  powers: { weapon: "bloodtide-blade", armor: "dayntee", jewelry: "wisdom-kalan", season: "scythe-cycle" },
  legendaryGems: { control: "bane-of-the-trapped", engine: "lod", progression: "bane-of-the-stricken" },
  normalGems: { head: ["flawless-royal-diamond"], armor: Array(5).fill("flawless-royal-topaz"), weapon: ["flawless-royal-emerald"] },
  follower: {
    id: "scoundrel",
    items: ["骷髅钥匙", "神目指环", "团结", "时光流韵", "复仇者护腕"],
    skills: ["致残射击", "解剖", "多重射击", "消失"],
  },
  statPriorities: {
    damage: ["死亡新星技能伤", "物理技能伤害", "暴击伤害与暴击几率", "冷却缩减", "范围伤害"],
    engine: ["攻击速度", "拾取范围副词缀", "骨甲与诅咒覆盖", "保持高魂能触发天鹰"],
    survival: ["护甲", "生命%", "体能", "全元素抗性"],
  },
  rotation: PROGRESSION_ROTATION,
};

const SCENARIOS: BuildScenario[] = [
  {
    id: "gr-progression", label: "单人 GR 推进 · 物理新星", content: "greater-rift-push", paragonBand: "any", applicability: "viable",
    reason: "Icy明确用‘高层推进’解释受罚者，并推荐盗贼用于单人GR推进；但页面标签没有把这套列为gr-pushing，且第二来源使用另一套毒新星配置，因此只标为可用推进方案，不宣传为当前最佳冲层。",
    unchangedReason: "基础配置就是Icy的物理鲜血新星单人GR推进方案。", configurationId: "lod-nova-gr-progression",
    sourceRefs: [URLS.overview, URLS.skills, URLS.gear, URLS.d3guides], sourceIds: ["icy-lod-overview", "icy-lod-skills", "icy-lod-gear", "d3guides-lod-nova"], reviewedAt: REVIEWED_AT,
  },
  {
    id: "gr-speed", label: "低层 GR 速刷 · 保守版", content: "greater-rift-speed", paragonBand: "any", applicability: "viable",
    reason: "Icy将整套标为速刷，并明确低层可把受罚者换成强者；没有可靠依据支持旧版寅剑、复仇者、金织带和贪婪之戒整包，因此这里只做一颗宝石替换。",
    patch: { legendaryGems: { progression: "bane-of-the-powerful" } }, configurationId: "lod-nova-gr-speed",
    sourceRefs: [URLS.overview, URLS.gear, URLS.d3guides], sourceIds: ["icy-lod-overview", "icy-lod-gear", "d3guides-lod-nova"], reviewedAt: REVIEWED_AT,
  },
];

const PARAGON: ParagonGuide = {
  pre800: {
    core: [
      { stat: "移动速度", target: "装备+巅峰合计25%", reason: "达到基础上限后停止投入。" },
      { stat: "智力", target: "第二", reason: "提供伤害与全抗。" },
      { stat: "体能", target: "第三", reason: "只有实际生存不足时优先补。" },
      { stat: "最大精魂", target: "最后", reason: "Icy当前顺序把它放在核心页最后。" },
    ],
    offense: [
      { stat: "暴击伤害", target: "优先点满", reason: "Icy当前巅峰顺序第一。" },
      { stat: "暴击几率", target: "第二", reason: "与暴击伤害配套。" },
      { stat: "冷却缩减", target: "第三", reason: "改善骨甲、位移和手动技能周转。" },
      { stat: "攻击速度", target: "最后", reason: "构筑仍重视攻速，但当前巅峰表不把它排第一。" },
    ],
    defense: [
      { stat: "护甲", target: "优先点满", reason: "智力职业通常更缺护甲。" },
      { stat: "生命%", target: "第二", reason: "提高有效生命。" },
      { stat: "全元素抗性", target: "第三", reason: "智力已提供大量全抗。" },
      { stat: "生命恢复", target: "最后", reason: "只作为持续引导的补充。" },
    ],
    utility: [
      { stat: "击中回复生命", target: "优先点满", reason: "持续虹吸提供稳定触发。" },
      { stat: "范围伤害", target: "第二", reason: "密集怪群中的新星受益。" },
      { stat: "能量消耗降低", target: "第三", reason: "手动新星仍会使用魂能。" },
      { stat: "生命之球拾取范围", target: "最后", reason: "巅峰表虽排最后，装备副词缀仍可扩大脆弱光环覆盖。" },
    ],
  },
  post800: [
    { priority: "智力", when: "当前层数能稳定承伤并维持骨甲、诅咒和天鹰", reason: "继续提高伤害与全抗。" },
    { priority: "体能", when: "被同层常见技能击杀，导致无法完成物理窗口", reason: "只补到能完整执行循环，再回到智力。" },
    { priority: "装备词缀替换", when: "对应部位已有远古、正确特效，且生存与冷却实测达标", reason: "是否把智力让给范围伤或冷却由装备质量和实战瓶颈决定，不由2000巅峰自动触发。" },
  ],
  checkpoints: [
    { label: "梦遗纪律", target: "没有任何已激活套装奖励", action: "逐件检查绿色装备；黑荆棘裤只能单穿。" },
    { label: "发动机", target: "葬镰、铁玫瑰、鬼灵面容与梦之遗礼齐全", action: "核心威能优先于远古品质；普通传奇缺口不要为了远古而空着。" },
    { label: "远古成长", target: "逐件获得正确词缀的远古或太古", action: "远古只让该部位梦遗收益翻倍，不存在‘未全远古就完全不能玩’或固定巅峰切换线。" },
    { label: "速刷资格", target: "目标低层的精英与首领不再形成长时间单体瓶颈", action: "此时才把受罚者换成强者；如果首领明显拖时就切回推进方案或降低层数。" },
  ],
};

const POLICIES: BuildChoicePolicy[] = [
  { key: "lod-discipline", targetType: "legendary-gem", targetId: "lod", label: "梦之遗礼纪律", status: "locked", reason: "必须没有任何已激活套装奖励；传奇物品即可获得收益，远古或太古只会让对应部位的宝石收益翻倍。" },
  { key: "lod-nova-engine", targetType: "gear", targetId: "iron-rose", label: "葬镰 + 铁玫瑰 + 鬼灵面容", status: "locked", reason: "鲜血虹吸、免费鲜血新星和永久双分共同组成物理新星发动机；不要把第二来源的毒新星符文单独混进来。" },
  { key: "lod-ancient-growth", targetType: "gear", targetId: "leoric-crown", label: "远古是逐件成长，不是准入门槛", status: "conditional", reason: "普通传奇已提供梦遗收益，远古或太古将该件收益翻倍；先保正确威能和词缀，再逐件升级。", alternatives: [{ id: "ancient-or-primal-upgrade", label: "远古 / 太古同名件", when: "特效和关键词缀不低于当前装备", gain: "该部位获得双倍梦遗增伤与减伤", cost: "不能为了远古品质丢失关键威能或合法词缀", scenarios: ["gr-progression", "gr-speed"] }] },
  { key: "lod-jewelry-cube", targetType: "power", targetId: "wisdom-kalan", label: "鬼灵面容 / 卡兰之睿穿萃互换", status: "conditional", reason: "穿戴两条项链中词缀更好的一条，另一条进入首饰魔方槽；两项威能必须同时存在。", alternatives: [{ id: "haunted-visions-power", label: "萃取鬼灵面容", when: "卡兰之睿的镶孔、双暴、物理伤等穿戴词缀明显更好", gain: "保留更好的项链词缀", cost: "失去当前鬼灵面容穿戴词缀，且必须确认永久双分威能仍在", scenarios: ["gr-progression", "gr-speed"] }] },
  { key: "lod-third-gem", targetType: "legendary-gem", targetId: "bane-of-the-stricken", label: "受罚者 / 强者", status: "conditional", reason: "高层推进固定受罚者处理长时间首领；只有低层精英击杀连续且首领不再拖时时才换强者。", alternatives: [{ id: "bane-of-the-powerful", label: "强者之灾", when: "低层GR中精英击杀连续，守关者不需要长时间叠层", gain: "击杀精英后立即获得通用增伤", cost: "失去长时间单体叠层能力", incompatibleWith: ["greater-rift-push"], scenarios: ["gr-speed"] }] },
  { key: "lod-head-gem", targetType: "normal-gem", targetId: "flawless-royal-diamond", label: "头部白宝石", status: "locked", reason: "Icy当前装备页明确使用白宝石获取冷却缩减；旧项目写成紫宝石属于错误，不是高低巅峰分支。" },
  { key: "lod-content-boundary", targetType: "gear", targetId: "krelm-bracers", label: "只开放GR推进与低层GR速刷", status: "locked", reason: "第二来源虽列出T16，但它采用毒新星、团结、斯图亚特和另一组技能魔方；没有可交叉核对的精确T16配置前，不把旧金币链强行拼回物理方案，也不外推蓝门或悬赏。" },
  { key: "lod-follower", targetType: "follower", targetId: "scoundrel", label: "单人GR使用盗贼", status: "flexible", reason: "Icy明确推荐盗贼用于单人GR推进的暴击窗口；随从具体装备、技能与Nintendo Switch发散表现仍需实机核对。" },
];

const CLAIMS: EvidenceClaim[] = [
  { id: "lod-nova-gr-progression", category: "applicability", path: "scenarios.gr-progression", conclusion: "物理LoD新星可用于单人GR推进，但不宣传为已证明的当前最强冲层方案。", sourceIds: ["icy-lod-overview", "icy-lod-gear", "d3guides-lod-nova"], status: "cross-checked", conflictNote: "Icy正文明确高层与单人GR推进，但页面没有gr-pushing标签；d3guides有GR push，却采用另一套毒新星配置。" },
  { id: "lod-nova-gr-speed", category: "applicability", path: "scenarios.gr-speed", conclusion: "低层GR可保留物理主配置并把受罚者换成强者。", sourceIds: ["icy-lod-overview", "icy-lod-gear", "d3guides-lod-nova"], status: "cross-checked", conflictNote: "两站都支持速刷用途，但完整速刷配装不同；当前只采用Icy明确写出的单颗宝石替换。" },
  { id: "lod-nova-no-t16", category: "applicability", path: "scenarios", conclusion: "本轮不创建T16、蓝门或悬赏按钮。", sourceIds: ["icy-lod-overview", "d3guides-lod-nova"], status: "unverified", conflictNote: "d3guides存在T16变体，但与Icy物理主配置差异过大；Maxroll正文未能读取，暂时无法裁决。" },
  { id: "lod-nova-discipline", category: "legendary-gems", path: "choicePolicies.lod-discipline", conclusion: "梦之遗礼要求没有激活套装奖励；普通传奇有效，远古或太古使对应部位收益翻倍。", sourceIds: ["blizzard-lod", "icy-lod-gear", "d3guides-lod-nova"], status: "cross-checked" },
  { id: "lod-nova-core-engine", category: "gear", path: "configurationBase.gear", conclusion: "葬镰、铁玫瑰、鬼灵面容与梦之遗礼是两套资料共同保留的核心。", sourceIds: ["icy-lod-overview", "icy-lod-gear", "d3guides-lod-nova", "blizzard-iron-rose"], status: "cross-checked" },
  { id: "lod-nova-physical-gear", category: "gear", path: "configurationBase.gear", conclusion: "当前采用Icy的克雷姆、攀冰者和全能法戒物理方案。", sourceIds: ["icy-lod-gear", "d3guides-lod-nova"], status: "unverified", conflictNote: "d3guides改用古帕萨、斯图亚特、团结与毒新星；不把两套完整配置混拼。" },
  { id: "lod-nova-skills", category: "skills", path: "configurationBase.skills", conclusion: "当前采用Icy的物理鲜血新星、力量转移、鲜血灌注、白骨脱臼与脆弱光环。", sourceIds: ["icy-lod-skills", "d3guides-lod-nova"], status: "unverified", conflictNote: "d3guides采用毒新星和不同符文；Icy技能页自身还残留亡者领域旧段落，因此只以当前技能表为准。" },
  { id: "lod-nova-passives", category: "passives", path: "configurationBase.passives", conclusion: "当前采用迅捷收割、无尽折磨、咒怨之力和孤魂死灵。", sourceIds: ["icy-lod-skills", "d3guides-lod-nova"], status: "unverified", conflictNote: "第二来源用绝命效忠替代无尽折磨。" },
  { id: "lod-nova-cube", category: "powers", path: "configurationBase.powers", conclusion: "血潮利刃、戴恩提和轮回镰刀双源一致；首饰槽当前采用Icy的卡兰之睿。", sourceIds: ["icy-lod-overview", "icy-lod-gear", "d3guides-lod-nova", "d3guides-season-39"], status: "unverified", conflictNote: "d3guides首饰槽使用全能法戒；只有三个槽位交叉一致，不能把四槽整体标为已核对。" },
  { id: "lod-nova-legendary-gems", category: "legendary-gems", path: "configurationBase.legendaryGems", conclusion: "困者、受罚者和梦之遗礼是推进基础三宝石。", sourceIds: ["icy-lod-gear", "d3guides-lod-nova"], status: "cross-checked" },
  { id: "lod-nova-normal-gems", category: "normal-gems", path: "configurationBase.normalGems", conclusion: "当前物理方案使用头部白、护甲黄、武器绿。", sourceIds: ["icy-lod-gear", "d3guides-lod-nova"], status: "unverified", conflictNote: "d3guides表格写头部紫、护甲黄、武器绿，但同页又说其余七孔全黄，存在页内矛盾；本配置按Icy当前表格。" },
  { id: "lod-nova-paragon", category: "paragon", path: "paragonGuide.pre800", conclusion: "进攻巅峰顺序为暴伤、暴击、冷却、攻速；功能顺序为击回、范围伤、减耗、拾取。", sourceIds: ["icy-lod-gear"], status: "single-source" },
  { id: "lod-nova-no-paragon-threshold", category: "stats", path: "paragonGuide.post800", conclusion: "没有证据支持2000巅峰自动切宝石、装备或整套T16金币链。", sourceIds: ["icy-lod-gear", "d3guides-lod-nova"], status: "unverified", conflictNote: "两份资料都按用途、品质和实战条件描述选择，没有给2000巅峰硬线；这是对缺失证据的保守裁决。" },
  { id: "lod-nova-follower", category: "platform", path: "configurationBase.follower", conclusion: "Icy推荐盗贼用于单人GR推进；具体随从装备和技能尚未逐项校对。", sourceIds: ["icy-lod-gear"], status: "single-source" },
  { id: "lod-nova-switch", category: "platform", path: "platformStatus", conclusion: "Nintendo Switch的虹吸朝向、手动新星、鲜血穿行落点和随从发散尚未实测。", sourceIds: [], status: "unverified", conflictNote: "当前精确构筑来源均为PC页面；官方物品机制跨平台，但不等于主机手感验证。" },
];

export function reviewLodNovaGuide(base: BuildGuide): BuildGuide {
  const gear = reviewedGear(base);
  const skills = reviewedAbilities(base);
  const passives = reviewedPassives(base);
  const powers = reviewedPowers(base);
  const reviewed: BuildGuide = {
    ...base,
    set: "梦之遗礼 · 无套装散件",
    core: "鲜血虹吸 → 铁玫瑰 → 双分复制物理鲜血新星",
    summary: "普通传奇即可启动梦之遗礼；远古或太古只会把对应部位的宝石收益翻倍。当前只开放有证据的单人GR推进和低层GR速刷，不再按2000巅峰复制配置。",
    difficulty: "中高 · 贴身聚怪、骨甲与物理周期",
    follower: "盗贼",
    followerReason: "Icy推荐盗贼用于单人GR推进的暴击窗口；具体装备与Switch发散表现仍待实测。",
    gear,
    skills,
    passives,
    powers,
    variants: {
      push: { title: "单人 GR 推进", note: "保留受罚者处理长时间首领，并按物理周期完成强控爆发。", changes: ["受罚者之灾固定", "保持骨甲、诅咒与天鹰三条防线", "不与毒新星第二方案混拼"] },
      speed: { title: "低层 GR 速刷", note: "只采用资料明确写出的受罚者换强者，不虚构T16金币链。", changes: ["受罚者换强者之灾", "精英和首领不再拖时才使用", "没有金币链，也不等同于T16或悬赏"] },
      low: { title: "未全远古阶段", note: "普通传奇已有梦遗收益；先凑发动机和正确特效。", changes: ["葬镰、铁玫瑰、鬼灵面容优先", "正确普通传奇优于错误远古", "逐件替换远古，不设固定巅峰门槛"] },
      high: { title: "高成长阶段", note: "远古率、卡德山和词缀质量提高后，再按实战瓶颈优化。", changes: ["生存达标后才考虑智力换范围伤或冷却", "头部仍是白宝石，不自动改钻石甲", "首领拖时就继续使用受罚者"] },
    },
    links: [
      { title: "物理新星发动机", category: "damage", conclusion: "持续鲜血虹吸触发铁玫瑰的免费鲜血新星；永久双分复制次要技能，全部围绕物理元素周期结算。", steps: [{ id: "siphon-blood", label: "鲜血虹吸", detail: "持续引导" }, { id: "iron-rose", label: "铁玫瑰", detail: "100%触发免费鲜血新星" }, { id: "simulacrum", label: "鲜血与白骨", detail: "两个分身复制次要技能" }, { id: "haunted-visions", label: "鬼灵面容", detail: "双分永久存在" }] },
      { title: "梦遗装备纪律", category: "defense", conclusion: "普通传奇能启动，远古逐件翻倍；真正的硬条件是不能激活任何套装奖励。", steps: [{ id: "lod", label: "梦之遗礼", detail: "按每件传奇计算" }, { id: "blackthorne-pants", label: "黑荆棘裤", detail: "只能单穿一件" }, { id: "leoric-crown", label: "普通传奇", detail: "已有基础收益" }, { id: "stone-gauntlets", label: "远古 / 太古", detail: "对应部位收益翻倍" }] },
      { title: "三条条件防线", category: "defense", conclusion: "骨甲、受诅咒目标和高魂能任一断开都会显著变脆；这些是运行条件，不是巅峰自动补偿。", steps: [{ id: "bone-armor", label: "骨甲", detail: "层数与轮回镰刀" }, { id: "frailty", label: "脆弱光环", detail: "维持受诅咒目标" }, { id: "dayntee", label: "戴恩提", detail: "诅咒存在时减伤" }, { id: "aquila", label: "天鹰胸甲", detail: "保持高魂能" }] },
    ],
    rotation: PROGRESSION_ROTATION,
    source: URLS.overview,
    purpose: "greater-rift",
    supportedContent: ["单人GR推进", "低层GR速刷"],
    defaultMode: "push",
    modeLabels: { push: "单人GR推进", speed: "低层GR速刷" },
    pushNote: "这是一套可用于单人GR推进的物理新星方案；第二来源的毒新星配装不同，不能混拼。",
    speedNote: "低层GR只把受罚者换成强者；T16、蓝门、悬赏和金币链暂不开放。",
    lowNote: "普通传奇即可生效；优先完整发动机和正确威能，再逐件追远古。",
    highNote: "按生存、冷却与首领耗时调整词缀和宝石，没有2000巅峰自动切线。",
    configurationBase: CONFIGURATION_BASE,
    defaultScenarioId: "gr-progression",
    scenarios: SCENARIOS,
    paragonGuide: PARAGON,
    choicePolicies: POLICIES,
    reviewStatus: "fully-reviewed",
    variantCompleteness: "complete",
    evidenceStatus: "source-checked",
    platformStatus: "platform-risk",
    dataProvenance: "hand-authored",
    evidenceNote: "已按S39/2.7.8字段级校对，修正头部宝石、鲜血穿行符文、护肩非法技能伤、巅峰顺序和全远古准入误导；删除无来源的高低巅峰复制与T16金币链。Icy内部旧段落、第二来源完整配装冲突、Maxroll正文缺失和Nintendo Switch实测仍未关闭。",
    structuredSources: SOURCES,
    evidenceClaims: CLAIMS,
  };

  const errors = [
    ...validateReviewedBuildGuide(reviewed),
    ...validateBuildSemantics(reviewed),
    ...validateBuildEvidence(reviewed),
  ];
  if (errors.length > 0) throw new Error(`梦遗死亡新星配置校验失败：${[...new Set(errors)].join("；")}`);
  return reviewed;
}
