import type { BuildGuide, GuideAbility, GuideGear, GuideLink, GuidePower } from "./build-guides";

const I = "/d3/library/items/";
const S = "/d3/library/skills/";

const image = (file: string) => file.startsWith("/") ? file : `${I}${file}`;
const skillImage = (slug: string) => `${S}barbarian-active-${slug}.png`;
const passiveImage = (slug: string) => `${S}barbarian-passive-${slug}.png`;

const GEM = {
  trapped: { name: "困者之灾", image: image("bane-of-the-trapped-unique_gem_002_x1.png") },
  stricken: { name: "受罚者之灾", image: image("bane-of-the-stricken-unique_gem_018_x1.png") },
  zei: { name: "贼神的复仇之石", image: image("zeis-stone-of-vengeance-unique_gem_012_x1.png") },
  lod: { name: "梦之遗礼", image: image("legacy-of-dreams-unique_gem_023_x1.png") },
  taeguk: { name: "太极石", image: image("taeguk-unique_gem_015_x1.png") },
  simplicity: { name: "至简之力", image: image("simplicitys-strength-unique_gem_013_x1.png") },
  gogok: { name: "迅捷勾玉", image: image("gogok-of-swiftness-unique_gem_008_x1.png") },
};

function setPiece(id: string, slot: string, name: string, file: string, setName: string, firstAffix: string): GuideGear {
  const defensive = slot === "头部" ? [firstAffix, "暴击几率", "力量", "镶孔"]
    : slot === "肩部" ? [firstAffix, "冷却缩减", "力量", "体能"]
      : slot === "胸部" ? [firstAffix, "3个镶孔", "力量", "体能"]
        : slot === "手部" ? ["暴击几率", "暴击伤害", firstAffix, "力量"]
          : slot === "腿部" ? [firstAffix, "2个镶孔", "力量", "体能"]
            : [firstAffix, "力量", "体能", "全抗"];
  return {
    id, slot, name, image: image(file), quality: "set",
    effect: `${setName}套装部件。${firstAffix}是该槽位最直接的技能收益，凑齐前先保证套装件数。`,
    affixes: defensive,
    acquisition: [`血岩碎片：赌博${slot}`, `重复的${setName}部件使用魔盒“套装转换”`, "未凑齐六件前不要分解重复套装件"],
  };
}

function legendary(id: string, slot: string, name: string, file: string, effect: string, affixes: string[], acquisition: string[], warning?: string, gem?: GuideGear["gem"]): GuideGear {
  return { id, slot, name, image: image(file), quality: "legendary", effect, affixes, acquisition, warning, gem };
}

function ability(id: string, name: string, rune: string | undefined, logic: string): GuideAbility {
  return { id, name, rune, image: skillImage(id), logic };
}

function passive(id: string, name: string, logic: string): GuideAbility {
  return { id, name, image: passiveImage(id), logic };
}

function power(id: string, slot: string, name: string, file: string, effect: string, logic: string, acquisition: string): GuidePower {
  return { id, slot, name, image: image(file), effect, logic, acquisition };
}

const variants = (push: string, speed: string, low: string, high: string): BuildGuide["variants"] => ({
  push: { title: "大秘境冲层", note: push, changes: ["保留元素爆发窗与完整减伤", "首领阶段使用受罚者之灾"] },
  speed: { title: "T16 / 速刷", note: speed, changes: ["用机动和击杀触发替代过量坚韧", "传奇宝石可换强者或囤宝者"] },
  low: { title: "低巅峰 < 2000", note: low, changes: ["力量与体能词缀先保留", "优先高特效普通传奇，不强求远古"] },
  high: { title: "高巅峰 2000+", note: high, changes: ["手套、肩膀和武器开始补范围伤", "卡德山与太古只投给正确词缀底子"] },
});

const WASTES = [
  setPiece("wastes-head", "头部", "荒原头盔", "helm-of-the-wastes-unique_helm_set_01_p2.png", "荒原之怒", "痛割伤害"),
  setPiece("wastes-shoulders", "肩部", "荒原肩甲", "pauldrons-of-the-wastes-unique_shoulder_set_01_p2.png", "荒原之怒", "范围伤害"),
  setPiece("wastes-chest", "胸部", "荒原胸甲", "cuirass-of-the-wastes-unique_chest_set_01_p2.png", "荒原之怒", "痛割伤害"),
  setPiece("wastes-gloves", "手部", "荒原手套", "gauntlet-of-the-wastes-unique_gloves_set_01_p2.png", "荒原之怒", "范围伤害"),
  setPiece("wastes-pants", "腿部", "荒原腿甲", "tasset-of-the-wastes-unique_pants_set_01_p2.png", "荒原之怒", "护甲"),
  setPiece("wastes-boots", "脚部", "荒原战靴", "sabaton-of-the-wastes-unique_boots_set_01_p2.png", "荒原之怒", "旋风斩伤害"),
];

const RAEKOR = [
  setPiece("raekor-head", "头部", "蕾蔻的意志", "raekors-will-unique_helm_set_05_x1.png", "蕾蔻的传世铠", "上古之矛伤害"),
  setPiece("raekor-shoulders", "肩部", "蕾蔻的重负", "raekors-burden-unique_shoulder_set_05_x1.png", "蕾蔻的传世铠", "范围伤害"),
  setPiece("raekor-chest", "胸部", "蕾蔻之心", "raekors-heart-unique_chest_set_05_x1.png", "蕾蔻的传世铠", "生命%"),
  setPiece("raekor-gloves", "手部", "蕾蔻的裹手", "raekors-wraps-unique_gloves_set_05_x1.png", "蕾蔻的传世铠", "范围伤害"),
  setPiece("raekor-pants", "腿部", "蕾蔻的长裤", "raekors-breeches-unique_pants_set_05_x1.png", "蕾蔻的传世铠", "护甲"),
  setPiece("raekor-boots", "脚部", "蕾蔻的步伐", "raekors-striders-unique_boots_set_05_x1.png", "蕾蔻的传世铠", "全抗"),
];

const IK = [
  setPiece("ik-head", "头部", "不朽之王的凯旋", "immortal-kings-triumph-unique_helm_008_x1.png", "不朽之王的呼唤", "先祖之锤伤害"),
  setPiece("ik-chest", "胸部", "不朽之王的永恒统治", "immortal-kings-eternal-reign-unique_chest_013_x1.png", "不朽之王的呼唤", "生命%"),
  setPiece("ik-gloves", "手部", "不朽之王的铁拳", "immortal-kings-irons-unique_gloves_008_x1.png", "不朽之王的呼唤", "范围伤害"),
  setPiece("ik-belt", "腰部", "不朽之王的部族绑带", "immortal-kings-tribal-binding-unique_barbbelt_009_x1.png", "不朽之王的呼唤", "生命%"),
  setPiece("ik-pants", "腿部", "不朽之王的威仪", "immortal-kings-stature-p2_unique_pants_02.png", "不朽之王的呼唤", "护甲"),
  setPiece("ik-boots", "脚部", "不朽之王的步伐", "immortal-kings-stride-unique_boots_012_x1.png", "不朽之王的呼唤", "先祖之锤伤害"),
];

const EARTH = [
  setPiece("earth-head", "头部", "大地之眼", "eyes-of-the-earth-unique_helm_set_15_x1.png", "大地之力", "地震伤害"),
  setPiece("earth-shoulders", "肩部", "大地之塔", "spires-of-the-earth-unique_shoulder_set_15_x1.png", "大地之力", "范围伤害"),
  setPiece("earth-chest", "胸部", "大地之灵", "spirit-of-the-earth-unique_chest_set_15_x1.png", "大地之力", "地震伤害"),
  setPiece("earth-gloves", "手部", "大地之握", "pull-of-the-earth-unique_gloves_set_15_x1.png", "大地之力", "范围伤害"),
  setPiece("earth-pants", "腿部", "大地之重", "weight-of-the-earth-unique_pants_set_15_x1.png", "大地之力", "护甲"),
  setPiece("earth-boots", "脚部", "大地之基", "foundation-of-the-earth-unique_boots_set_15_x1.png", "大地之力", "地震伤害"),
];

