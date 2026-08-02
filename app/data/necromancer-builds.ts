import type { BuildGuide, GuideAbility, GuideGear } from "./build-guides";

export type NecromancerGuide = BuildGuide;

const A = "/d3/library/items/";
const S = "/d3/library/skills/";

const IMG = {
  leoric: `${A}leorics-crown-unique_helm_002_p1.png`,
  channeling: `${A}mantle-of-channeling-p4_unique_shoulder_103.png`,
  aquila: `${A}aquila-cuirass-p4_unique_chest_012.png`,
  stone: `${A}stone-gauntlets-p66_unique_gloves_007.png`,
  krelm: `${A}krelms-buff-bracers-unique_bracer_set_02_x1.png`,
  witching: `${A}the-witching-hour-unique_belt_009_x1.png`,
  blackthorne: `${A}blackthornes-jousting-mail-unique_pants_013_x1.png`,
  climbers: `${A}ice-climbers-unique_boots_008_x1.png`,
  haunted: `${A}haunted-visions-p69_unique_amulet_02.png`,
  coe: `${A}convention-of-elements-p2_unique_ring_04.png`,
  krysbin: `${A}krysbins-sentence-p6_unique_ring_03.png`,
  funerary: `${A}funerary-pick-p74_unique_scythe1h_01.png`,
  ironRose: `${A}iron-rose-p74_unique_phylactery_04.png`,
  dayntee: `${A}dayntees-binding-p61_unique_belt_01.png`,
  bloodtide: `${A}bloodtide-blade-p65_unique_scythe2h_02.png`,
  cycle: `${A}scythe-of-the-cycle-p61_unique_scythe1h_03.png`,
  kalan: `${A}wisdom-of-kalan-p6_unique_amulet_03.png`,
  royal: `${A}ring-of-royal-grandeur-unique_ring_107_x1.png`,
  unity: `${A}unity-unique_ring_010_x1.png`,
  squirt: `${A}squirts-necklace-p66_unique_amulet_010.png`,
  lostTime: `${A}lost-time-p61_unique_phylactery_01.png`,
  gelmindor: `${A}gelmindors-marrow-guards-p610_unique_bracer_22.png`,
  maltorius: `${A}maltorius-petrified-spike-p61_unique_scythe2h_01.png`,
  reilena: `${A}reilenas-shadowhook-p6_unique_scythe2h_03.png`,
  clena: `${A}bonds-of-clena-p7_unique_bracer_23.png`,
  jessethScythe: `${A}jesseth-skullscythe-p6_unique_scythe1h_04.png`,
  jessethShield: `${A}jesseth-skullshield-p6_unique_shield_01.png`,
  crimsonBelt: `${A}captain-crimsons-silk-girdle.png`,
  crimsonPants: `${A}captain-crimsons-thrust.png`,
  strongarm: `${A}strongarm-bracers-unique_bracer_007_x1.png`,
  corpsewhisper: `${A}corpsewhisper-pauldrons-p6_necro_unique_shoulders_21.png`,
  johnstone: `${A}the-johnstone-p6_unique_amulet_01.png`,
  nayr: `${A}nayrs-black-death-p61_unique_scythe2h_04.png`,
  razeth: `${A}razeths-volition-p69_necro_unique_shoulders_22.png`,
  grasps: `${A}grasps-of-essence-p69_necro_unique_gloves_22.png`,
  corroded: `${A}tragouls-corroded-fang-p6_unique_scythe1h_02.png`,
  trapped: `${A}bane-of-the-trapped-unique_gem_002_x1.png`,
  stricken: `${A}bane-of-the-stricken-unique_gem_018_x1.png`,
  lod: `${A}legacy-of-dreams-unique_gem_023_x1.png`,
  zei: `${A}zeis-stone-of-vengeance-unique_gem_012_x1.png`,
  gogok: `${A}gogok-of-swiftness-unique_gem_008_x1.png`,
};

const skill = (slug: string) => `${S}necromancer-active-${slug}.png`;
const passive = (slug: string) => `${S}necromancer-passive-${slug}.png`;

function setGear(id: string, slot: string, name: string, image: string, setName: string, affixes: string[], why: string, gem?: GuideGear["gem"]): GuideGear {
  return {
    id, slot, name, image, quality: "set", gem,
    effect: `${setName}套装部件。${why}`,
    affixes,
    acquisition: ["血岩碎片赌博该护甲部位", `重复的${setName}部件用魔盒“套装转换”`, "未凑齐前不要分解重复件"],
  };
}

function legendary(id: string, slot: string, name: string, image: string, effect: string, affixes: string[], acquisition: string[], warning?: string, gem?: GuideGear["gem"]): GuideGear {
  return { id, slot, name, image, quality: "legendary", effect, affixes, acquisition, warning, gem };
}

const gems = {
  trapped: { name: "困者之灾", image: IMG.trapped },
  stricken: { name: "受罚者之灾", image: IMG.stricken },
  lod: { name: "梦之遗礼", image: IMG.lod },
  zei: { name: "贼神的复仇之石", image: IMG.zei },
  gogok: { name: "迅捷勾玉", image: IMG.gogok },
};

const commonNovaGear = {
  haunted: (gem = gems.trapped) => legendary("haunted-visions", "颈部", "鬼灵面容", IMG.haunted, "让血魂双分永久存在，并复制死亡新星；没有它就没有完整的三重新星。", ["镶孔", "暴击伤害", "暴击几率", "物理技能伤害"], ["世界掉落与大秘境结算", "黄装升级：70级项链，池子很大", "不建议前期用血岩硬赌项链"], "优先保证特效与镶孔，再追求双暴物理。", gem),
  coe: (gem = gems.stricken) => legendary("coe", "手指", "全能法戒", IMG.coe, "物理元素周期是冲层爆发窗；新星、强控和神目圈尽量在这个窗口重叠。", ["镶孔", "暴击几率", "暴击伤害", "范围伤害 / 冷却"], ["世界掉落与大秘境结算", "黄装升级：70级戒指，池子较大", "不建议前期血岩强赌"], undefined, gem),
  krysbin: (gem = gems.zei) => legendary("krysbin", "手指", "克里斯宾的审判", IMG.krysbin, "对减速敌人增伤；眩晕、冻结等强控会把该增伤数值提高到三倍。", ["镶孔", "暴击几率", "暴击伤害", "攻速 / 冷却"], ["世界掉落与大秘境结算", "黄装升级：70级戒指", "先用任意带孔版本启动BD"], undefined, gem),
  funerary: () => legendary("funerary-pick", "主手", "葬镰", IMG.funerary, "鲜血虹吸连接更多目标并让受影响目标承受巨额增伤，单体时加成翻倍。", ["高白字伤害", "伤害%", "范围伤害 / 冷却", "智力", "拉玛兰迪打孔"], ["黄装升级：必须是70级单手镰刀", "用死灵角色升级以进入职业专属池", "材料不足时优先做这件与副手"], "不是双手镰刀，也不是普通单手武器。"),
  ironRose: () => legendary("iron-rose", "副手", "铁玫瑰", IMG.ironRose, "鲜血虹吸必定触发免费鲜血新星，并按损失生命继续叠加新星伤害。", ["高伤害范围", "死亡新星伤害", "暴击几率", "范围伤害 / 冷却", "智力"], ["黄装升级：必须使用70级死灵法器", "血岩碎片赌博副手", "死灵角色升级可避开其他职业副手池"], "普通盾牌、法球和箭袋都不会升级出铁玫瑰。"),
};