const SAVAGES = [
  setPiece("savages-head", "头部", "九十蛮之颅", "skull-of-savages-p68_unique_helm_set_05.png", "九十蛮", "狂乱伤害"),
  setPiece("savages-shoulders", "肩部", "九十蛮之刺", "spines-of-savages-p68_unique_shoulder_set_05.png", "九十蛮", "范围伤害"),
  setPiece("savages-chest", "胸部", "九十蛮印记", "markings-of-savages-p68_unique_chest_set_05.png", "九十蛮", "生命%"),
  setPiece("savages-gloves", "手部", "九十蛮之爪", "claws-of-savages-p68_unique_gloves_set_05.png", "九十蛮", "攻击速度"),
  setPiece("savages-pants", "腿部", "九十蛮护腿", "leggings-of-savages-p68_unique_pants_set_05.png", "九十蛮", "护甲"),
  setPiece("savages-boots", "脚部", "九十蛮之踵", "heel-of-savages-p68_unique_boots_set_05.png", "九十蛮", "全抗"),
];

const band = (gem = GEM.stricken) => legendary("band-of-might", "手指", "力量指环", "band-of-might-p61_unique_ring_05.png", "施放狂暴冲锋、跃击或大地践踏后获得巨额减伤；这件戒指决定能否贴身输出。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害"], ["用1级野蛮人赌博戒指，传奇池最小", "70级可黄装升级戒指，但池子很大", "优先高特效，普通传奇也能长期使用"], "减伤持续时间内必须再次触发位移/控制技能。", gem);
const coe = (gem = GEM.trapped) => legendary("coe", "手指", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "元素周期提供独立爆发窗；对应火焰或物理阶段集中倾泻核心技能。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害"], ["世界掉落与大秘境结算", "黄装升级：70级戒指", "戒指池大，不建议前期用血岩硬赌"], undefined, gem);
const squirt = (gem = GEM.trapped) => legendary("squirts", "颈部", "斯奎特的项链", "squirts-necklace-p66_unique_amulet_010.png", "未受伤时叠加伤害；靠走位、随从控场和减伤保持层数。", ["镶孔", "暴击伤害", "暴击几率", "对应元素伤害"], ["世界掉落与大秘境结算", "黄装升级：70级项链，池子很大", "先保镶孔，再追双暴元素"], undefined, gem);
const flavor = (gem = GEM.trapped) => legendary("flavor-time", "颈部", "时光流韵", "the-flavor-of-time-p66_unique_amulet_001.png", "让塔效果持续时间翻倍，速刷与冲层都能扩大输出窗口。", ["镶孔", "暴击伤害", "暴击几率", "物理技能伤害"], ["世界掉落", "黄装升级：70级项链", "前期可直接交给随从，角色先用好词缀项链"], undefined, gem);
const focus = (gem = GEM.trapped) => legendary("focus", "手指", "克己", "focus-unique_ring_set_001_x1.png", "使用生成技能后启动意志壁垒的一半增伤。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害"], ["世界掉落", "黄装升级：70级戒指", "必须和守心同时穿戴"], "只戴一枚没有套装效果。", gem);
const restraint = (gem = GEM.stricken) => legendary("restraint", "手指", "守心", "restraint-unique_ring_set_002_x1.png", "使用消耗技能后启动意志壁垒的另一半增伤。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害"], ["世界掉落", "黄装升级：70级戒指", "必须和克己同时穿戴"], "需要主动交替生成与消耗技能。", gem);
const traveler = (gem = GEM.trapped) => legendary("travelers-pledge", "颈部", "旅者之誓", "the-travelers-pledge-unique_amulet_008_x1.png", "移动时减伤、站定时增伤；与罗盘玫瑰组成无尽之途。", ["镶孔", "暴击伤害", "暴击几率", "对应元素伤害"], ["世界掉落", "黄装升级：70级项链", "必须与罗盘玫瑰配套"], undefined, gem);
const compass = (gem = GEM.stricken) => legendary("compass-rose", "手指", "罗盘玫瑰", "the-compass-rose-unique_ring_013_x1.png", "与旅者之誓组成无尽之途，移动与站定自动切换攻防。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害"], ["世界掉落", "黄装升级：70级戒指", "固定词缀多，正确双暴版本很难"], undefined, gem);

const COMMON_PASSIVES = {
  rampage: passive("rampage", "狂暴", "击杀敌人叠加力量；密集怪群中同时放大伤害与护甲。"),
  ruthless: passive("ruthless", "无情暴虐", "对低生命敌人增伤，加快精英收尾和首领斩杀。"),
  boon: passive("boon-of-bulkathos", "布尔凯索的庇佑", "缩短狂战之怒、先祖召唤和地震的冷却。"),
  nerves: passive("nerves-of-steel", "钢铁神经", "受到致命伤害时保命，给主机操作留下重建循环的时间。"),
  berserker: passive("berserker-rage", "狂战盛怒", "怒气接近满值时提高伤害，适合免费或低消耗输出。"),
  noEscape: passive("no-escape", "无处可逃", "远距离武器投掷和上古之矛获得增伤并有概率回怒。"),
  earthen: passive("earthen-might", "大地之怒", "跃击、地震和雪崩触发时恢复怒气，连接大地套循环。"),
};

const WASTES_GUIDE: BuildGuide = {
  id: "wastes-rend", name: "荒原旋风痛割", set: "荒原之怒", core: "旋风斩 → 安博之骄 → 痛割",
  summary: "旋风斩负责移动、触发与减伤，真正伤害来自安博之骄自动施放并瞬间结算的痛割。",
  difficulty: "低门槛 · 高机动", follower: "魔女", followerReason: "冷却缩减和攻速帮助狂战之怒常驻，远程控场也不会打乱旋风路线。",
  gear: [
    ...WASTES,
    legendary("morticks", "腕部", "莫提克的护腕", "morticks-brace-p2_unique_bracer_003.png", "狂战之怒获得全部符文：攻速、闪避、吸血与减伤一次接通。", ["物理技能伤害", "暴击几率", "力量", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "先拿任意特效版本" ]),
    legendary("lamentation", "腰部", "悲恸", "lamentation-p67_unique_barbbelt_005.png", "允许痛割叠加两层并提供独立增伤，是荒原痛割的核心乘区。", ["特效接近上限", "力量", "体能", "生命%"], ["血岩碎片赌博重型腰带", "黄装升级：70级重型腰带，用野蛮人", "普通腰带底材会进入错误池"], "必须使用野蛮人专属重型腰带底材。"),
    flavor(GEM.trapped), focus(GEM.taeguk), restraint(GEM.stricken),
    legendary("bulkathos-vow", "主手", "布尔凯索的庄严誓词", "bulkathoss-solemn-vow-unique_mighty_1h_010_x1.png", "与战士之血组成双刀套，提供怒气与旋风移速，适合速刷和低巅峰。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级：70级单手重型武器", "世界掉落", "必须和另一把布尔凯索武器配套" ]),
    legendary("bulkathos-blood", "副手", "布尔凯索的战士之血", "bulkathoss-warrior-blood-unique_mighty_1h_011_x1.png", "双刀套另一件；维持旋风时不再为怒气停手。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级：70级单手重型武器", "世界掉落", "冲层高巅峰可换对剑" ]),
  ],
  skills: [
    ability("whirlwind", "旋风斩", "集血斩", "维持移动、荒原减伤与安博自动痛割；它是发动机而非主要伤害。"),
    ability("rend", "痛割", "血流成河", "物理持续伤害由安博自动施放并瞬间结算，悲恸允许叠两层。"),
    ability("battle-rage", "战斗怒火", "血溅十方", "暴击制造范围溅射，帮助痛割清理高密度怪群。"),
    ability("ground-stomp", "大地践踏", "陷地猛击", "聚怪并触发力量指环；冲层时把敌人拉入痛割覆盖区。"),
    ability("ignore-pain", "无视苦痛", "铁骨钢筋", "危险阶段主动补减伤，填补力量指环或狂战的空窗。"),
    ability("wrath-of-the-berserker", "狂战之怒", "癫狂", "通过黄道戒与旋风高频命中保持常驻；莫提克同时给予所有符文。"),
  ],
  passives: [COMMON_PASSIVES.rampage, COMMON_PASSIVES.ruthless, COMMON_PASSIVES.boon, COMMON_PASSIVES.nerves],
  powers: [
    power("ambos-pride", "武器", "安博之骄", "ambos-pride-p67_unique_mighty_1h_012.png", "旋风斩自动施放痛割，并让痛割总伤害在1秒内结算。", "把移动技能变成痛割触发器，是整套BD的发动机。", "黄装升级：70级单手重型武器，用野蛮人角色。"),
    power("mantle-channeling", "防具", "导能披肩", "mantle-of-channeling-p4_unique_shoulder_103.png", "引导旋风斩时同时增伤并减伤。", "只要保持旋风，引导乘区与坚韧就不会断。", "血岩赌博护肩或黄装升级70级护肩。"),
    power("band-of-might", "首饰", "力量指环", "band-of-might-p61_unique_ring_05.png", "施放大地践踏后获得巨额减伤。", "让意志壁垒双戒留在身上，同时保留荒原贴身旋转所需的核心减伤。", "1级野蛮人赌博戒指最容易；优先萃取高特效。"),
    power("zodiac", "第4槽", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗资源的攻击命中时缩短一个冷却技能。", "第39赛季第四槽用旋风高频命中刷新狂战之怒和无视苦痛。", "黄装升级70级戒指；特效无浮动，优先萃取。"),
  ],
  variants: variants("对剑可替代布尔凯索双刀换取更高站桩输出。", "布尔凯索双刀维持怒气与移速，清图最顺。", "先用双刀和钢铁神经保证连续转动。", "武器范围伤、物理元素和痛割技能伤决定上限。"),
  links: [
    { title: "旋风转化为痛割", category: "damage", steps: [{ id: "whirlwind", label: "旋风斩", detail: "持续引导并穿过怪群" }, { id: "ambos-pride", label: "安博之骄", detail: "自动施放并瞬间结算痛割" }, { id: "rend", label: "痛割", detail: "主要伤害来源" }, { id: "lamentation", label: "悲恸", detail: "叠两层并追加乘区" }], conclusion: "旋风只是发动机；词缀和元素伤应优先服务痛割。" },
    { title: "常驻狂战", category: "defense", steps: [{ id: "whirlwind", label: "旋风高频命中", detail: "持续触发黄道戒" }, { id: "zodiac", label: "黄道黑曜石", detail: "缩短冷却" }, { id: "wrath-of-the-berserker", label: "狂战之怒", detail: "保持变身" }, { id: "morticks", label: "莫提克护腕", detail: "获得全部符文攻防" }], conclusion: "不断旋风就是不断刷新攻速、减伤、吸血和控制免疫。" },
    { title: "聚怪减伤", category: "defense", steps: [{ id: "ground-stomp", label: "大地践踏", detail: "聚怪并触发戒指" }, { id: "band-of-might", label: "力量指环", detail: "获得巨额减伤" }, { id: "battle-rage", label: "血溅十方", detail: "密度转化范围溅射" }], conclusion: "践踏不是单纯控制：它同时建立生存和怪群输出条件。" },
  ],
  rotation: [
    { title: "开局变身", action: "开启战斗怒火与狂战之怒，再进入旋风。", reason: "莫提克全部符文与荒原减伤要先接通。" },
    { title: "践踏聚怪", action: "在精英附近用大地践踏拉紧怪群。", reason: "触发力量指环并提高血溅十方和范围伤收益。" },
    { title: "持续穿怪", action: "围绕怪群小范围旋转，不要离开痛割覆盖区。", reason: "安博会自动挂痛割并瞬间结算。" },
    { title: "维持双戒", action: "每轮先践踏触发生成端，再持续旋风触发消耗端。", reason: "第39赛季穿克己守心，两种技能都命中过才能保持完整增伤。" },
    { title: "补技能", action: "狂战或无视苦痛接近断档时继续命中，不要空转。", reason: "黄道戒必须命中敌人才会缩短冷却。" },
  ],
  source: "https://www.icy-veins.com/d3/rend-wastes-barbarian-bis-gear-gems-paragon-points",
};