const lodNovaGear: GuideGear[] = [
  legendary("leoric-crown", "头部", "李奥瑞克的王冠", IMG.leoric, "把头部钻石的冷却缩减效果翻倍，帮助骨甲与鲜血穿行周转。", ["死亡新星伤害", "暴击几率", "智力", "镶孔"], ["血岩碎片赌博头盔", "黄装升级：70级头盔", "前期普通传奇即可，后期必须远古" ]),
  legendary("mantle-channeling", "肩部", "导能披肩", IMG.channeling, "引导鲜血虹吸时同时获得增伤与减伤。", ["死亡新星伤害", "范围伤害", "智力", "体能"], ["血岩碎片赌博护肩", "黄装升级：70级护肩", "远古版本优先保留正确技能伤" ]),
  legendary("aquila", "胸部", "天鹰胸甲", IMG.aquila, "魂能接近满值时减伤50%；虹吸免费触发新星，能稳定保持满魂能。", ["3个镶孔", "智力", "体能", "护甲"], ["血岩碎片赌博胸甲", "黄装升级：70级胸甲", "先要特效，后追远古" ]),
  legendary("stone-gauntlets", "手部", "岩石护手", IMG.stone, "受击叠加护甲，攀冰者抵消其减速与定身副作用。", ["暴击几率", "暴击伤害", "范围伤害", "智力"], ["必须用野蛮人或圣教军掉落/赌博", "再放仓库转给死灵法师", "无法靠死灵角色黄装升级稳定获得"], "力量职业专属掉落池；只用死灵刷会一直刷不到。"),
  legendary("krelm-bracers", "腕部", "克雷姆的强力护腕", IMG.krelm, "免疫击退和眩晕，避免虹吸引导被打断。", ["物理技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "只穿护腕，不要再穿同套腰带"], "梦遗不能激活任何套装奖励；不要同时穿克雷姆腰带。"),
  legendary("witching-hour", "腰部", "巫异时刻", IMG.witching, "腰带自带攻速与暴伤，直接提高虹吸触发频率与新星伤害。", ["攻击速度", "暴击伤害", "智力", "体能"], ["血岩碎片赌博腰带", "黄装升级：70级普通腰带", "优先保留远古且双进攻词缀版本" ]),
  setGear("blackthorne-pants", "腿部", "黑荆棘锁甲马裤", IMG.blackthorne, "黑荆棘战甲", ["物理技能伤害", "2个镶孔", "智力", "体能"], "裤子能提供稀有的物理元素伤，单穿不会破坏梦遗。"),
  legendary("ice-climbers", "脚部", "攀冰者", IMG.climbers, "免疫冰冻和定身，并消除岩石护手叠层带来的行动惩罚。", ["死亡新星伤害", "智力", "体能", "护甲"], ["血岩碎片赌博靴子", "黄装升级：70级靴子", "与岩石护手成对收集" ]),
  commonNovaGear.haunted(gems.trapped), commonNovaGear.coe(gems.stricken), commonNovaGear.krysbin(gems.lod), commonNovaGear.funerary(), commonNovaGear.ironRose(),
];

const inariusSet = [
  setGear("inarius-head", "头部", "伊纳瑞斯的体悟", `${A}inariuss-understanding-p6_necro_set_3_helm.png`, "伊纳瑞斯的恩泽", ["死亡新星伤害", "暴击几率", "智力", "镶孔"], "提供六件套骨甲旋风乘区。"),
  setGear("inarius-shoulders", "肩部", "伊纳瑞斯的殉难", `${A}inariuss-martyrdom-p6_necro_set_3_shoulders.png`, "伊纳瑞斯的恩泽", ["范围伤害", "智力", "体能", "冷却缩减"], "承担范围伤与骨甲周转。"),
  setGear("inarius-chest", "胸部", "伊纳瑞斯的罪愆", `${A}inariuss-conviction-p6_necro_set_3_chest.png`, "伊纳瑞斯的恩泽", ["3个镶孔", "智力", "体能", "护甲"], "提供主要坚韧。"),
  setGear("inarius-gloves", "手部", "伊纳瑞斯的意志", `${A}inariuss-will-p6_necro_set_3_gloves.png`, "伊纳瑞斯的恩泽", ["暴击几率", "暴击伤害", "范围伤害", "智力"], "高巅峰可把智力换攻速。"),
  setGear("inarius-pants", "腿部", "伊纳瑞斯的沉默", `${A}inariuss-reticence-p6_necro_set_3_pants.png`, "伊纳瑞斯的恩泽", ["2个镶孔", "智力", "体能", "护甲"], "纯防御槽。"),
  setGear("inarius-boots", "脚部", "伊纳瑞斯的坚持", `${A}inariuss-perseverance-p6_necro_set_3_boots.png`, "伊纳瑞斯的恩泽", ["死亡新星伤害", "智力", "体能", "护甲"], "鞋子必须拿新星技能伤。"),
];

const inariusGear: GuideGear[] = [
  ...inariusSet.slice(0, 4),
  legendary("krelm-bracers", "腕部", "克雷姆的强力护腕", IMG.krelm, "防止击退和眩晕打断贴身虹吸。", ["物理技能伤害", "暴击几率", "智力", "体能"], ["血岩赌博护腕", "黄装升级：70级护腕", "低巅峰可换守护者护腕" ]),
  legendary("dayntee", "腰部", "戴恩提的束腰", IMG.dayntee, "只要附近敌人被脆弱诅咒，便常驻最高50%额外减伤。", ["特效接近50%", "智力", "体能", "生命%"], ["血岩碎片优先赌腰带", "黄装升级：70级普通腰带", "是成型期最便宜的减伤核心" ]),
  ...inariusSet.slice(4),
  commonNovaGear.haunted(gems.trapped), commonNovaGear.coe(gems.stricken), commonNovaGear.krysbin(gems.zei), commonNovaGear.funerary(), commonNovaGear.ironRose(),
];

const rathmaGear: GuideGear[] = [
  setGear("rathma-head", "头部", "拉斯玛的颅盔", `${A}rathmas-skull-helm-p6_necro_set_1_helm.png`, "拉斯玛之骨", ["暴击几率", "智力", "体能", "镶孔"], "第39赛季海德格赠礼可直接获得。"),
  setGear("rathma-shoulders", "肩部", "拉斯玛的肩刺", `${A}rathmas-spikes-p6_necro_set_1_shoulders.png`, "拉斯玛之骨", ["冷却缩减", "范围伤害", "智力", "体能"], "亡者大军依赖冷却，肩部优先双功能词缀。"),
  setGear("rathma-chest", "胸部", "拉斯玛的骿铠", `${A}rathmas-ribcage-plate-p6_necro_set_1_chest.png`, "拉斯玛之骨", ["3个镶孔", "体能", "护甲", "智力"], "纯坚韧部位。"),
  setGear("rathma-gloves", "手部", "拉斯玛的亡臂", `${A}rathmas-macabre-vambraces-p6_necro_set_1_gloves.png`, "拉斯玛之骨", ["暴击几率", "暴击伤害", "冷却缩减", "智力"], "冷却缩减比范围伤更优先。"),
  legendary("clena", "腕部", "希雷娜的羁绊", IMG.clena, "统御骷髅后提高亡者大军伤害，并给两项核心技能提供独立乘区。", ["物理技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "特效低也先装备，后续再换高特效" ]),
  setGear("crimson-belt", "腰部", "克里森船长的丝带", IMG.crimsonBelt, "克里森船长的饰衣", ["智力", "体能", "生命%", "护甲"], "冷却缩减转化为伤害。"),
  setGear("crimson-pants", "腿部", "克里森船长的推裤", IMG.crimsonPants, "克里森船长的饰衣", ["2个镶孔", "智力", "体能", "护甲"], "资源减耗转化为减伤。"),
  setGear("rathma-boots", "脚部", "拉斯玛的骨靴", `${A}rathmas-ossified-sabatons-p6_necro_set_1_boots.png`, "拉斯玛之骨", ["智力", "体能", "护甲", "全抗"], "无需亡者大军技能伤，优先坚韧。"),
  legendary("squirts", "颈部", "斯奎特的项链", IMG.squirt, "未受伤时提供巨额增伤；靠走位、宠物吸血和随从控场维持。", ["镶孔", "暴击伤害", "暴击几率", "物理技能伤害"], ["世界掉落与大秘境结算", "黄装升级：70级项链", "双暴物理带孔很难，先保证镶孔"], undefined, gems.trapped),
  commonNovaGear.krysbin(gems.gogok), commonNovaGear.coe(gems.zei),
  legendary("jesseth-scythe", "主手", "杰瑟斯骨镰", IMG.jessethScythe, "统御骷髅锁定目标后，杰瑟斯两件套提高全局伤害。", ["高白字", "攻击速度", "冷却缩减", "智力", "拉玛兰迪打孔"], ["黄装升级：70级单手镰刀", "和骨盾成套才生效", "攻速用于达到骷髅攻击断点" ]),
  legendary("jesseth-shield", "副手", "杰瑟斯骨盾", IMG.jessethShield, "与骨镰组成两件套；骷髅死亡时会自动重新召唤。", ["暴击几率", "冷却缩减", "资源减耗", "智力"], ["黄装升级：70级盾牌，用死灵角色", "世界掉落", "不是死灵法器，升级铁玫瑰的底材不适用"], "底材是盾牌，不是死灵法器。"),
];

const masqueradeGear: GuideGear[] = [
  setGear("masquerade-head", "头部", "华丽面具", `${A}luxurious-bauta-p69_necro_set_5_helm.png`, "燃烧狂欢节舞会服", ["骨矛伤害", "暴击几率", "智力", "镶孔"], "头部必须保留骨矛技能伤。"),
  setGear("masquerade-shoulders", "肩部", "迷人宽袖", `${A}glamorous-gigot-p69_necro_set_5_shoulders.png`, "燃烧狂欢节舞会服", ["范围伤害", "资源减耗", "智力", "体能"], "同时服务密集怪群和克里森套装。"),
  setGear("masquerade-chest", "胸部", "精致外衣", `${A}sophisticated-vest-p69_necro_set_5_chest.png`, "燃烧狂欢节舞会服", ["3个镶孔", "智力", "体能", "护甲"], "纯坚韧部位。"),
  setGear("masquerade-gloves", "手部", "贵气手套", `${A}lavishing-gloves-p69_necro_set_5_gloves.png`, "燃烧狂欢节舞会服", ["暴击几率", "暴击伤害", "范围伤害", "智力 → 高巅峰换攻速"], "核心三攻部位。"),
  legendary("gelmindor", "腕部", "杰尔明多的骨髓守护", IMG.gelmindor, "显著提高血魂双分施放的骨矛伤害，是分身骨矛的专属乘区。", ["毒素技能伤害", "暴击几率", "智力", "体能"], ["血岩碎片赌博护腕", "黄装升级：70级护腕", "低特效先用，后追满特效" ]),
  setGear("crimson-belt", "腰部", "克里森船长的丝带", IMG.crimsonBelt, "克里森船长的饰衣", ["智力", "体能", "生命%", "护甲"], "冷却缩减转伤害，资源减耗降低骨矛负担。"),
  setGear("crimson-pants", "腿部", "克里森船长的推裤", IMG.crimsonPants, "克里森船长的饰衣", ["2个镶孔", "智力", "体能", "护甲"], "与腰带及华戒组成三件效果。"),
  setGear("masquerade-boots", "脚部", "奢靡之靴", `${A}extravagant-shoes-p69_necro_set_5_boots.png`, "燃烧狂欢节舞会服", ["骨矛伤害", "智力", "体能", "护甲"], "鞋子必须拿骨矛技能伤。"),
  commonNovaGear.haunted(gems.trapped), commonNovaGear.coe(gems.stricken), commonNovaGear.krysbin(gems.zei),
  legendary("cycle", "主手", "轮回镰刀", IMG.cycle, "骨甲生效时大幅提高次要技能骨矛伤害，但每次施放会消耗骨甲持续时间。", ["高白字", "伤害%", "攻击速度", "智力", "拉玛兰迪打孔"], ["黄装升级：70级单手镰刀", "死灵角色世界掉落", "必须养成频繁刷新骨甲的习惯" ]),
  legendary("lost-time", "副手", "流逝时光", IMG.lostTime, "冰冷技能命中后提高移速；主要价值仍是高伤害范围、暴击和骨矛技能伤。", ["高伤害范围", "暴击几率", "范围伤害", "骨矛伤害", "智力"], ["黄装升级：必须是70级死灵法器", "血岩碎片赌博副手", "不要用盾牌底材"], "底材是死灵法器。"),
];

const pestilenceGear: GuideGear[] = [
  setGear("pestilence-head", "头部", "恶疫面具", `${A}pestilence-mask-p6_necro_set_4_helm.png`, "瘟疫大师的裹尸布", ["智力", "镶孔", "体能", "暴击几率（低优先）"], "尸枪脆弱之触会堆暴击，头部暴击优先级下降。"),
  setGear("pestilence-shoulders", "肩部", "恶疫绝隔", `${A}pestilence-defense-p6_necro_set_4_shoulders.png`, "瘟疫大师的裹尸布", ["尸枪术伤害", "冷却缩减", "智力", "体能"], "技能伤和冷却都不可少。"),
  setGear("pestilence-chest", "胸部", "恶疫之袍", `${A}pestilence-robe-p6_necro_set_4_chest.png`, "瘟疫大师的裹尸布", ["尸枪术伤害", "3个镶孔", "智力", "体能"], "胸甲是第二个尸枪技能伤部位。"),
  setGear("pestilence-gloves", "手部", "恶疫手套", `${A}pestilence-gloves-p6_necro_set_4_gloves.png`, "瘟疫大师的裹尸布", ["冷却缩减", "暴击伤害", "暴击几率", "智力"], "亡者领域循环优先冷却。"),
  legendary("strongarm", "腕部", "强横护腕", IMG.strongarm, "次要词缀洗出击退几率后可触发护腕增伤；没有击退就没有特效。", ["冰霜技能伤害", "暴击几率", "智力", "体能", "次要：击退几率"], ["血岩赌博护腕", "黄装升级：70级护腕", "秘士优先检查能否洗出击退次要词缀"], "必须有击退触发源，否则这件装备等于白板。"),
  setGear("crimson-belt", "腰部", "克里森船长的丝带", IMG.crimsonBelt, "克里森船长的饰衣", ["智力", "体能", "生命%", "护甲"], "大量冷却缩减同时转化为伤害。"),
  setGear("crimson-pants", "腿部", "克里森船长的推裤", IMG.crimsonPants, "克里森船长的饰衣", ["2个镶孔", "智力", "体能", "护甲"], "资源减耗转化为减伤。"),
  setGear("pestilence-boots", "脚部", "恶疫战靴", `${A}pestilence-battle-boots-p6_necro_set_4_boots.png`, "瘟疫大师的裹尸布", ["智力", "体能", "护甲", "全抗"], "纯坚韧部位。"),
  legendary("squirts", "颈部", "斯奎特的项链", IMG.squirt, "爆发前避免受伤，亡者领域期间把斯奎特双倍增伤压进尸枪窗口。", ["镶孔", "暴击伤害", "暴击几率", "冰霜技能伤害"], ["世界掉落", "黄装升级：70级项链", "先镶孔再追双暴元素"], undefined, gems.trapped),
  commonNovaGear.krysbin(gems.gogok), commonNovaGear.coe(gems.zei),
  legendary("jesseth-scythe", "主手", "杰瑟斯骨镰", IMG.jessethScythe, "命令骷髅攻击目标后启动杰瑟斯全局增伤。", ["高白字", "智力", "冷却缩减", "最大魂能", "拉玛兰迪打孔"], ["黄装升级：70级单手镰刀", "与骨盾配套", "副词缀尽量拿最大魂能以放大莱莲娜" ]),
  legendary("jesseth-shield", "副手", "杰瑟斯骨盾", IMG.jessethShield, "与骨镰组成武器套装，统御骷髅后放大全部尸枪。", ["暴击几率", "冷却缩减", "资源减耗", "精英伤害", "智力"], ["黄装升级：70级盾牌，用死灵角色", "世界掉落", "不是死灵法器"], "底材是盾牌。"),
];

const corpseExplosionGear: GuideGear[] = [
  legendary("leoric-crown", "头部", "李奥瑞克的王冠", IMG.leoric, "放大钻石的冷却缩减，压缩亡者领域的空窗。", ["暴击几率", "尸爆伤害", "智力", "镶孔"], ["血岩赌博头盔", "黄装升级：70级头盔", "后期必须远古" ]),
  legendary("razeth", "肩部", "拉杰斯的意志", IMG.razeth, "让骷髅法师获得亡魂灌注并在满魂能时提供减伤，用于消耗魂能和维持生存。", ["冷却缩减", "范围伤害", "智力", "体能"], ["血岩赌博护肩", "黄装升级：70级护肩", "优先远古正确冷却词缀" ]),
  legendary("aquila", "胸部", "天鹰胸甲", IMG.aquila, "魂能高位时提供50%减伤；只在需要时用骨矛倾泻魂能。", ["3个镶孔", "智力", "体能", "护甲"], ["血岩赌博胸甲", "黄装升级：70级胸甲", "前期先保特效" ]),
  legendary("grasps", "手部", "魂能之握", IMG.grasps, "尸爆命中后叠加后续尸爆伤害，是整套的主要技能专属乘区。", ["暴击几率", "暴击伤害", "范围伤害", "智力"], ["血岩赌博手套", "黄装升级：70级手套", "特效优先于远古品质" ]),
  legendary("krelm-bracers", "腕部", "克雷姆的强力护腕", IMG.krelm, "免疫击退与眩晕，保证尸爆窗口不被打断。", ["毒素技能伤害", "暴击几率", "智力", "体能"], ["血岩赌博护腕", "黄装升级：70级护腕", "不要同时穿克雷姆腰带" ]),
  legendary("dayntee", "腰部", "戴恩提的束腰", IMG.dayntee, "死亡镰刀触发诅咒后常驻额外减伤。", ["特效接近50%", "智力", "体能", "生命%"], ["血岩赌博腰带", "黄装升级：70级腰带", "前期优先级很高" ]),
  setGear("blackthorne-pants", "腿部", "黑荆棘锁甲马裤", IMG.blackthorne, "黑荆棘战甲", ["毒素技能伤害", "2个镶孔", "智力", "体能"], "单件提供裤子元素伤；不要激活第二件黑荆棘。"),
  legendary("ice-climbers", "脚部", "攀冰者", IMG.climbers, "免疫冰冻和定身，配合魔方岩石护手抵消负面效果。", ["尸爆伤害", "智力", "体能", "护甲"], ["血岩赌博靴子", "黄装升级：70级靴子", "和岩石护手成对收集" ]),
  legendary("johnstone", "颈部", "乔斯顿之石", IMG.johnstone, "亡者领域结束后获得尸爆知识层数，让下一轮领域外尸爆仍有爆发。", ["镶孔", "暴击伤害", "暴击几率", "毒素技能伤害"], ["世界掉落", "黄装升级：70级项链", "不建议前期血岩强赌"], undefined, gems.trapped),
  commonNovaGear.coe(gems.stricken), commonNovaGear.krysbin(gems.lod),
  legendary("corroded-fang", "主手", "塔格奥的蚀牙", IMG.corroded, "死亡镰刀必定施加诅咒，并让受诅咒目标承受额外伤害。", ["高白字", "伤害%", "范围伤害", "智力", "拉玛兰迪打孔"], ["黄装升级：70级单手镰刀", "死灵角色世界掉落", "不要用双手镰刀底材" ]),
  legendary("lost-time", "副手", "流逝时光", IMG.lostTime, "冰冷技能命中提供移速；核心仍是高伤害范围、暴击和尸爆技能伤。", ["高伤害范围", "暴击几率", "范围伤害", "尸爆伤害", "智力"], ["黄装升级：70级死灵法器", "血岩赌博副手", "不是盾牌"], "底材是死灵法器。"),
];

const novaSkills: GuideAbility[] = [
  { id: "siphon-blood", name: "鲜血虹吸", rune: "力量转移", image: skill("siphon-blood"), logic: "持续引导来触发铁玫瑰；每层力量转移继续放大全部技能。" },
  { id: "death-nova", name: "死亡新星", rune: "鲜血新星", image: skill("death-nova"), logic: "免费触发的物理次要技能，是唯一主伤害来源。" },
  { id: "simulacrum", name: "血魂双分", rune: "鲜血与白骨", image: skill("simulacrum"), logic: "两个永久分身复制死亡新星，把一次虹吸扩展为三重新星。" },
  { id: "blood-rush", name: "鲜血穿行", rune: "鲜血灌注 / 强韧", image: skill("blood-rush"), logic: "进场、跳图和脱离危险；速刷时负责触发移速威能。" },
  { id: "bone-armor", name: "骨甲", rune: "白骨脱臼", image: skill("bone-armor"), logic: "减伤、眩晕和轮回镰刀触发器；必须持续刷新。" },
  { id: "frailty", name: "脆弱", rune: "脆弱光环", image: skill("frailty"), logic: "自动诅咒近身怪，联动戴恩提、咒怨之力与克里斯宾。" },
];

const novaPassives: GuideAbility[] = [
  { id: "swift-harvesting", name: "迅捷收割", image: passive("swift-harvesting"), logic: "提高虹吸攻速，也就是提高铁玫瑰免费新星频率。" },
  { id: "eternal-torment", name: "无尽折磨", image: passive("eternal-torment"), logic: "让诅咒永久持续，避免戴恩提与诅咒增伤断档。" },
  { id: "spreading-malediction", name: "咒怨之力", image: passive("spreading-malediction"), logic: "每个受诅咒敌人继续提高伤害，怪群越密越强。" },
  { id: "stand-alone", name: "孤魂死灵", image: passive("stand-alone"), logic: "不带仆从时提高护甲；血魂双分不会破坏该条件。" },
];

const commonNovaPowers: GuidePower[] = [
  { id: "bloodtide-blade", slot: "武器", name: "血潮利刃", image: IMG.bloodtide, effect: "25码内每个敌人提高死亡新星伤害，最多计算25个。", logic: "所以必须拉大怪群再站定虹吸，密度本身就是乘区。", acquisition: "黄装升级：70级双手镰刀" },
  { id: "dayntee", slot: "防具", name: "戴恩提的束腰", image: IMG.dayntee, effect: "存在受你诅咒的敌人时获得最高50%额外减伤。", logic: "脆弱光环自动满足条件。", acquisition: "血岩赌腰带；黄装升级70级普通腰带" },
  { id: "wisdom-kalan", slot: "首饰", name: "卡兰之睿", image: IMG.kalan, effect: "把骨甲最大层数提高5层。", logic: "提高贴身引导时的减伤上限。", acquisition: "黄装升级70级项链，或世界掉落" },
  { id: "scythe-cycle", slot: "第4槽", name: "轮回镰刀", image: IMG.cycle, effect: "骨甲生效时大幅提高次要技能伤害，但会消耗骨甲持续时间。", logic: "第39赛季额外乘区，也是手法里必须刷新骨甲的原因。", acquisition: "黄装升级：70级单手镰刀" },
];

function defaultVariants(build: string): NecromancerGuide["variants"] {
  return {
    push: { title: "大秘境冲层", note: "保留元素周期、受罚者和所有独立乘区。", changes: ["全能法戒等待主元素周期", "受罚者之灾处理守关者", `围绕${build}核心联动打完整爆发窗`] },
    speed: { title: "T16 / 速刷", note: "伤害溢出后换机动、自动拾取和短冷却。", changes: ["受罚者换强者之灾或囤宝者恩惠", "防具威能可换斯图亚特的胫甲", "不等元素周期，看到密集怪群就立即输出" ] },
    low: { title: "低巅峰 < 2000", note: "先保证减伤、套装完整和关键特效，不追求完美远古。", changes: ["胸裤优先黄宝石，主属性与体能并重", "护甲/生命%优先于极限范围伤", "先凑功能件，再逐件替换远古" ] },
    high: { title: "高巅峰 2000+", note: "主属性由巅峰补足，装备词缀转向范围伤、攻速与冷却。", changes: ["手套/肩部的智力可换范围伤", "胸裤黄宝石逐步换红宝石补护甲", "开始要求全身远古、卡德山与高特效" ] },
  };
}

export const NECROMANCER_BUILDS: Record<string, NecromancerGuide> = {
  "lod-nova": {
    id: "lod-nova", name: "梦遗死亡新星", set: "梦之遗礼 · 远古散件", core: "鲜血虹吸 → 铁玫瑰 → 三重鲜血新星",
    summary: "不激活任何套装奖励，让每件远古传奇都被梦之遗礼放大；装备上限高于套装版本，但没有全远古前不建议强行转型。",
    difficulty: "中 · 需要贴身聚怪与物理周期", follower: "盗贼", followerReason: "盗贼的暴击窗口最适合物理周期爆发；坚韧不足时可以先用圣殿骑士。",
    gear: lodNovaGear, skills: novaSkills, passives: novaPassives, powers: commonNovaPowers,
    variants: {
      ...defaultVariants("死亡新星"),
      low: { title: "低巅峰 < 2000", note: "梦遗未满级、远古不足时明显弱于塔格奥。", changes: ["建议继续用塔格奥+守护者过渡", "至少大部分部位远古后再切梦遗", "天鹰、戴恩提、岩石护手三层减伤不可少" ] },
      high: { title: "高巅峰 2000+", note: "全远古散件把梦遗乘区发挥到上限。", changes: ["智力词缀逐步换范围伤/冷却", "黑荆棘裤必须只有单件，不能激活套装", "物理周期同时叠白骨脱臼、克里斯宾和神目圈" ] },
    },
    links: [
      { title: "免费三重新星", category: "damage", steps: [{ id: "siphon-blood", label: "鲜血虹吸", detail: "持续引导" }, { id: "funerary-pick", label: "葬镰", detail: "目标承伤放大" }, { id: "iron-rose", label: "铁玫瑰", detail: "100%免费新星" }, { id: "simulacrum", label: "双分", detail: "两个分身复制" }, { id: "haunted-visions", label: "鬼灵面容", detail: "分身永久存在" }], conclusion: "一次虹吸由本体和两个分身形成三重新星，且全程不消耗魂能。" },
      { title: "密度与梦遗双乘区", category: "damage", steps: [{ id: "bloodtide-blade", label: "血潮利刃", detail: "25码怪越多越强" }, { id: "death-nova", label: "鲜血新星", detail: "贴身圆形范围" }, { id: "lod", label: "梦之遗礼", detail: "每件远古传奇继续放大" }], conclusion: "先聚怪再虹吸；零散小怪既吃不满血潮，也浪费梦遗的高上限。" },
      { title: "骨甲强控爆发", category: "defense", steps: [{ id: "bone-armor", label: "骨甲·白骨脱臼", detail: "眩晕并减伤" }, { id: "scythe-cycle", label: "轮回镰刀", detail: "放大次要技能" }, { id: "krysbin", label: "克里斯宾", detail: "强控进入三倍档" }, { id: "coe", label: "全能法戒", detail: "物理周期" }], conclusion: "物理周期内先眩晕再虹吸；骨甲时长被轮回镰刀消耗，所以每轮都要刷新。" },
    ],
    rotation: [
      { title: "召唤永久双分", action: "进图先开血魂双分，死亡前无需重放。", reason: "鬼灵面容让两个分身永久存在并复制死亡新星。" },
      { title: "聚到25码", action: "用鲜血穿行寻找大怪群，贴身拉成一团。", reason: "血潮利刃按25码内敌人数提供乘区。" },
      { title: "叠满骨甲", action: "命中足够敌人后保持骨甲层数和持续时间。", reason: "骨甲同时提供减伤、轮回镰刀增伤与眩晕。" },
      { title: "物理窗强控", action: "全能法戒转物理时用白骨脱臼眩晕。", reason: "强控会把克里斯宾提高到三倍档。" },
      { title: "持续虹吸", action: "对精英持续虹吸直到物理窗结束，再移动重组怪群。", reason: "铁玫瑰、葬镰、分身、血潮与梦遗同时在此步结算。" },
    ],
    source: "https://www.icy-veins.com/d3/necromancer-blood-nova-build-with-lod",
  },

  "inarius-nova": {
    id: "inarius-nova", name: "伊纳瑞斯死亡新星", set: "伊纳瑞斯的恩泽", core: "骨甲旋风易伤 → 铁玫瑰鲜血新星",
    summary: "必须贴近敌人让骨甲旋风命中，伊纳瑞斯六件才会放大后续新星；比梦遗容易成型，比塔格奥更依赖站位。",
    difficulty: "中 · 贴身维持骨甲旋风", follower: "盗贼", followerReason: "新星仍以暴击和元素周期爆发为主，盗贼的暴击增益最直接。",
    gear: inariusGear, skills: novaSkills, passives: novaPassives, powers: [commonNovaPowers[0], { ...commonNovaPowers[2], id: "mantle-channeling", name: "导能披肩", image: IMG.channeling, effect: "虹吸引导时增伤并减伤。", logic: "贴身站定期间同时补齐攻防。", acquisition: "血岩赌护肩；黄装升级70级护肩" }, commonNovaPowers[2], commonNovaPowers[3]],
    variants: {
      ...defaultVariants("骨甲旋风与死亡新星"),
      low: { title: "低巅峰 < 2000", note: "全六件伊纳瑞斯先保套装稳定。", changes: ["腰带与护腕可换守护者两件并在魔方使用华戒", "骨甲先叠满再站定，不要裸身虹吸", "词缀先保体能、护甲和生命%" ] },
      high: { title: "高巅峰 2000+", note: "卸下守护者后换回戴恩提与控制免疫。", changes: ["手套智力换范围伤", "护肩补冷却和范围伤", "用卡兰之睿把骨甲上限拉高" ] },
    },
    links: [
      { title: "伊纳瑞斯易伤圈", category: "damage", steps: [{ id: "bone-armor", label: "骨甲", detail: "生成贴身旋风" }, { id: "inarius-head", label: "伊纳瑞斯6件", detail: "旋风命中敌人" }, { id: "siphon-blood", label: "鲜血虹吸", detail: "锁定圈内目标" }, { id: "iron-rose", label: "铁玫瑰", detail: "触发鲜血新星" }], conclusion: "先让骨甲旋风碰到敌人，再虹吸；站得太远会直接丢掉套装核心乘区。" },
      { title: "强控三倍档", category: "damage", steps: [{ id: "bone-armor", label: "白骨脱臼", detail: "眩晕2秒" }, { id: "krysbin", label: "克里斯宾", detail: "强控三倍档" }, { id: "coe", label: "全能法戒", detail: "物理周期" }, { id: "death-nova", label: "死亡新星", detail: "窗口内爆发" }], conclusion: "骨甲既开套装乘区又开克里斯宾，必须放进物理元素窗口。" },
      { title: "贴身减伤链", category: "defense", steps: [{ id: "frailty", label: "脆弱光环", detail: "自动诅咒" }, { id: "dayntee", label: "戴恩提", detail: "最高50%减伤" }, { id: "bone-armor", label: "骨甲层数", detail: "套装继续减伤" }], conclusion: "没有受诅咒敌人或骨甲掉层时不要站定输出。" },
    ],
    rotation: [
      { title: "开双分", action: "进图开启血魂双分。", reason: "鬼灵面容使其永久存在并复制新星。" },
      { title: "贴怪叠骨甲", action: "冲进怪群后骨甲命中尽可能多敌人。", reason: "获得减伤并启动伊纳瑞斯旋风。" },
      { title: "确认旋风命中", action: "保持目标在骨甲旋风范围内。", reason: "只有被旋风命中的敌人才吃六件套乘区。" },
      { title: "物理窗眩晕", action: "元素转物理时再次骨甲。", reason: "同时刷新旋风并触发克里斯宾强控档。" },
      { title: "虹吸收割", action: "物理窗内持续虹吸核心目标。", reason: "铁玫瑰和分身把所有乘区汇总到鲜血新星。" },
    ],
    source: "https://eu.diablo3.blizzard.com/zh-tw/item/inariuss-understanding-P6_Necro_Set_3_Helm",
  },

  "rathma-aotd": {
    id: "rathma-aotd", name: "拉斯玛亡者大军", set: "拉斯玛之骨 + 克里森船长", core: "仆从攻击降冷却 → 亡者大军连续轰炸",
    summary: "永久仆从不是主伤害，而是亡者大军的冷却引擎；统御骷髅锁定精英后，杰瑟斯、羁绊和套装倍率一起进入爆发。",
    difficulty: "高 · 冷却、宠物目标与元素窗", follower: "魔女", followerReason: "先知协调提供冷却，集中心智帮助骷髅达到攻速断点，正好服务亡者大军循环。",
    gear: rathmaGear,
    skills: [
      { id: "siphon-blood", name: "鲜血虹吸", rune: "力量转移", image: skill("siphon-blood"), logic: "维持魂能和葬镰威能，顺便为全技能叠加增伤。" },
      { id: "command-skeletons", name: "统御骷髅", rune: "狂乱", image: skill("command-skeletons"), logic: "锁定精英、启动杰瑟斯，并用高攻速快速刷新亡者大军。" },
      { id: "bone-armor", name: "骨甲", rune: "白骨脱臼", image: skill("bone-armor"), logic: "减伤、眩晕和第39赛季轮回镰刀乘区。" },
      { id: "army-of-the-dead", name: "亡者大军", rune: "死亡之谷", image: skill("army-of-the-dead"), logic: "主伤害按钮；命中范围还能把怪拉向中心。" },
      { id: "blood-rush", name: "鲜血穿行", rune: "强韧", image: skill("blood-rush"), logic: "寻找开阔地形、躲避伤害并重置站位。" },
      { id: "revive", name: "亡者复生", rune: "私人军队", image: skill("revive"), logic: "补足永久仆从数量，并按数量提供减伤。" },
    ],
    passives: [
      { id: "rigor-mortis", name: "尸僵", image: passive("rigor-mortis"), logic: "毒素技能减速敌人，稳定触发克里斯宾基础档。" },
      { id: "final-service", name: "绝命效忠", image: passive("final-service"), logic: "用仆从换一次致命伤保命。" },
      { id: "rathmas-shield", name: "拉斯玛之盾", image: passive("rathmas-shield"), logic: "使用亡者大军后短暂无敌，保护爆发动作。" },
      { id: "grisly-tribute", name: "血祭供奉", image: passive("grisly-tribute"), logic: "仆从击中时治疗角色，帮助维持斯奎特。" },
    ],
    powers: [
      { id: "funerary-pick", slot: "武器", name: "葬镰", image: IMG.funerary, effect: "鲜血虹吸让目标承受更高伤害。", logic: "用虹吸标记精英后再下亡者大军。", acquisition: "黄装升级：70级单手镰刀" },
      { id: "fates-vow", slot: "防具", name: "命运誓约", image: `${A}fates-vow-p61_necro_unique_helm_22.png`, effect: "赋予亡者大军最高伤害符文并提高其伤害。", logic: "不占技能符文位也能获得非传统战争效果。", acquisition: "血岩赌头盔；黄装升级70级头盔" },
      { id: "royal-grandeur", slot: "首饰", name: "皇家华戒", image: IMG.royal, effect: "套装所需件数减少1。", logic: "让拉斯玛5件与克里森2件同时激活完整奖励。", acquisition: "第一幕悬赏宝箱限定" },
      { id: "scythe-cycle", slot: "第4槽", name: "轮回镰刀", image: IMG.cycle, effect: "骨甲生效时放大技能伤害。", logic: "第39赛季额外乘区；频繁骨甲维持。", acquisition: "黄装升级：70级单手镰刀" },
    ],
    variants: {
      ...defaultVariants("亡者大军"),
      low: { title: "低巅峰 < 2000", note: "先用第39赛季赠送的完整拉斯玛六件。", changes: ["未拿华戒前穿满六件拉斯玛", "腰带先戴恩提保证减伤", "冷却缩减优先于范围伤和极限暴击" ] },
      high: { title: "高巅峰 2000+", note: "转5件拉斯玛+2件克里森。", changes: ["华戒激活两套完整奖励", "肩、手、武器、副手堆冷却", "骷髅攻速达到稳定刷新断点后再堆范围伤" ] },
      speed: { title: "速刷大秘境", note: "伤害溢出后以连续亡者大军和位移为目标。", changes: ["斯奎特可换时光流韵提高容错", "第四槽可换斯图亚特胫甲提高移速", "不等完整元素周期，精英出现即统御骷髅+亡者大军" ] },
    },
    links: [
      { title: "仆从冷却引擎", category: "resource", steps: [{ id: "revive", label: "亡者复生", detail: "补足永久仆从" }, { id: "command-skeletons", label: "狂乱骷髅", detail: "高速攻击" }, { id: "rathma-head", label: "拉斯玛2件", detail: "仆从命中减冷却" }, { id: "army-of-the-dead", label: "亡者大军", detail: "重新可用" }], conclusion: "仆从的价值是攻击频率；它们打得越快，亡者大军回得越快。" },
      { title: "目标锁定乘区", category: "damage", steps: [{ id: "command-skeletons", label: "统御骷髅", detail: "锁定精英" }, { id: "jesseth-scythe", label: "杰瑟斯两件", detail: "全局增伤" }, { id: "clena", label: "希雷娜羁绊", detail: "亡者大军乘区" }, { id: "army-of-the-dead", label: "亡者大军", detail: "集中轰炸" }], conclusion: "每个新精英都先按统御骷髅，直接丢亡者大军会漏掉两个核心增伤。" },
      { title: "冷却转伤害", category: "damage", steps: [{ id: "crimson-belt", label: "克里森船长", detail: "冷却缩减" }, { id: "royal-grandeur", label: "皇家华戒", detail: "激活三件" }, { id: "army-of-the-dead", label: "亡者大军", detail: "更短冷却+更高伤害" }], conclusion: "冷却词缀既缩短主技能，又通过克里森三件直接变成伤害。" },
    ],
    rotation: [
      { title: "复生满编", action: "进入秘境后尽快复生足够仆从。", reason: "拉斯玛六件按永久仆从数量放大亡者大军。" },
      { title: "统御锁定", action: "每遇到新精英先命令骷髅攻击。", reason: "启动杰瑟斯和希雷娜羁绊。" },
      { title: "虹吸标记", action: "短暂虹吸核心目标。", reason: "葬镰让目标承受额外伤害。" },
      { title: "骨甲强控", action: "元素窗前骨甲眩晕怪群。", reason: "克里斯宾进入强控档，并启动轮回镰刀。" },
      { title: "释放大军", action: "在物理周期与神目圈重叠时放亡者大军。", reason: "所有装备、套装、控制和元素乘区在这一击汇合。" },
    ],
    source: "https://www.icy-veins.com/d3/necromancer-rathma-army-of-the-dead-build",
  },

  "masquerade-spear": {
    id: "masquerade-spear", name: "狂欢节骨矛", set: "燃烧狂欢节舞会服 + 克里森船长", core: "永久双分复制骨矛 → 直线穿透叠加",
    summary: "本体骨矛负责瞄准，两个永久分身复制同一条弹道；穿过的目标越多，枯萎骨髓和范围伤收益越高。",
    difficulty: "中 · 直线站位与魂能管理", follower: "盗贼", followerReason: "盗贼的暴击窗口适合毒素周期；远程作战也更容易维持他的增益。",
    gear: masqueradeGear,
    skills: [
      { id: "bone-spear", name: "骨矛", rune: "枯萎骨髓", image: skill("bone-spear"), logic: "毒素主伤害；穿透越多目标，伤害越高。速刷改齿状骨刺。" },
      { id: "grim-scythe", name: "死亡镰刀", rune: "诅咒镰刀", image: skill("grim-scythe"), logic: "补魂能并施加诅咒，启动戴恩提和咒怨之力。" },
      { id: "simulacrum", name: "血魂双分", rune: "蓄能精魄（套装全符文）", image: skill("simulacrum"), logic: "永久存在、提高最大魂能并复制骨矛。" },
      { id: "bone-armor", name: "骨甲", rune: "白骨脱臼", image: skill("bone-armor"), logic: "维持轮回镰刀乘区并触发克里斯宾三倍档。" },
      { id: "frailty", name: "脆弱", rune: "脆弱光环", image: skill("frailty"), logic: "自动处决并维持诅咒覆盖。" },
      { id: "blood-rush", name: "鲜血穿行", rune: "强韧", image: skill("blood-rush"), logic: "拉开距离、调整骨矛穿透直线。" },
    ],
    passives: [
      { id: "spreading-malediction", name: "咒怨之力", image: passive("spreading-malediction"), logic: "受诅咒敌人越多，整体伤害越高。" },
      { id: "final-service", name: "绝命效忠", image: passive("final-service"), logic: "提供一次致命伤保命。" },
      { id: "stand-alone", name: "孤魂死灵", image: passive("stand-alone"), logic: "提高护甲；血魂双分不计作仆从。" },
      { id: "overwhelming-essence", name: "充沛魂能", image: passive("overwhelming-essence"), logic: "最大魂能直接放大第39赛季莱莲娜影钩。" },
    ],
    powers: [
      { id: "maltorius", slot: "武器", name: "马托利斯的石化尖刺", image: IMG.maltorius, effect: "骨矛消耗翻倍并获得巨大独立增伤。", logic: "资源管理变严格，但这是骨矛最大专属乘区。", acquisition: "黄装升级：70级双手镰刀" },
      { id: "dayntee", slot: "防具", name: "戴恩提的束腰", image: IMG.dayntee, effect: "有受诅咒敌人时最高50%减伤。", logic: "死亡镰刀与脆弱光环持续触发。", acquisition: "血岩赌腰带；升级70级腰带" },
      { id: "royal-grandeur", slot: "首饰", name: "皇家华戒", image: IMG.royal, effect: "套装需求减少1。", logic: "同时激活狂欢节六件与克里森三件。", acquisition: "第一幕悬赏宝箱限定" },
      { id: "reilena", slot: "第4槽", name: "莱莲娜的影魂钩", image: IMG.reilena, effect: "每点最大魂能提高伤害。", logic: "套装全符文双分、充沛魂能、巅峰与武器副词缀全部转成乘区。", acquisition: "黄装升级：70级双手镰刀" },
    ],
    variants: {
      ...defaultVariants("骨矛"),
      push: { title: "大秘境冲层", note: "毒素枯萎骨髓，围绕直线穿透与元素周期。", changes: ["骨矛使用枯萎骨髓", "护腕和项链洗毒素伤", "怪群排成直线后再打毒素周期" ] },
      speed: { title: "T16 / 速刷", note: "改物理齿状骨刺，扇形覆盖优先。", changes: ["骨矛改齿状骨刺，元素词缀改物理", "防具槽可换斯图亚特胫甲", "受罚者换强者之灾" ] },
      low: { title: "低巅峰 < 2000", note: "先穿完整六件狂欢节，资源与坚韧优先。", changes: ["未出华戒前不混搭克里森", "副手先要骨矛伤和暴击，不强求远古", "适量体能，避免斯奎特可替换为鬼灵面容固定件" ] },
      high: { title: "高巅峰 2000+", note: "5件狂欢节+2件克里森，最大化元素窗口。", changes: ["手套智力换攻速或范围伤", "肩、戒指堆范围伤", "所有可获得最大魂能的副词缀都尽量保留" ] },
    },
    links: [
      { title: "三线骨矛", category: "damage", steps: [{ id: "simulacrum", label: "血魂双分", detail: "两个永久分身" }, { id: "haunted-visions", label: "鬼灵面容", detail: "分身永久" }, { id: "bone-spear", label: "本体骨矛", detail: "确定瞄准线" }, { id: "gelmindor", label: "骨髓守护", detail: "分身骨矛乘区" }], conclusion: "本体每发骨矛都会带出两发分身骨矛，三条弹道共享你的瞄准方向。" },
      { title: "魂能变伤害", category: "resource", steps: [{ id: "overwhelming-essence", label: "充沛魂能", detail: "提高上限" }, { id: "simulacrum", label: "蓄能精魄", detail: "套装获得全符文" }, { id: "reilena", label: "莱莲娜影钩", detail: "最大魂能转伤害" }, { id: "maltorius", label: "马托利斯", detail: "高消耗高倍率" }], conclusion: "第39赛季第四槽让最大魂能同时解决倍率问题，但骨矛消耗也更高。" },
      { title: "骨甲时限", category: "defense", steps: [{ id: "bone-armor", label: "骨甲", detail: "减伤与眩晕" }, { id: "cycle", label: "轮回镰刀", detail: "骨矛增伤" }, { id: "krysbin", label: "克里斯宾", detail: "眩晕三倍档" }], conclusion: "连续骨矛会吃掉骨甲持续时间；断骨甲会同时失去增伤和减伤。" },
    ],
    rotation: [
      { title: "永久双分", action: "进图开启血魂双分。", reason: "鬼灵面容让分身永久，套装使其获得全符文。" },
      { title: "镰刀补魂", action: "贴近安全目标用诅咒镰刀回魂能。", reason: "马托利斯使骨矛消耗翻倍，必须主动补资源。" },
      { title: "调整直线", action: "鲜血穿行到怪群侧后方，让目标排成直线。", reason: "枯萎骨髓按穿透目标数增伤。" },
      { title: "骨甲强控", action: "毒素周期前白骨脱臼。", reason: "同时续轮回镰刀并触发克里斯宾三倍档。" },
      { title: "毒素窗连矛", action: "向精英身后的整条怪群连续骨矛。", reason: "三线骨矛、穿透、元素、骨髓守护和莱莲娜同时结算。" },
    ],
    source: "https://www.icy-veins.com/d3/necromancer-bone-spear-build-with-masquerade",
  },

  "pestilence-lance": {
    id: "pestilence-lance", name: "瘟疫尸枪", set: "瘟疫大师的裹尸布 + 克里森船长", core: "亡者领域无限尸体 → 吞噬自动发射尸枪",
    summary: "平时以找图、聚怪和等冷却为主；亡者领域与血魂双分同时开启后，连续吞噬尸体让套装自动向全屏发射尸枪。",
    difficulty: "高 · 长冷却爆发与窗口管理", follower: "魔女", followerReason: "先知协调缩短亡者领域和血魂双分冷却，价值高于短时暴击。",
    gear: pestilenceGear,
    skills: [
      { id: "corpse-lance", name: "尸枪术", rune: "脆弱之触", image: skill("corpse-lance"), logic: "主伤害；冰枪命中叠加目标受到的暴击几率。" },
      { id: "blood-rush", name: "鲜血穿行", rune: "蜕皮", image: skill("blood-rush"), logic: "侦察地图并留下尸体，为窗口外续接做准备。" },
      { id: "devour", name: "吞噬", rune: "贪食", image: skill("devour"), logic: "亡者领域内持续按住/连按，触发瘟疫二件自动尸枪。" },
      { id: "command-skeletons", name: "统御骷髅", rune: "黑暗愈合", image: skill("command-skeletons"), logic: "锁定精英，启动杰瑟斯全局增伤并提供治疗。" },
      { id: "simulacrum", name: "血魂双分", rune: "蓄能精魄", image: skill("simulacrum"), logic: "提高最大魂能，放大莱莲娜影钩。" },
      { id: "land-of-the-dead", name: "亡者领域", rune: "寒冰大地", image: skill("land-of-the-dead"), logic: "提供无限尸体并冻结全场，同时启动克里斯宾强控档。" },
    ],
    passives: [
      { id: "fueled-by-death", name: "死亡之力", image: passive("fueled-by-death"), logic: "吞噬尸体后提高移速，帮助爆发后转场。" },
      { id: "overwhelming-essence", name: "充沛魂能", image: passive("overwhelming-essence"), logic: "第39赛季用最大魂能放大莱莲娜影钩。" },
      { id: "blood-is-power", name: "血魄之力", image: passive("blood-is-power"), logic: "累计损失生命缩短大冷却，加快下一轮亡者领域。" },
      { id: "final-service", name: "绝命效忠", image: passive("final-service"), logic: "爆发空窗期提供一次保命。" },
    ],
    powers: [
      { id: "reilena", slot: "武器", name: "莱莲娜的影魂钩", image: IMG.reilena, effect: "每点最大魂能提高伤害。", logic: "双分蓄能、充沛魂能、巅峰和武器副词缀都进入乘区。", acquisition: "黄装升级：70级双手镰刀" },
      { id: "corpsewhisper", slot: "防具", name: "尸语肩铠", image: IMG.corpsewhisper, effect: "消耗尸体后叠加尸枪伤害。", logic: "亡者领域内高速吞噬，瞬间叠满后续尸枪乘区。", acquisition: "血岩赌护肩；黄装升级70级护肩" },
      { id: "royal-grandeur", slot: "首饰", name: "皇家华戒", image: IMG.royal, effect: "套装需求减少1。", logic: "5件瘟疫+2件克里森同时生效。", acquisition: "第一幕悬赏宝箱限定" },
      { id: "corroded-fang", slot: "第4槽", name: "塔格奥的蚀牙", image: IMG.corroded, effect: "受诅咒目标承受额外伤害。", logic: "第39赛季新增独立乘区；靠亡者领域外的诅咒或随从控制保持。", acquisition: "黄装升级：70级单手镰刀" },
    ],
    variants: {
      ...defaultVariants("尸枪术"),
      push: { title: "大秘境冲层", note: "寒冰大地+脆弱之触，集中处理精英和守关者。", changes: ["尸枪用脆弱之触叠暴击", "所有大冷却必须同时开启", "爆发外只侦察、聚怪和保命" ] },
      speed: { title: "T16 / 速刷", note: "缩短等待并提高移动，不追求完整尸枪层数。", changes: ["护腕换复仇者交给本人或随从", "第四槽可换寅剑缩短精英间隔", "吞噬使用吞血食肉提高续航" ] },
      low: { title: "低巅峰 < 2000", note: "先穿完整六件瘟疫，放弃混搭克里森。", changes: ["腰带戴恩提，魔方防具仍用尸语肩", "冷却缩减是第一优先级", "斯奎特维持困难时换防御项链" ] },
      high: { title: "高巅峰 2000+", note: "5瘟疫+2克里森把冷却同时转化为伤害。", changes: ["肩、手、武器、副手全部追冷却", "暴击几率因脆弱之触而降低优先级", "最大魂能副词缀用于莱莲娜第四槽" ] },
    },
    links: [
      { title: "无限尸体炮台", category: "damage", steps: [{ id: "land-of-the-dead", label: "亡者领域", detail: "无限尸体" }, { id: "devour", label: "吞噬", detail: "高速消耗尸体" }, { id: "pestilence-head", label: "瘟疫2件", detail: "吞噬自动尸枪" }, { id: "corpsewhisper", label: "尸语肩铠", detail: "消耗尸体叠乘区" }, { id: "corpse-lance", label: "全屏尸枪", detail: "自动追踪目标" }], conclusion: "领域内主要按吞噬，不是手动点尸枪；套装会把每次吞噬变成自动炮台。" },
      { title: "冻结暴击窗口", category: "damage", steps: [{ id: "land-of-the-dead", label: "寒冰大地", detail: "全场冻结" }, { id: "krysbin", label: "克里斯宾", detail: "强控三倍档" }, { id: "corpse-lance", label: "脆弱之触", detail: "持续叠受暴率" }, { id: "coe", label: "全能法戒", detail: "冰霜周期" }], conclusion: "亡者领域既给尸体又给强控；最好让冰霜元素周期覆盖领域的主要时段。" },
      { title: "冷却循环", category: "resource", steps: [{ id: "blood-is-power", label: "血魄之力", detail: "损血缩短冷却" }, { id: "crimson-belt", label: "克里森船长", detail: "冷却转伤害" }, { id: "land-of-the-dead", label: "亡者领域", detail: "更快进入下一轮" }], conclusion: "冷却词缀是这套的伤害、手感和生存三合一属性。" },
    ],
    rotation: [
      { title: "侦察聚怪", action: "爆发外用鲜血穿行找精英和大怪群。", reason: "没有亡者领域时尸体有限，不值得零散输出。" },
      { title: "统御锁定", action: "让骷髅攻击核心精英。", reason: "杰瑟斯两件套必须先被主动命令。" },
      { title: "双分+领域", action: "元素窗到来前同时开血魂双分与亡者领域。", reason: "一个提高魂能乘区，一个提供无限尸体和全场冻结。" },
      { title: "持续吞噬", action: "领域内连续按吞噬。", reason: "瘟疫二件自动发射尸枪，尸语肩同步叠层。" },
      { title: "转场等冷却", action: "领域结束后立即移动，避免在空窗硬站。", reason: "这套是长冷却爆发BD，空窗期生存和找图优先。" },
    ],
    source: "https://www.icy-veins.com/d3/necromancer-corpse-lance-build-with-pestilence-or-trag-ouls-set",
  },

  "lod-corpse-explosion": {
    id: "lod-corpse-explosion", name: "梦遗尸爆", set: "梦之遗礼 · 远古散件", core: "亡者领域冻结 → 尸爆连锁 → 乔斯顿余波",
    summary: "用毒素技能叠奈雅黑死病，亡者领域制造无限尸体和强控；尸爆先靠魂能之握叠层，再用范围伤把怪群连锁炸开。",
    difficulty: "中高 · 尸体、毒素层数与冷却", follower: "魔女", followerReason: "先知协调缩短亡者领域，强固护盾帮助维持远古散件的贴身爆破。",
    gear: corpseExplosionGear,
    skills: [
      { id: "grim-scythe", name: "死亡镰刀", rune: "诅咒镰刀", image: skill("grim-scythe"), logic: "施加诅咒、启动蚀牙和戴恩提，并触发第一种毒素技能。" },
      { id: "blood-rush", name: "鲜血穿行", rune: "强韧", image: skill("blood-rush"), logic: "进入怪群、调整爆炸中心和脱离危险。" },
      { id: "land-of-the-dead", name: "亡者领域", rune: "寒冰大地", image: skill("land-of-the-dead"), logic: "无限尸体+全场冻结，开启主爆发窗口。" },
      { id: "bone-spear", name: "骨矛", rune: "枯萎骨髓", image: skill("bone-spear"), logic: "消耗魂能、触发第二种毒素技能并远程制造首批伤害。" },
      { id: "corpse-explosion", name: "尸爆", rune: "近身爆破", image: skill("corpse-explosion"), logic: "毒素主伤害，尸体越密、范围伤越高，连锁越强。" },
      { id: "bone-armor", name: "骨甲", rune: "白骨脱臼", image: skill("bone-armor"), logic: "第三种毒素技能，同时眩晕触发克里斯宾。" },
    ],
    passives: [
      { id: "spreading-malediction", name: "咒怨之力", image: passive("spreading-malediction"), logic: "诅咒敌人越多，尸爆整体伤害越高。" },
      { id: "blood-is-power", name: "血魄之力", image: passive("blood-is-power"), logic: "损失生命后缩短亡者领域冷却。" },
      { id: "stand-alone", name: "孤魂死灵", image: passive("stand-alone"), logic: "没有仆从时提高护甲。" },
      { id: "overwhelming-essence", name: "充沛魂能", image: passive("overwhelming-essence"), logic: "第39赛季提高莱莲娜影钩的最大魂能乘区。" },
    ],
    powers: [
      { id: "nayr", slot: "武器", name: "奈雅的黑死病", image: IMG.nayr, effect: "每使用一种不同毒素技能，所有毒素技能获得叠加增伤。", logic: "诅咒镰刀、毒骨矛、毒尸爆、毒骨甲负责叠满。", acquisition: "黄装升级：70级双手镰刀" },
      { id: "stone-gauntlets", slot: "防具", name: "岩石护手", image: IMG.stone, effect: "受击叠加大量护甲。", logic: "攀冰者消除其行动惩罚，形成成对防御组件。", acquisition: "用力量职业赌博/掉落，再转给死灵" },
      { id: "unity", slot: "首饰", name: "团结", image: IMG.unity, effect: "和不死随从同时佩戴时分担伤害。", logic: "单人冲层稳定减伤；随从必须装备不死圣物。", acquisition: "世界掉落；黄装升级70级戒指" },
      { id: "reilena", slot: "第4槽", name: "莱莲娜的影魂钩", image: IMG.reilena, effect: "最大魂能转化为伤害。", logic: "第39赛季用充沛魂能和巅峰上限获得额外乘区。", acquisition: "黄装升级：70级双手镰刀" },
    ],
    variants: {
      ...defaultVariants("尸爆"),
      low: { title: "低巅峰 < 2000", note: "远古不足时先用伊纳瑞斯尸爆或其他套装过渡。", changes: ["梦遗宝石先升满再转型", "天鹰、戴恩提、团结三层防御优先", "没有远古的关键功能件也先使用，不要为了远古丢特效" ] },
      high: { title: "高巅峰 2000+", note: "全远古后把词缀集中到范围伤、冷却和毒素。", changes: ["肩、手、戒指尽量范围伤", "武器和副手保留最大魂能副词缀", "乔斯顿余波与元素周期精确衔接" ] },
      speed: { title: "T16 / 速刷", note: "用自动吸尸和移速缩短找尸体时间。", changes: ["亡者领域可换尸体丰富的便捷符文", "第四槽换斯图亚特胫甲或寅剑", "受罚者换强者之灾，团结可换贪婪之戒" ] },
    },
    links: [
      { title: "毒素四层发动机", category: "damage", steps: [{ id: "grim-scythe", label: "诅咒镰刀", detail: "毒素1+诅咒" }, { id: "bone-spear", label: "枯萎骨髓", detail: "毒素2" }, { id: "bone-armor", label: "白骨脱臼", detail: "毒素3+眩晕" }, { id: "corpse-explosion", label: "近身爆破", detail: "毒素4" }, { id: "nayr", label: "奈雅黑死病", detail: "按不同毒技叠乘区" }], conclusion: "爆发前先用不同毒素技能叠层，直接按尸爆会少掉奈雅的核心倍率。" },
      { title: "无限尸爆窗口", category: "damage", steps: [{ id: "land-of-the-dead", label: "亡者领域", detail: "无限尸体+冻结" }, { id: "krysbin", label: "克里斯宾", detail: "冻结三倍档" }, { id: "grasps", label: "魂能之握", detail: "尸爆命中叠层" }, { id: "corpse-explosion", label: "尸爆", detail: "连续引爆" }, { id: "johnstone", label: "乔斯顿之石", detail: "领域结束后保留余波" }], conclusion: "领域开始先快速叠魂能之握，结束后用乔斯顿层数继续清理残余精英。" },
      { title: "岩石护手组合", category: "defense", steps: [{ id: "stone-gauntlets", label: "岩石护手", detail: "受击叠护甲" }, { id: "ice-climbers", label: "攀冰者", detail: "免疫减速定身" }, { id: "unity", label: "团结", detail: "与不死随从分伤" }], conclusion: "少任意一件都会明显变脆；团结随从没有不死圣物时反而会断减伤。" },
    ],
    rotation: [
      { title: "先造第一具尸体", action: "用镰刀、骨矛和随从协助击杀弱怪。", reason: "没有尸体时尸爆无法启动；亡者领域未好时尤其重要。" },
      { title: "叠毒素技能", action: "依次使用诅咒镰刀、毒骨矛和毒骨甲。", reason: "奈雅黑死病按不同毒素技能数量叠加。" },
      { title: "开启亡者领域", action: "元素窗前开启寒冰大地。", reason: "无限尸体和全场冻结同时启动克里斯宾强控档。" },
      { title: "贴身连续尸爆", action: "站在精英和密集尸体中心持续尸爆。", reason: "魂能之握快速叠层，范围伤把爆炸扩散到整群。" },
      { title: "利用乔斯顿余波", action: "领域结束后继续消耗已有尸体。", reason: "乔斯顿之石保存的知识层数让窗口外仍有一段高伤。" },
    ],
    source: "https://www.icy-veins.com/d3/necromancer-corpse-explosion-build-with-lod",
  },
};