const RAEKOR_GUIDE: BuildGuide = {
  id: "raekor-boulder", name: "蕾蔻巨石", set: "蕾蔻的传世铠", core: "武器投掷攒怒 → 巨石怒掷清空怒气",
  summary: "武器投掷和狂暴冲锋叠加蕾蔻层数与怒气，巨石怒掷把全部怒气一次转成远程爆发。",
  difficulty: "高操作 · 远程爆发", follower: "魔女", followerReason: "冷却与控场帮助狂暴冲锋、狂战之怒和无视苦痛稳定轮转。",
  gear: [
    RAEKOR[0], RAEKOR[1], RAEKOR[2], RAEKOR[3],
    { ...setPiece("crimson-belt", "腰部", "克里森船长的丝带", "captain-crimsons-silk-girdle.png", "克里森船长的饰衣", "生命%"), acquisition: ["悬赏宝箱获取设计图", "铁匠直接锻造腰带", "这是锻造套装，不要黄装升级"] },
    { ...setPiece("crimson-pants", "腿部", "克里森船长的推裤", "captain-crimsons-thrust.png", "克里森船长的饰衣", "护甲"), acquisition: ["悬赏宝箱获取设计图", "铁匠直接锻造腿甲", "这是锻造套装，不要黄装升级"] },
    RAEKOR[5],
    legendary("skular", "腕部", "斯古拉的救赎", "skulars-salvation-p73_unique_bracer_101.png", "巨石怒掷伤害获得巨大提高；命中少量敌人时再次翻倍。", ["物理技能伤害", "暴击几率", "力量", "体能"], ["血岩赌博护腕", "黄装升级：70级护腕", "特效优先于远古品质" ]),
    traveler(GEM.zei), compass(GEM.trapped), band(GEM.stricken),
    legendary("arreats-law", "主手", "亚瑞特律法", "arreats-law-p73_unique_spear_001.png", "武器投掷根据距离额外回怒，巨石怒掷命中会返还怒气。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级：必须是70级单手长矛", "普通单手武器不会进入这个池", "与三百壮矛一起优先制作"], "底材是单手长矛，不是双手长矛或单手重型武器。"),
    legendary("three-hundredth", "副手", "三百壮矛", "the-three-hundredth-spear-p73_unique_spear_002.png", "同时提高武器投掷和上古之矛伤害，并增加武器投掷攻速。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级：70级单手长矛", "世界掉落", "与亚瑞特律法共用同一正确底材池" ]),
  ],
  skills: [ability("weapon-throw", "武器投掷", "平衡武器", "远距离命中回怒并叠蕾蔻层数，为下一发巨石准备。"), ability("ancient-spear", "上古之矛", "巨石怒掷", "清空全部怒气并按消耗量放大伤害；是核心爆发。"), ability("furious-charge", "狂暴冲锋", "无情突袭", "穿怪位移、叠套装与触发力量指环；命中足够敌人可立刻重置。"), ability("battle-rage", "战斗怒火", "血溅十方", "暴击把单次巨石爆发扩散到怪群。"), ability("ignore-pain", "无视苦痛", "铁骨钢筋", "巨石准备期的主动减伤。"), ability("wrath-of-the-berserker", "狂战之怒", "癫狂", "提供攻速、暴击与控制免疫，黄道戒负责刷新。")],
  passives: [COMMON_PASSIVES.rampage, passive("relentless", "狂暴者之怒", "低生命时降低受到伤害和技能消耗，帮助危险阶段完成投掷。"), COMMON_PASSIVES.noEscape, COMMON_PASSIVES.boon],
  powers: [power("furnace", "武器", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高对精英伤害。", "巨石最需要快速处理精英与首领。", "黄装升级70级双手锤。"), power("ancient-parthan", "防具", "古帕萨卫士护腕", "ancient-parthan-defenders-unique_bracer_102_x1.png", "附近每个被眩晕敌人提供减伤。", "冲锋和控制制造眩晕，密度直接变成坚韧。", "血岩赌博护腕后萃取。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装奖励需求件数减少1件。", "为变体与功能装备释放槽位。", "只来自第一幕/第四幕悬赏宝箱。"), power("zodiac", "第4槽", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "消耗资源命中缩短冷却。", "巨石怒掷清空怒气时快速刷新狂战和无视苦痛。", "黄装升级70级戒指后萃取。")],
  variants: variants("保留斯古拉、贼神和受罚者，远距离打满巨石乘区。", "用冲锋穿图，低层可把受罚者换强者之灾。", "先把两把单手长矛升级出来，再追套装词缀。", "范围伤与减耗平衡决定巨石在高密度的表现。"),
  links: [
    { title: "怒气变成巨石", category: "resource", steps: [{ id: "weapon-throw", label: "武器投掷", detail: "远距离生成怒气" }, { id: "arreats-law", label: "亚瑞特律法", detail: "按距离追加回怒" }, { id: "ancient-spear", label: "巨石怒掷", detail: "清空全部怒气" }, { id: "skular", label: "斯古拉护腕", detail: "巨额技能乘区" }], conclusion: "先攒满再扔；半怒巨石会直接浪费核心倍率。" },
    { title: "远距离乘区", category: "damage", steps: [{ id: "no-escape", label: "无处可逃", detail: "远距离增伤" }, { id: "three-hundredth", label: "三百壮矛", detail: "同时放大投掷与巨石" }, { id: "travelers-pledge", label: "无尽之途", detail: "站定蓄力时逐步转为增伤" }, { id: "crimson-belt", label: "船长套", detail: "冷却与减耗转成攻防" }], conclusion: "拉开距离站定攒怒，同时启动被动、贼神与旅者增伤。" },
    { title: "冲锋攻防", category: "defense", steps: [{ id: "furious-charge", label: "狂暴冲锋", detail: "穿怪并控制" }, { id: "band-of-might", label: "力量指环", detail: "触发巨额减伤" }, { id: "ancient-parthan", label: "古帕萨护腕", detail: "眩晕密度继续减伤" }], conclusion: "每次投掷前先冲锋，既刷新层数也接通两层防御。" },
  ],
  rotation: [{ title: "冲锋进场", action: "穿过密集怪群并保持力量指环。", reason: "没有冲锋就同时缺蕾蔻层数和减伤。" }, { title: "远程攒怒", action: "拉开距离连续武器投掷，直到怒气接近满值。", reason: "亚瑞特律法按距离提高回怒。" }, { title: "站定蓄力", action: "与目标保持远距，并让旅者之誓逐步转入增伤状态。", reason: "远距同时吃到无处可逃、贼神和无尽之途。" }, { title: "满怒投掷", action: "对精英或少量高价值目标释放巨石怒掷。", reason: "消耗怒气越多伤害越高，斯古拉在少目标时再翻倍。" }, { title: "立即重建", action: "投掷后重新冲锋、拉开距离并攒怒。", reason: "黄道戒和套装层数都依赖循环不停顿。" }],
  source: "https://www.icy-veins.com/d3/barbarian-boulder-toss-build-with-the-raekor-set",
};

const IK_HOTA_GUIDE: BuildGuide = {
  id: "ik-hota", name: "不朽先祖锤", set: "不朽之王的呼唤", core: "先祖与狂战常驻 → 先祖之锤",
  summary: "不朽六件让先祖召唤与狂战之怒常驻，悔恨与审判之锤把满怒先祖之锤放大成近战爆发。",
  difficulty: "中等 · 贴身爆发", follower: "魔女", followerReason: "冷却和控场帮助保持变身，远程控制还能给贴身锤击创造安全窗口。",
  gear: [
    ...IK,
    legendary("fury-ancients", "肩部", "先民护肩", "fury-of-the-ancients-p67_unique_shoulder_102.png", "先祖召唤获得全符文，并提高先祖攻速；与不朽套常驻先祖直接联动。", ["范围伤害", "冷却缩减", "力量", "体能"], ["血岩赌博护肩", "黄装升级70级护肩", "先拿特效后追远古" ]),
    legendary("first-men", "腕部", "先民护腕", "bracers-of-the-first-men-p61_unique_bracer_105.png", "提高先祖之锤攻速与伤害，是技能专属乘区。", ["火焰技能伤害", "暴击几率", "力量", "体能"], ["血岩赌博护腕", "黄装升级70级护腕", "特效优先级高" ]),
    traveler(GEM.trapped), compass(GEM.stricken), coe(GEM.gogok),
    legendary("slanderer", "主手", "诽谤者", "the-slanderer-unique_sword_1h_set_02_x1.png", "与小流氓组成伊斯特凡对剑；消耗怒气时叠加攻速、伤害与护甲。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级：70级单手剑", "必须与小流氓配套", "第39赛季依靠第四魔方槽保留悔恨" ]),
    legendary("little-rogue", "副手", "小流氓", "little-rogue-unique_sword_1h_set_03_x1.png", "伊斯特凡对剑的另一件；连续先祖锤让攻防层数常驻。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级：70级单手剑", "必须与诽谤者配套", "只穿一把没有套装效果" ]),
  ],
  skills: [ability("furious-charge", "狂暴冲锋", "无情突袭", "位移并触发力量指环。"), ability("hammer-of-the-ancients", "先祖之锤", "蓄力重击", "火焰核心输出；怒气越高，技能自带暴击越稳定。"), ability("battle-rage", "战斗怒火", "血溅十方", "暴击把锤击扩散到怪群。"), ability("threatening-shout", "威吓呐喊", "恫吓", "让敌人承受更多伤害并降低威胁。"), ability("wrath-of-the-berserker", "狂战之怒", "癫狂", "与先祖同时常驻后启动悔恨。"), ability("call-of-the-ancients", "先祖召唤", "戮力同心", "常驻先祖分担伤害，并满足不朽与悔恨条件。")],
  passives: [COMMON_PASSIVES.berserker, COMMON_PASSIVES.rampage, COMMON_PASSIVES.ruthless, COMMON_PASSIVES.nerves],
  powers: [power("gavel", "武器", "审判之锤", "the-gavel-of-judgment-p61_unique_mighty_2h_001.png", "先祖之锤命中少量敌人时返还怒气并大幅增伤。", "让近身锤击既满怒又获得技能专属乘区。", "黄装升级70级双手重型武器。"), power("morticks", "防具", "莫提克的护腕", "morticks-brace-p2_unique_bracer_003.png", "狂战之怒获得全部符文。", "一次获得攻速、闪避、吸血和减伤，覆盖贴身锤击。", "血岩赌博护腕或黄装升级70级护腕后萃取。"), power("band-of-might", "首饰", "力量指环", "band-of-might-p61_unique_ring_05.png", "狂暴冲锋后获得巨额减伤。", "每轮贴身输出前用冲锋刷新，是主要硬减伤。", "1级野蛮人赌博戒指最容易。"), power("remorseless", "第4槽", "悔恨", "remorseless-p72_unique_mighty_1h_102.png", "狂战与先祖同时存在时大幅提高先祖之锤伤害。", "第39赛季穿伊斯特凡对剑，第四槽保留先祖锤核心乘区。", "黄装升级70级单手重型武器。")],
  variants: variants("贴身等待火焰元素周期，保持满怒和无尽之途站定增伤。", "冲锋串怪，低层可换机动被动与击杀触发装备。", "不朽套允许先成型再逐步补悔恨和护腕。", "范围伤、火焰元素与武器白字优先，力量可逐步洗掉。"),
  links: [{ title: "不朽常驻条件", category: "damage", steps: [{ id: "call-of-the-ancients", label: "先祖召唤", detail: "常驻先祖" }, { id: "wrath-of-the-berserker", label: "狂战之怒", detail: "常驻变身" }, { id: "remorseless", label: "悔恨", detail: "同时存在时放大先祖锤" }, { id: "hammer-of-the-ancients", label: "先祖之锤", detail: "核心输出" }], conclusion: "先祖或狂战任何一项中断，悔恨乘区就会消失。" }, { title: "满怒攻防", category: "defense", steps: [{ id: "gavel", label: "审判之锤", detail: "少目标返还怒气" }, { id: "berserker-rage", label: "狂战盛怒", detail: "满怒增伤" }, { id: "slanderer", label: "伊斯特凡对剑", detail: "消耗怒气叠攻速、伤害和护甲" }, { id: "hammer-of-the-ancients", label: "先祖之锤", detail: "怒气提高技能暴击" }], conclusion: "返怒保持高资源，对剑则把连续消耗转成额外攻防。" }, { title: "进场减伤", category: "defense", steps: [{ id: "furious-charge", label: "狂暴冲锋", detail: "切入目标" }, { id: "band-of-might", label: "力量指环", detail: "刷新巨额减伤" }, { id: "morticks", label: "莫提克全符文", detail: "狂战追加减伤与吸血" }], conclusion: "每轮近身锤击前先冲锋，避免力量指环断档。" }],
  rotation: [{ title: "召先祖", action: "进图先开启先祖召唤和狂战之怒。", reason: "不朽套与悔恨必须两项同时生效。" }, { title: "冲锋进场", action: "撞入精英或密集怪群。", reason: "位移同时刷新力量指环减伤。" }, { title: "上易伤", action: "开启战斗怒火并使用威吓呐喊。", reason: "血溅十方和恫吓共同放大怪群伤害。" }, { title: "火焰连锤", action: "火焰周期内站定连续施放先祖之锤。", reason: "全能法戒、悔恨、先民护腕与旅者增伤在此叠加。" }, { title: "保持满怒", action: "不要无目标空锤；怒气下降时优先命中少量敌人。", reason: "审判之锤返怒连接被动、技能暴击和对剑层数。" }],
  source: "https://www.icy-veins.com/d3/barbarian-hota-build-with-immortal-king",
};

const LOD_HOTA_GUIDE: BuildGuide = {
  id: "lod-hota", name: "梦遗先祖锤", set: "梦之遗礼", core: "远古散件乘区 → 满怒先祖之锤",
  summary: "舍弃套装，用梦之遗礼把每件远古散件转成独立增伤与减伤，换取先祖之锤的最高上限。",
  difficulty: "高装备门槛 · 高上限", follower: "魔女", followerReason: "冷却缩减让无视苦痛和狂战循环更稳定，控场有助于保护斯奎特。",
  gear: [
    legendary("leoric", "头部", "李奥瑞克的王冠", "leorics-crown-unique_helm_002_p1.png", "放大头部钻石的冷却缩减，帮助狂战和无视苦痛周转。", ["先祖之锤伤害", "暴击几率", "力量", "镶孔"], ["血岩赌博头盔", "黄装升级70级头盔", "梦遗版本后期必须远古" ]),
    legendary("fury-ancients", "肩部", "先民护肩", "fury-of-the-ancients-p67_unique_shoulder_102.png", "先祖获得全部符文与攻速，戮力同心常驻分担伤害。", ["范围伤害", "冷却缩减", "力量", "体能"], ["血岩赌博护肩", "黄装升级70级护肩", "后期必须远古" ]),
    legendary("cindercoat", "胸部", "燃火外套", "cindercoat-unique_chest_006_x1.png", "降低火焰技能消耗并提高火伤，维持连续锤击。", ["火焰技能伤害", "3个镶孔", "力量", "体能"], ["血岩赌博胸甲", "黄装升级70级胸甲", "远古且火伤正确再强化" ]),
    legendary("magefist", "手部", "法师之拳", "magefist-p41_unique_gloves_014.png", "自带火焰元素伤，直接放大蓄力重击。", ["暴击几率", "暴击伤害", "火焰技能伤害", "范围伤害"], ["血岩赌博手套", "黄装升级70级手套", "四攻远古非常稀有，先保三攻" ]),
    legendary("morticks", "腕部", "莫提克的护腕", "morticks-brace-p2_unique_bracer_003.png", "狂战之怒获得全部符文，提供减伤、吸血与攻速。", ["火焰技能伤害", "暴击几率", "力量", "体能"], ["血岩赌博护腕", "黄装升级70级护腕", "第39赛季先民护腕放魔方" ]),
    legendary("cassius", "腰部", "卡修斯的骄傲", "pride-of-cassius-unique_barbbelt_002_x1.png", "延长无视苦痛持续时间，让主动减伤覆盖循环。", ["特效接近上限", "力量", "体能", "生命%"], ["血岩赌博重型腰带", "黄装升级70级重型腰带", "普通腰带底材不对"], "必须升级重型腰带。"),
    legendary("blackthorne-pants", "腿部", "黑荆棘锁甲马裤", "blackthornes-jousting-mail-unique_pants_013_x1.png", "裤子可提供火焰元素伤；只穿一件不会激活套装奖励。", ["火焰技能伤害", "2个镶孔", "力量", "体能"], ["血岩赌博裤子", "黄装升级70级裤子", "不要再穿第二件黑荆棘"], "梦遗可以穿单件套装物品，但不能激活任何套装奖励。"),
    legendary("illusory-boots", "脚部", "虚幻长靴", "illusory-boots-unique_boots_103_x1.png", "允许穿过敌人，贴近精英时不会被小怪卡住。", ["先祖之锤伤害", "力量", "体能", "全抗"], ["只来自第二幕/第四幕悬赏宝箱", "不能通过世界掉落稳定获得", "不要用血岩硬赌" ]),
    legendary("hellfire", "颈部", "地狱火护符", "design-hellfire-amulet-craftingplan_jeweler_12_legendary_hellfire_amulet_x1.png", "额外提供一个有用被动，兼顾双暴、火焰和镶孔。", ["镶孔", "暴击伤害", "暴击几率", "火焰技能伤害"], ["完成钥匙守护者与炼狱装置", "珠宝匠制作，反复锻造", "被动正确但词缀差也不如普通好项链"], undefined, GEM.trapped),
    legendary("zodiac", "手指", "黄道黑曜石之戒", "obsidian-ring-of-the-zodiac-unique_ring_023_p2.png", "锤击消耗怒气并命中时刷新无视苦痛和狂战。", ["镶孔", "暴击几率", "冷却缩减", "攻击速度"], ["黄装升级70级戒指", "世界掉落", "固定词缀限制大，先保证镶孔"], undefined, GEM.lod),
    band(GEM.stricken),
    legendary("remorseless", "主手", "悔恨", "remorseless-p72_unique_mighty_1h_102.png", "狂战与先祖同时存在时大幅提高先祖之锤伤害。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级70级单手重型武器", "野蛮人角色专属池", "远古是梦遗最终成型要求" ]),
    legendary("echoing-fury", "副手", "怒火回荡", "echoing-fury-p66_unique_mace_1h_001.png", "击杀叠攻速与移速，密集怪群中显著提高锤击频率。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级70级单手锤", "世界掉落", "首领阶段无法稳定保持击杀层" ]),
  ],
  skills: [ability("furious-charge", "狂暴冲锋", "无情突袭", "位移并触发力量指环。"), ability("hammer-of-the-ancients", "先祖之锤", "蓄力重击", "火焰核心伤害；保持满怒连续锤击。"), ability("call-of-the-ancients", "先祖召唤", "戮力同心", "与狂战共同启动悔恨，并分担伤害。"), ability("battle-rage", "战斗怒火", "血溅十方", "把高暴击锤击扩散到怪群。"), ability("ignore-pain", "无视苦痛", "百折不挠", "卡修斯延长持续时间，形成主动减伤覆盖。"), ability("wrath-of-the-berserker", "狂战之怒", "癫狂", "莫提克给予全部符文，兼顾攻防与控制免疫。")],
  passives: [COMMON_PASSIVES.ruthless, COMMON_PASSIVES.berserker, passive("weapons-master", "武器大师", "根据主手武器类型提供额外伤害或资源收益。"), COMMON_PASSIVES.boon],
  powers: [power("gavel", "武器", "审判之锤", "the-gavel-of-judgment-p61_unique_mighty_2h_001.png", "少目标时先祖锤返怒并大幅增伤。", "连接满怒暴击、持续输出与技能专属乘区。", "黄装升级70级双手重型武器。"), power("first-men", "防具", "先民护腕", "bracers-of-the-first-men-p61_unique_bracer_105.png", "提高先祖之锤攻速和伤害。", "魔方取满特效，穿戴槽留给莫提克全部符文。", "血岩赌博护腕后萃取。"), power("coe", "首饰", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "火焰周期提供元素爆发。", "把站定连锤压进火焰窗。", "黄装升级70级戒指。"), power("furnace", "第4槽", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "提高对精英伤害。", "第39赛季第四槽补足高层精英。", "黄装升级70级双手锤。")],
  variants: variants("全套远古、梦遗99级后才体现上限，围绕火焰周期站定。", "不建议用未成型梦遗速刷；低层可换击杀移速装备。", "远古不齐时先玩不朽先祖锤，逐件存正确散件。", "高巅峰洗掉力量补范围伤和冷却，梦遗乘区吃满。"),
  links: [{ title: "梦遗散件乘区", category: "damage", steps: [{ id: "lod-hota-result", label: "无套装奖励", detail: "每个槽位保持散件" }, { id: "zodiac", label: "黄道戒镶嵌梦遗", detail: "远古散件逐件放大" }, { id: "remorseless", label: "悔恨", detail: "常驻先祖与狂战后增伤" }, { id: "hammer-of-the-ancients", label: "先祖之锤", detail: "火焰爆发" }], conclusion: "任何激活的两件套都会关闭梦遗；单件绿色装备本身可以使用。" }, { title: "无视苦痛循环", category: "defense", steps: [{ id: "ignore-pain", label: "无视苦痛", detail: "主动减伤" }, { id: "cassius", label: "卡修斯腰带", detail: "延长持续" }, { id: "zodiac", label: "黄道戒", detail: "锤击刷新冷却" }, { id: "wrath-of-the-berserker", label: "莫提克狂战", detail: "再叠减伤与吸血" }], conclusion: "输出不停，黄道才会让主动减伤覆盖完整循环。" }, { title: "满怒火锤", category: "damage", steps: [{ id: "gavel", label: "审判之锤", detail: "返怒与技能乘区" }, { id: "berserker-rage", label: "狂战盛怒", detail: "满怒增伤" }, { id: "coe", label: "全能火焰", detail: "元素窗口" }, { id: "first-men", label: "先民护腕", detail: "攻速与技能伤" }], conclusion: "火焰窗内以高怒气连续锤击，避免无目标空耗。" }],
  rotation: [{ title: "检查梦遗", action: "确认没有激活任何两件套，梦遗宝石已升级。", reason: "套装奖励会直接关闭梦遗效果。" }, { title: "启动双常驻", action: "开启先祖召唤与狂战之怒。", reason: "悔恨必须同时检测到两项。" }, { title: "冲锋贴近", action: "冲入精英身边并刷新力量指环。", reason: "先祖锤是贴身技能，必须先建立减伤。" }, { title: "覆盖无视苦痛", action: "进入危险密度前开启无视苦痛。", reason: "卡修斯与黄道能把主动减伤延长并刷新。" }, { title: "火焰连锤", action: "全能火焰时站定连锤，元素结束后调整位置。", reason: "火伤散件、全能、悔恨和先民护腕在此叠加。" }],
  source: "https://www.icy-veins.com/d3/barbarian-hammer-of-the-ancients-gr-build-with-legacy-of-dreams",
};

const EARTH_GUIDE: BuildGuide = {
  id: "earth-leapquake", name: "大地跃击", set: "大地之力", core: "跃击连跳 → 自动地震",
  summary: "蕾蔻战靴让跃击连续施放，大地四件自动触发地震；刀锋部族再把战吼与威吓转成地震和雪崩。",
  difficulty: "中等 · 连跳控场", follower: "圣殿骑士", followerReason: "治疗和保命能覆盖连续跃入怪群的风险，适合低巅峰和装备成型期。",
  gear: [
    ...EARTH,
    legendary("ancient-parthan", "腕部", "古帕萨卫士护腕", "ancient-parthan-defenders-unique_bracer_102_x1.png", "跃击眩晕附近敌人后，按受控敌人数提供减伤。", ["火焰技能伤害", "暴击几率", "力量", "体能"], ["血岩赌博护腕", "黄装升级70级护腕", "高密度减伤优先" ]),
    legendary("girdle-giants", "腰部", "巨人束腰", "girdle-of-giants-p61_unique_barbbelt_eq.png", "裂地斩命中后提高地震伤害，连接消耗技能与自动地震。", ["特效接近上限", "力量", "体能", "生命%"], ["血岩赌博重型腰带", "黄装升级70级重型腰带", "必须用野蛮人专属底材" ]),
    squirt(GEM.trapped), focus(GEM.stricken), restraint(GEM.gogok),
    legendary("furnace-worn", "主手", "焚炉", "the-furnace-unique_mace_2h_103_x1.png", "双手高白字并提高精英伤害；大地地震不需要双持。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级70级双手锤", "世界掉落", "双手武器会占用副手槽" ]),
  ],
  skills: [ability("earthquake", "地震", "熔火震波", "手动地震与套装自动地震叠加，是主要持续范围伤害。"), ability("seismic-slam", "裂地斩", "余震", "消耗怒气、触发守心并启动巨人束腰。"), ability("war-cry", "战吼", "顽抗战吼", "刀锋部族使战吼额外触发地震和雪崩。"), ability("leap", "跃击", "从天而降", "蕾蔻战靴允许连续三跳，每次触发套装地震并眩晕。"), ability("threatening-shout", "威吓呐喊", "恫吓", "让敌人易伤，刀锋部族再额外触发地震与雪崩。"), ability("wrath-of-the-berserker", "狂战之怒", "癫狂", "提高攻速、暴击与生存，布尔凯索被动压缩冷却。")],
  passives: [COMMON_PASSIVES.rampage, COMMON_PASSIVES.earthen, COMMON_PASSIVES.ruthless, COMMON_PASSIVES.boon],
  powers: [power("blade-tribes", "武器", "刀锋部族", "blade-of-the-tribes-p610_unique_mighty_2h_101.png", "战吼和威吓呐喊触发地震与雪崩，并提高二者伤害。", "把两个功能性呐喊变成额外伤害按钮。", "黄装升级70级双手重型武器。"), power("lut-socks", "防具", "蕾蔻战靴", "lut-socks-unique_boots_009_x1.png", "跃击落地后可在冷却前再次施放两次。", "三连跳等于三次地震、控制与位移。", "血岩赌博靴子后萃取。"), power("band-of-might", "首饰", "力量指环", "band-of-might-p61_unique_ring_05.png", "跃击后获得巨额减伤。", "每次三连跳自动刷新生存核心。", "1级野蛮人赌博戒指最容易。"), power("coe", "第4槽", "全能法戒", "convention-of-elements-p2_unique_ring_04.png", "火焰周期提高地震伤害。", "第39赛季第四槽让大地完整保留意志壁垒与元素窗。", "黄装升级70级戒指。")],
  variants: variants("围绕火焰周期把三连跳、双呐喊和手动地震叠在精英脚下。", "低层把功能技能换成冲锋或疾奔，连续跳过零散怪。", "先凑六件大地和蕾蔻战靴，武器特效可先萃取。", "范围伤、火焰元素与地震技能伤优先，高密度收益明显。"),
  links: [{ title: "三连跳地震", category: "damage", steps: [{ id: "leap", label: "跃击", detail: "落地触发套装" }, { id: "lut-socks", label: "蕾蔻战靴", detail: "允许连续三跳" }, { id: "earthquake", label: "自动地震", detail: "每次落地生成" }, { id: "ancient-parthan", label: "古帕萨护腕", detail: "眩晕敌人转减伤" }], conclusion: "三连跳同时完成位移、输出、控制和减伤刷新。" }, { title: "呐喊变伤害", category: "damage", steps: [{ id: "war-cry", label: "战吼", detail: "功能技能" }, { id: "threatening-shout", label: "威吓呐喊", detail: "易伤敌人" }, { id: "blade-tribes", label: "刀锋部族", detail: "两者触发地震与雪崩" }, { id: "coe", label: "全能火焰", detail: "元素窗叠加" }], conclusion: "火焰周期内连续使用两个呐喊，相当于额外投放两轮范围伤害。" }, { title: "生成消耗双戒", category: "resource", steps: [{ id: "leap", label: "跃击/大地之怒", detail: "恢复怒气并触发克己" }, { id: "seismic-slam", label: "裂地斩", detail: "消耗怒气触发守心" }, { id: "girdle-giants", label: "巨人束腰", detail: "裂地斩后放大地震" }], conclusion: "每轮三跳后补一次裂地斩，保持意志壁垒两半和腰带特效。" }],
  rotation: [{ title: "三跳进场", action: "对精英脚下连续施放三次跃击。", reason: "蕾蔻战靴让每次落地都产生地震并刷新减伤。" }, { title: "补裂地斩", action: "落地后立即对怪群使用裂地斩。", reason: "消耗怒气触发守心，并启动巨人束腰。" }, { title: "双呐喊", action: "火焰元素即将到来时依次使用战吼和威吓。", reason: "刀锋部族让两个技能额外触发地震与雪崩。" }, { title: "手动地震", action: "把手动地震也压在精英和元素窗内。", reason: "自动地震与手动地震可以共同覆盖目标区域。" }, { title: "重新起跳", action: "三跳可用时再次落到新位置，避免原地硬抗。", reason: "位移本身就是套装伤害和力量指环减伤来源。" }],
  source: "https://www.icy-veins.com/d3/barbarian-leap-earthquake-build-with-might-of-the-earth",
};

const FRENZY_GUIDE: BuildGuide = {
  id: "h90-frenzy", name: "九十蛮狂乱", set: "九十蛮", core: "战吼叠层 → 狂乱单体连击",
  summary: "九十蛮把战吼翻倍并让狂乱层数同时提供伤害与减伤；守誓者、无可争辩的勇士与兵要护符共同放大极速普攻。",
  difficulty: "中等 · 单体追杀", follower: "盗贼", followerReason: "暴击增益与远程控制更适合狂乱围绕精英逐个击杀的节奏。",
  gear: [
    SAVAGES[0],
    legendary("aughild-shoulders", "肩部", "奥吉德的力量", "/d3/aughild-shoulders.png", "与奥吉德护腕组成锻造套装；皇家华戒将两件视为三件，获得对精英攻防。", ["范围伤害", "冷却缩减", "力量", "体能"], ["悬赏宝箱获取设计图", "铁匠直接锻造护肩", "这是锻造套装，不要黄装升级"]),
    ...SAVAGES.slice(2),
    legendary("aughild-bracers", "腕部", "奥吉德的搜捕", "/d3/aughild-bracers.png", "与穿戴的奥吉德护肩组成两件；皇家华戒将其视为三件，获得对精英增伤并减伤。", ["冰霜技能伤害", "暴击几率", "力量", "体能"], ["悬赏宝箱获取设计图", "铁匠直接锻造护腕", "这是锻造套装，不要黄装升级"], "护肩和护腕必须同时穿戴，皇家华戒负责补成三件效果。"),
    legendary("undisputed", "腰部", "无可争辩的勇士", "the-undisputed-champion-p68_unique_barbbelt_006.png", "狂乱获得全部符文并大幅增伤，是技能发动机。", ["狂乱伤害", "特效接近上限", "力量", "体能"], ["血岩赌博重型腰带", "黄装升级70级重型腰带", "用野蛮人角色进入正确池" ]),
    traveler(GEM.trapped), compass(GEM.stricken), band(GEM.simplicity),
    legendary("slanderer", "主手", "诽谤者", "the-slanderer-unique_sword_1h_set_02_x1.png", "与小流氓组成伊斯特凡对剑；消耗怒气时叠加攻速、伤害与护甲。", ["高白字", "伤害%", "攻击速度", "范围伤害", "拉玛兰迪打孔"], ["黄装升级70级单手剑", "必须与小流氓配套", "第39赛季第四槽保留守誓者" ]),
    legendary("little-rogue", "副手", "小流氓", "little-rogue-unique_sword_1h_set_03_x1.png", "伊斯特凡对剑的另一件；用冲锋和主动技能消耗怒气维持攻防层数。", ["高白字", "伤害%", "攻击速度", "范围伤害", "拉玛兰迪打孔"], ["黄装升级70级单手剑", "必须与诽谤者配套", "只穿一把没有套装效果" ]),
  ],
  skills: [ability("frenzy", "狂乱", "狂人", "叠满10层后获得极高攻速；九十蛮把层数变成伤害与减伤。"), ability("furious-charge", "狂暴冲锋", "无情突袭", "追击精英并触发力量指环。"), ability("war-cry", "战吼", "顽抗战吼", "九十蛮两件翻倍战吼效果，提供大量坚韧。"), ability("threatening-shout", "威吓呐喊", "恫吓", "使目标承受更多伤害，套装延长并强化战吼体系。"), ability("battle-rage", "战斗怒火", "血溅十方", "狂乱高暴击高攻速转化为怪群溅射。"), ability("wrath-of-the-berserker", "狂战之怒", "癫狂", "攻速、暴击与控制免疫，覆盖高层精英战。")],
  passives: [COMMON_PASSIVES.rampage, COMMON_PASSIVES.berserker, COMMON_PASSIVES.boon, COMMON_PASSIVES.ruthless],
  powers: [power("bastions", "武器", "兵要护符", "bastions-revered-p68_unique_mighty_2h_004.png", "狂乱额外叠层并把攻击传递给附近敌人。", "把单体狂乱变成有限范围的连锁打击。", "黄装升级70级双手重型武器。"), power("depth-diggers", "防具", "深渊挖掘裤", "depth-diggers-unique_pants_006_p1.png", "提高产生资源的主要技能伤害。", "狂乱属于生成技能，直接获得独立乘区。", "血岩赌博裤子或黄装升级70级裤子。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装奖励需求减少1件。", "让奥吉德与九十蛮组合成立。", "第一幕/第四幕悬赏宝箱。"), power("oathkeeper", "第4槽", "守誓者", "oathkeeper-p4_unique_mighty_1h_104.png", "主要技能增伤并提高攻速。", "第39赛季可穿对剑，把守誓者满特效放第四槽。", "黄装升级70级单手重型武器。")],
  variants: variants("冰霜狂乱贴身追杀精英，保持旅者站定增伤。", "冲锋跳过杂兵，低层可换疾奔与击杀移速武器。", "先做重型腰带和守誓者；套装没齐时也能靠两件启动。", "高巅峰可穿对剑、第四槽守誓者，攻速断点和范围伤更重要。"),
  links: [{ title: "狂乱层数攻防", category: "damage", steps: [{ id: "frenzy", label: "狂乱", detail: "连续攻击叠层" }, { id: "undisputed", label: "无可争辩勇士", detail: "获得全符文与技能乘区" }, { id: "bastions", label: "兵要护符", detail: "增加层数并连锁邻近敌人" }, { id: "depth-diggers", label: "深渊挖掘裤", detail: "生成技能独立增伤" }], conclusion: "先叠满再换目标；频繁空挥或换怪会损失攻速和套装倍率。" }, { title: "贴身防御链", category: "defense", steps: [{ id: "furious-charge", label: "狂暴冲锋", detail: "切入并消耗怒气" }, { id: "slanderer", label: "伊斯特凡对剑", detail: "叠加攻速、伤害与护甲" }, { id: "band-of-might", label: "力量指环", detail: "冲锋后减伤" }, { id: "travelers-pledge", label: "无尽之途", detail: "站定增伤、移动减伤" }], conclusion: "冲锋接近后站定狂乱，对剑、力量指环与旅者状态完成攻防切换。" }, { title: "战吼翻倍", category: "defense", steps: [{ id: "war-cry", label: "战吼", detail: "基础坚韧增益" }, { id: "savages-head", label: "九十蛮套装", detail: "翻倍战吼效果" }, { id: "threatening-shout", label: "威吓呐喊", detail: "敌人易伤" }, { id: "battle-rage", label: "血溅十方", detail: "高攻速暴击扩散" }], conclusion: "呐喊不是辅助装饰，而是套装攻防和怪群输出的一部分。" }],
  rotation: [{ title: "开三吼", action: "开启战吼、威吓呐喊和战斗怒火。", reason: "九十蛮翻倍并延长吼叫效果。" }, { title: "冲锋锁敌", action: "优先冲向精英或高生命目标。", reason: "刷新力量指环，并跳过狂乱不擅长的零散杂兵。" }, { title: "叠满狂乱", action: "持续攻击同一目标直到层数达到上限。", reason: "套装、兵要护符和攻速都依赖层数。" }, { title: "站定追杀", action: "层数满后尽量贴住精英不换目标。", reason: "旅者站定增伤和至简之力会把单体输出推到最高。" }, { title: "移动续防", action: "躲地板或换目标时用冲锋，不要步行拖延。", reason: "冲锋同时保持力量指环，并让旅者切到移动减伤。" }],
  source: "https://www.icy-veins.com/d3/barbarian-frenzy-build-with-the-horde-of-the-ninety-savages-set",
};

const IK_CHARGE_GUIDE: BuildGuide = {
  id: "ik-charge", name: "不朽冲锋", set: "不朽之王6件 / 蕾蔻4件", core: "狂暴冲锋叠怪数与移速倍率",
  summary: "皇家华戒让五件不朽与三件蕾蔻同时成型：不朽负责狂战和先祖常驻，蕾蔻与邪秽之护把冲锋按怪物数量放大。",
  difficulty: "高操作 · 路线依赖", follower: "魔女", followerReason: "冷却与远程控场帮助冲锋持续穿怪，不会像近战随从一样抢先打散路线。",
  gear: [
    RAEKOR[0], RAEKOR[1], IK[1], IK[2],
    legendary("strongarm", "腕部", "力士护腕", "strongarm-bracers-unique_bracer_007_x1.png", "冲锋击退敌人后，使其承受更多伤害。", ["冰霜技能伤害", "暴击几率", "力量", "体能"], ["血岩赌博护腕", "黄装升级70级护腕", "冲锋本身提供击退触发" ]),
    IK[3], IK[4], RAEKOR[5],
    squirt(GEM.trapped), focus(GEM.stricken), restraint(GEM.gogok),
    legendary("ik-boulder-breaker", "主手", "不朽之王的碎石者", "immortal-kings-boulder-breaker-unique_mighty_2h_010_x1.png", "作为第五件不朽装备，让皇家华戒补成六件效果；双手武器不装备副手。", ["高白字", "伤害%", "范围伤害", "力量", "拉玛兰迪打孔"], ["黄装升级70级双手重型武器", "世界掉落", "这是套装武器，不能套装转换成护甲"], "套装转换不能处理武器；必须掉落或升级双手重型武器。"),
  ],
  skills: [ability("furious-charge", "狂暴冲锋", "无情突袭", "主要输出；命中足够敌人时重置，穿过怪群越多越强。"), ability("seismic-slam", "裂地斩", "余震", "清空怒气以缩短不朽套相关冷却，并触发守心。"), ability("battle-rage", "战斗怒火", "血溅十方", "冲锋暴击转化为密度溅射。"), ability("sprint", "疾奔", "疾风狂奔", "提高寻找直线怪群和调整冲锋角度的速度。"), ability("wrath-of-the-berserker", "狂战之怒", "癫狂", "不朽套常驻的攻防核心。"), ability("call-of-the-ancients", "先祖召唤", "戮力同心", "不朽套常驻并分担伤害。")],
  passives: [COMMON_PASSIVES.rampage, COMMON_PASSIVES.ruthless, COMMON_PASSIVES.boon, COMMON_PASSIVES.nerves],
  powers: [power("standoff", "武器", "对峙", "standoff-p61_unique_polearm_01.png", "狂暴冲锋伤害按移动速度提高。", "疾奔、蕾蔻与移速词缀都被转成冲锋乘区。", "黄装升级70级长柄武器。"), power("vile-ward", "防具", "邪秽之护", "vile-ward-unique_shoulder_003_p1.png", "冲锋每命中一个敌人，伤害继续提高。", "要求从直线上穿过整群，而不是只撞精英本体。", "血岩赌博护肩后萃取。"), power("royal-grandeur", "首饰", "皇家华戒", "ring-of-royal-grandeur-unique_ring_107_x1.png", "套装需求件数减少1件。", "使不朽5件视为6件、蕾蔻3件视为4件。", "第一幕/第四幕悬赏宝箱。"), power("band-of-might", "第4槽", "力量指环", "band-of-might-p61_unique_ring_05.png", "冲锋后获得巨额减伤。", "第39赛季第四槽让意志壁垒双戒和力量指环同时存在。", "1级野蛮人赌博后萃取。")],
  variants: variants("寻找长直线高密度怪群，冲锋穿透而不是停在精英身上。", "连续冲锋穿图，裂地斩只用于清怒和重建冷却。", "套装混搭未完成前先玩纯蕾蔻或纯不朽，避免两边都不成套。", "范围伤、移速乘区与路线选择比单纯力量更重要。"),
  links: [{ title: "双套装拼图", category: "damage", steps: [{ id: "ik-boulder-breaker", label: "不朽五件含武器", detail: "实际穿戴5件" }, { id: "raekor-head", label: "蕾蔻三件", detail: "实际穿戴3件" }, { id: "royal-grandeur", label: "皇家华戒", detail: "两套需求各减1" }, { id: "furious-charge", label: "冲锋获得两套收益", detail: "常驻狂战并叠冲锋倍率" }], conclusion: "少一件或换错套装位置会同时破坏不朽6件或蕾蔻4件。" }, { title: "怪数与移速乘区", category: "damage", steps: [{ id: "sprint", label: "疾奔", detail: "提高移动速度" }, { id: "standoff", label: "对峙", detail: "移速转冲锋伤害" }, { id: "furious-charge", label: "冲锋穿怪", detail: "命中整条怪群" }, { id: "vile-ward", label: "邪秽之护", detail: "每命中一个敌人继续增伤" }], conclusion: "正确路线是穿过最多敌人的直线；撞单体精英会丢失邪秽之护倍率。" }, { title: "冲锋后生存", category: "defense", steps: [{ id: "furious-charge", label: "狂暴冲锋", detail: "每次攻击也是位移" }, { id: "band-of-might", label: "力量指环", detail: "自动刷新减伤" }, { id: "call-of-the-ancients", label: "先祖戮力同心", detail: "分担伤害" }, { id: "wrath-of-the-berserker", label: "不朽常驻狂战", detail: "控制免疫与闪避" }], conclusion: "只要冲锋不停，三层防御会自然维持；卡墙或冲空才最危险。" }],
  rotation: [{ title: "开启不朽核心", action: "召唤先祖并开启狂战之怒。", reason: "不朽六件的增伤与减伤依赖两项常驻。" }, { title: "找直线", action: "用疾奔绕到怪群一侧，寻找穿过最多敌人的角度。", reason: "邪秽之护按命中怪数放大。" }, { title: "连续冲锋", action: "沿怪群长轴往返冲锋，命中足够敌人刷新技能。", reason: "对峙把移速转成伤害，无情突袭负责重置。" }, { title: "清空怒气", action: "怒气高时穿插裂地斩。", reason: "触发守心并通过不朽套消耗怒气缩短冷却。" }, { title: "避免冲空", action: "没有目标时先调整位置，不要把冲锋交在墙角。", reason: "冲空既不能重置技能，也会让力量指环进入断档。" }],
  source: "https://www.icy-veins.com/d3/barbarian-furious-charge-build-with-immortal-king-and-raekor",
};

export const BARBARIAN_BUILDS: Record<string, BuildGuide> = {
  [WASTES_GUIDE.id]: WASTES_GUIDE,
  [RAEKOR_GUIDE.id]: RAEKOR_GUIDE,
  [IK_HOTA_GUIDE.id]: IK_HOTA_GUIDE,
  [LOD_HOTA_GUIDE.id]: LOD_HOTA_GUIDE,
  [EARTH_GUIDE.id]: EARTH_GUIDE,
  [FRENZY_GUIDE.id]: FRENZY_GUIDE,
  [IK_CHARGE_GUIDE.id]: IK_CHARGE_GUIDE,
};
