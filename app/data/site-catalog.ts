import { classCrestAsset, classPortraitAsset } from "./assets";

export type ClassId = "barbarian" | "crusader" | "demon-hunter" | "monk" | "necromancer" | "witch-doctor" | "wizard";

export type BuildEntry = {
  id: string;
  classId: ClassId;
  name: string;
  set: string;
  core: string;
  image: string;
  role: "冲层" | "速刷" | "通用";
  difficulty: "低" | "中" | "高";
  summary: string;
  complete?: boolean;
  purpose?: "大秘境" | "小秘境" | "蓝门" | "悬赏" | "外观收集";
  content?: string[];
};

export const CLASS_CATALOG: { id: ClassId; name: string; resource: string; portrait: string; crest: string }[] = [
  { id: "barbarian", name: "野蛮人", resource: "怒气", portrait: classPortraitAsset("barbarian"), crest: classCrestAsset("barbarian") },
  { id: "crusader", name: "圣教军", resource: "圣怒", portrait: classPortraitAsset("crusader"), crest: classCrestAsset("crusader") },
  { id: "demon-hunter", name: "猎魔人", resource: "憎恨 / 戒律", portrait: classPortraitAsset("demon-hunter"), crest: classCrestAsset("demon-hunter") },
  { id: "monk", name: "武僧", resource: "精气", portrait: classPortraitAsset("monk"), crest: classCrestAsset("monk") },
  { id: "necromancer", name: "死灵法师", resource: "魂能", portrait: classPortraitAsset("necromancer"), crest: classCrestAsset("necromancer") },
  { id: "witch-doctor", name: "巫医", resource: "法力", portrait: classPortraitAsset("witch-doctor"), crest: classCrestAsset("witch-doctor") },
  { id: "wizard", name: "魔法师", resource: "秘能", portrait: classPortraitAsset("wizard"), crest: classCrestAsset("wizard") },
];

export const BUILD_CATALOG: BuildEntry[] = [
  { id: "wastes-rend", classId: "barbarian", name: "荒原旋风痛割", set: "荒原之怒", core: "旋风斩 / 痛割", image: "/d3/library/skills/barbarian-active-whirlwind.png", role: "通用", difficulty: "低", summary: "旋风斩维持机动与减伤，由安博之骄自动施放痛割完成输出。", complete: true },
  { id: "raekor-boulder", classId: "barbarian", name: "蕾蔻巨石", set: "蕾蔻的传世铠", core: "上古之矛", image: "/d3/library/skills/barbarian-active-ancient-spear.png", role: "冲层", difficulty: "高", summary: "冲锋叠层、聚怪后用巨石怒掷消耗怒气爆发。", complete: true },
  { id: "ik-hota", classId: "barbarian", name: "不朽先祖锤", set: "不朽之王", core: "先祖之锤", image: "/d3/library/skills/barbarian-active-hammer-of-the-ancients.png", role: "通用", difficulty: "中", summary: "先祖与狂战之怒常驻，用怒气上限放大先祖之锤。", complete: true },
  { id: "lod-hota", classId: "barbarian", name: "梦遗先祖锤", set: "梦之遗礼", core: "先祖之锤", image: "/d3/library/skills/barbarian-active-hammer-of-the-ancients.png", role: "冲层", difficulty: "高", summary: "无套装传奇组合，依靠高质量远古散件获得上限。", complete: true },
  { id: "earth-leapquake", classId: "barbarian", name: "大地跃击", set: "大地之力", core: "跃击 / 地震", image: "/d3/library/skills/barbarian-active-earthquake.png", role: "通用", difficulty: "中", summary: "连续跃击触发地震与雪崩，兼顾位移、控制和伤害。", complete: true },
  { id: "h90-frenzy", classId: "barbarian", name: "九十蛮狂乱", set: "九十蛮", core: "狂乱", image: "/d3/library/skills/barbarian-active-frenzy.png", role: "冲层", difficulty: "中", summary: "高攻速单体近战，围绕狂乱层数和战吼恐惧建立乘区。", complete: true },
  { id: "ik-charge", classId: "barbarian", name: "不朽冲锋", set: "不朽之王 / 蕾蔻", core: "狂暴冲锋", image: "/d3/library/skills/barbarian-active-furious-charge.png", role: "速刷", difficulty: "中", summary: "用冲锋刷新自身并穿图，适合低层快速清场。", complete: true },

  { id: "valor-fist", classId: "crusader", name: "勇气天拳", set: "勇气壁垒", core: "天堂之拳", image: "/d3/library/skills/crusader-active-fist-of-the-heavens.png", role: "速刷", difficulty: "低", purpose: "小秘境", content: ["T16小秘境", "悬赏", "低层大秘境"], summary: "骑马期间自动落下天堂之拳，移动清场效率突出。" },
  { id: "pony-fist-farm", classId: "crusader", name: "跑马天拳 · 全能速刷", set: "勇气壁垒 / 诺瓦德", core: "战马冲锋 / 天堂之拳", image: "/d3/library/skills/crusader-active-steed-charge.png", role: "速刷", difficulty: "低", purpose: "小秘境", content: ["T16小秘境", "蓝门", "大秘境≤110", "悬赏"], summary: "专门为赶路、清屏和拾取优化：T16 小秘境、蓝门与 110 层以下大秘境共用一套操作逻辑。" },
  { id: "valor-fury", classId: "crusader", name: "勇气天堂之怒", set: "勇气壁垒", core: "天堂之怒", image: "/d3/library/skills/crusader-active-heavens-fury.png", role: "冲层", difficulty: "高", summary: "天堂之拳负责叠层，天堂之怒在元素窗口集中爆发。" },
  { id: "akkhan-condemn", classId: "crusader", name: "阿克汉天谴", set: "阿克汉战甲", core: "天谴", image: "/d3/library/skills/crusader-active-condemn.png", role: "通用", difficulty: "中", summary: "阿卡拉特勇士常驻，围绕天谴的延迟爆炸贴身清场。" },
  { id: "akkhan-phalanx", classId: "crusader", name: "阿克汉圣军", set: "阿克汉战甲", core: "圣军之阵", image: "/d3/library/skills/crusader-active-phalanx.png", role: "冲层", difficulty: "中", summary: "由圣军弓手承担输出，角色负责维持变身与增益。" },
  { id: "invoker-thorns", classId: "crusader", name: "唤魔荆棘", set: "唤魔师的荆棘", core: "惩罚", image: "/d3/library/skills/crusader-active-punish.png", role: "冲层", difficulty: "中", summary: "极速攻击把荆棘伤害集中到精英与首领。" },
  { id: "roland-sweep", classId: "crusader", name: "罗兰横扫", set: "罗兰的传世甲", core: "横扫攻击", image: "/d3/library/skills/crusader-active-sweep-attack.png", role: "通用", difficulty: "中", summary: "横扫叠攻速与减伤，在近战范围持续压制怪群。" },
  { id: "seeker-hammer", classId: "crusader", name: "圣光锤丁", set: "圣光追寻者", core: "祝福之锤", image: "/d3/library/skills/crusader-active-blessed-hammer.png", role: "通用", difficulty: "中", summary: "落剑进入战场并提供减伤，让祝福之锤持续覆盖。" },
  { id: "lod-bombardment", classId: "crusader", name: "梦遗轰击", set: "梦之遗礼", core: "火炮轰击", image: "/d3/library/skills/crusader-active-bombardment.png", role: "冲层", difficulty: "高", summary: "堆叠荆棘与冷却，在轰击窗口制造大范围爆发。" },

  { id: "god-hungering", classId: "demon-hunter", name: "恐惧冰吞", set: "恐惧之地机轮甲", core: "追踪箭", image: "/d3/library/skills/demon-hunter-active-hungering-arrow.png", role: "通用", difficulty: "低", summary: "扫射自动释放追踪箭，兼具高速移动与穿透清场。" },
  { id: "marauder-sentry", classId: "demon-hunter", name: "掠夺集束塔", set: "掠夺者的化身", core: "箭塔 / 集束箭", image: "/d3/library/skills/demon-hunter-active-sentry.png", role: "冲层", difficulty: "高", summary: "先布置箭塔建立覆盖，再由箭塔同步释放高消耗技能。" },
  { id: "ue-multishot", classId: "demon-hunter", name: "不洁多重射击", set: "邪秽之精", core: "多重射击", image: "/d3/library/skills/demon-hunter-active-multishot.png", role: "速刷", difficulty: "低", purpose: "小秘境", content: ["T16小秘境", "悬赏", "低层大秘境"], summary: "保持戒律上限并远距离扇形清屏，最直观的速刷玩法之一。" },
  { id: "natalya-trap", classId: "demon-hunter", name: "娜塔亚尖刺陷阱", set: "娜塔亚的复仇", core: "尖刺陷阱", image: "/d3/library/skills/demon-hunter-active-spike-trap.png", role: "冲层", difficulty: "高", summary: "布置陷阱后用憎恨生成技能引爆，操作节奏要求较高。" },
  { id: "shadow-impale", classId: "demon-hunter", name: "暗影三刀", set: "暗影装束", core: "暗影飞刀", image: "/d3/library/skills/demon-hunter-active-impale.png", role: "通用", difficulty: "中", summary: "高机动点杀精英，命中少量目标时获得巨大倍率。" },
  { id: "lod-rapid-fire", classId: "demon-hunter", name: "梦遗连射", set: "梦之遗礼", core: "连射", image: "/d3/library/skills/demon-hunter-active-rapid-fire.png", role: "冲层", difficulty: "高", summary: "站桩引导叠层，用散件乘区换取高额持续伤害。" },

  { id: "inna-ally", classId: "monk", name: "尹娜幻身", set: "尹娜的真言", core: "幻身诀", image: "/d3/library/skills/monk-active-mystic-ally.png", role: "通用", difficulty: "低", summary: "用攻击叠幻身数量，主动释放幻身完成爆发。" },
  { id: "poj-tempest", classId: "monk", name: "正义风雷冲", set: "正义之师", core: "风雷冲", image: "/d3/library/skills/monk-active-tempest-rush.png", role: "通用", difficulty: "低", summary: "维持劲风煞并持续引导风雷冲，移动与输出合一。" },
  { id: "sunwuko-tempest", classId: "monk", name: "猴王风雷冲", set: "孙悟空的戏法", core: "风雷冲", image: "/d3/library/skills/monk-active-tempest-rush.png", role: "冲层", difficulty: "高", summary: "围绕引导层数与元素窗口手动释放冰爆。" },
  { id: "sunwuko-wol", classId: "monk", name: "猴王敲钟", set: "孙悟空的戏法", core: "金钟破", image: "/d3/library/skills/monk-active-wave-of-light.png", role: "速刷", difficulty: "中", purpose: "小秘境", content: ["T16小秘境", "低层大秘境"], summary: "用远程金钟破覆盖大范围，维持劲风煞换取套装倍率。" },
  { id: "lod-wol", classId: "monk", name: "梦遗敲钟", set: "梦之遗礼", core: "金钟破", image: "/d3/library/skills/monk-active-wave-of-light.png", role: "冲层", difficulty: "高", summary: "由幻身在远处施放金钟破，散件质量决定最终上限。" },
  { id: "uliana-palm", classId: "monk", name: "乌莲娜爆裂掌", set: "乌莲娜的谋略", core: "爆裂掌", image: "/d3/library/skills/monk-active-exploding-palm.png", role: "通用", difficulty: "中", summary: "七相拳传播并引爆爆裂掌，依赖聚怪形成连锁。" },
  { id: "raiment-dash", classId: "monk", name: "千飓疾风击", set: "千飓战甲", core: "疾风击", image: "/d3/library/skills/monk-active-dashing-strike.png", role: "速刷", difficulty: "高", purpose: "小秘境", content: ["T16小秘境", "低层大秘境"], summary: "精气生成与疾风击交替，位移本身就是主要伤害。" },
  { id: "god-monk", classId: "monk", name: "上帝僧 · 无限疾风", set: "千飓战甲 / 功能散件", core: "疾风击", image: "/d3/library/skills/monk-active-dashing-strike.png", role: "速刷", difficulty: "中", purpose: "小秘境", content: ["T16小秘境", "低层蓝门", "彩虹地精", "宇宙之翼"], summary: "以千飓倍率保住低层清怪能力，同时集中堆叠精气回复、减耗与冷却，用近乎无限的疾风击穿图。" },

  { id: "tragoul-nova", classId: "necromancer", name: "塔格奥死亡新星", set: "塔格奥的化身", core: "死亡新星", image: "/d3/library/skills/necromancer-active-death-nova.png", role: "通用", difficulty: "低", summary: "鲜血虹吸经铁玫瑰免费触发死亡新星，当前完整交互原型。", complete: true },
  { id: "lod-nova", classId: "necromancer", name: "梦遗死亡新星", set: "梦之遗礼", core: "物理鲜血新星", image: "/d3/library/skills/necromancer-active-death-nova.png", role: "冲层", difficulty: "高", summary: "普通传奇即可启动，远古逐件提高梦遗收益；当前只开放有证据的GR用途。", complete: true },
  { id: "inarius-nova", classId: "necromancer", name: "伊纳瑞斯死亡新星", set: "伊纳瑞斯的恩泽", core: "骨甲 / 死亡新星", image: "/d3/library/skills/necromancer-active-bone-armor.png", role: "通用", difficulty: "中", summary: "贴身利用骨甲旋风易伤，再由虹吸触发新星。", complete: true },
  { id: "rathma-aotd", classId: "necromancer", name: "拉斯玛亡者大军", set: "拉斯玛之骨", core: "亡者大军", image: "/d3/library/skills/necromancer-active-army-of-the-dead.png", role: "通用", difficulty: "高", summary: "三种场景各有完整配置：GR冲层、GR速刷与T16小秘境。", complete: true },
  { id: "masquerade-spear", classId: "necromancer", name: "狂欢节骨矛", set: "燃烧狂欢节舞会服", core: "骨矛", image: "/d3/library/skills/necromancer-active-bone-spear.png", role: "通用", difficulty: "中", summary: "血魂双分复制骨矛，直线穿透在密集怪群中收益最高。", complete: true },
  { id: "pestilence-lance", classId: "necromancer", name: "瘟疫尸枪", set: "瘟疫大师的裹尸布", core: "尸枪术", image: "/d3/library/skills/necromancer-active-corpse-lance.png", role: "冲层", difficulty: "高", summary: "亡者领域提供尸体窗口，尸枪在爆发期连续锁定目标。", complete: true },
  { id: "lod-corpse-explosion", classId: "necromancer", name: "梦遗尸爆", set: "梦之遗礼", core: "尸爆", image: "/d3/library/skills/necromancer-active-corpse-explosion.png", role: "通用", difficulty: "中", summary: "先制造第一具尸体，再通过尸爆把怪群连锁引爆。", complete: true },

  { id: "mundunugu-barrage", classId: "witch-doctor", name: "蒙嘟噜魂弹", set: "蒙嘟噜的法衣", core: "魂灵弹幕", image: "/d3/library/skills/witch-doctor-active-spirit-barrage.png", role: "冲层", difficulty: "高", summary: "累积魂灵弹幕后统一结算，法力回复直接参与伤害倍率。" },
  { id: "arachyr-spiders", classId: "witch-doctor", name: "亚拉基尔蜘蛛", set: "亚拉基尔的灵魂", core: "尸蛛", image: "/d3/library/skills/witch-doctor-active-corpse-spiders.png", role: "冲层", difficulty: "中", summary: "用蜘蛛女王的蛛网覆盖目标，尸蛛在控制区持续输出。" },
  { id: "arachyr-chicken", classId: "witch-doctor", name: "魔牙愤怒鸡", set: "亚拉基尔 / 魔牙", core: "妖术", image: "/d3/library/skills/witch-doctor-active-hex.png", role: "速刷", difficulty: "低", purpose: "小秘境", content: ["T16小秘境", "悬赏"], summary: "愤怒鸡形态高速穿图，以爆炸和自动技能快速清场。" },
  { id: "zuni-darts", classId: "witch-doctor", name: "祖尼玛毒镖", set: "祖尼玛萨之魂", core: "毒液吹箭", image: "/d3/library/skills/witch-doctor-active-poison-dart.png", role: "冲层", difficulty: "中", summary: "鬼娃同步发射毒镖，角色攻击速度放大宠物弹幕。" },
  { id: "jade-harvest", classId: "witch-doctor", name: "玉魂收割", set: "玉魂师的战甲", core: "魂灵收割", image: "/d3/library/skills/witch-doctor-active-soul-harvest.png", role: "通用", difficulty: "高", summary: "先铺蚀魂与虫群，再用魂灵收割提前结算持续伤害。" },
  { id: "helltooth-garg", classId: "witch-doctor", name: "魔牙巨尸", set: "魔牙战装", core: "巨尸", image: "/d3/library/skills/witch-doctor-active-gargantuan.png", role: "通用", difficulty: "中", summary: "死亡之壁建立套装增伤，巨尸负责近战持续输出。" },
  { id: "lod-barrage", classId: "witch-doctor", name: "梦遗魂弹", set: "梦之遗礼", core: "魂灵弹幕", image: "/d3/library/skills/witch-doctor-active-spirit-barrage.png", role: "冲层", difficulty: "高", summary: "散件版本保留魂灵弹幕结算机制，以远古装备换上限。" },

  { id: "tal-meteor", classId: "wizard", name: "塔拉夏陨石", set: "塔拉夏的法理", core: "陨石术", image: "/d3/library/skills/wizard-active-meteor.png", role: "通用", difficulty: "中", summary: "轮流触发四系元素叠层，再由陨石完成持续轰炸。" },
  { id: "lod-meteor", classId: "wizard", name: "梦遗陨石", set: "梦之遗礼", core: "陨石术", image: "/d3/library/skills/wizard-active-meteor.png", role: "冲层", difficulty: "高", summary: "散件提供资源、护盾与陨石乘区，装备质量要求更高。" },
  { id: "firebird-eb", classId: "wizard", name: "火鸟爆炸冲击", set: "火鸟的华服", core: "爆炸冲击", image: "/d3/library/skills/wizard-active-explosive-blast.png", role: "通用", difficulty: "中", summary: "点燃目标后用非引导火焰技能触发燃烧伤害。" },
  { id: "delsere-twister", classId: "wizard", name: "德尔西尼旋风", set: "德尔西尼的杰作", core: "能量气旋", image: "/d3/library/skills/wizard-active-energy-twister.png", role: "冲层", difficulty: "高", summary: "时间延缓形成战斗区，气旋在狭窄地形反复命中。" },
  { id: "vyr-archon", classId: "wizard", name: "维尔御法者", set: "维尔的神装", core: "御法者", image: "/d3/library/skills/wizard-active-archon.png", role: "冲层", difficulty: "高", summary: "变身内外循环叠层，御法者重叠阶段最为强势。" },
  { id: "typhon-hydra", classId: "wizard", name: "提丰多头蛇", set: "提丰的面纱", core: "多头蛇", image: "/d3/library/skills/wizard-active-hydra.png", role: "通用", difficulty: "低", summary: "多头蛇数量同时提供伤害与减伤，适合稳健推进。" },
  { id: "lod-orb", classId: "wizard", name: "梦遗冰封球", set: "梦之遗礼", core: "秘法光球", image: "/d3/library/skills/wizard-active-arcane-orb.png", role: "通用", difficulty: "中", summary: "控制光球爆点距离，让冰封球在目标位置达到最高命中。" },
];

// All catalog entries now resolve to the shared, fully interactive detail renderer.
BUILD_CATALOG.forEach((build) => { build.complete = true; });

export const SEASON_START_STEPS = [
  { time: "开赛前", title: "先完成一次大秘境", detail: "账号需要先解锁挑战秘境；不要在赛季开始前提前完成本周挑战秘境。" },
  { time: "0–5 分钟", title: "创建赛季角色并领取挑战秘境箱", detail: "进入冒险模式后领取；NS 本地时间不要随意修改，避免赛季与挑战秘境状态异常。" },
  { time: "5–12 分钟", title: "用金币与材料建立开荒底盘", detail: "升级铁匠、秘士，锻造可用武器；血岩只赌本职业低等级高收益部位。" },
  { time: "12–20 分钟", title: "黄装升级只选正确子类型", detail: "例如跑马盾必须升级“圣教军盾”，普通盾牌不会进入同一个传奇池。每个 BD 页都会标注准确底材。" },
  { time: "20–35 分钟", title: "拿卡奈魔方", detail: "传送赛斯切隆废墟，穿过长者圣殿到第三层取得魔方；有关键增伤即可立刻萃取。" },
  { time: "35–90 分钟", title: "连杀、奈非天秘境或悬赏练级", detail: "按职业强项选择；死灵尸爆最快，猎魔和武僧移动效率高，单人不必强行照搬组队路线。" },
  { time: "40级左右", title: "尝试制作降等的70级武器", detail: "先洗出控制类次要词缀，再把另一条次要词缀洗成“等级需求降低”；材料不足就跳过。" },
  { time: "70级", title: "完成赛季旅程第一至第四章", detail: "领取海德格的赠礼凑齐六件套；礼盒给领取时的职业，不要开错角色。" },
  { time: "成型前", title: "按槽位效率定向获取", detail: "低血岩成本部位先赌博；武器、副手和职业专属物优先黄装升级；套装重复件用魔盒转换。" },
  { time: "成型后", title: "速刷与冲层分成两套保存", detail: "军械库分别保存，避免换装漏技能、宝石或魔方；再开始远古、太古与卡德山强化。" },
];

export const STARTER_CLASSES = [
  { rank: 1, classId: "necromancer" as ClassId, title: "死灵法师", note: "尸爆练级快，低等级黄装升级池优秀；缺点是开荒期偏脆。" },
  { rank: 2, classId: "demon-hunter" as ClassId, title: "猎魔人", note: "机动性高，成型后速刷流派多；注意憎恨与戒律的双资源管理。" },
  { rank: 3, classId: "monk" as ClassId, title: "武僧", note: "位移流畅、组装容易，尹娜和正义体系很适合单人过渡。" },
  { rank: 4, classId: "barbarian" as ClassId, title: "野蛮人", note: "坚韧稳定、旋风痛割容易上手，开荒体验容错高。" },
];

export const CAMPAIGN_ACTS = [
  {
    act: "第一幕", zone: "新崔斯特姆", boss: "屠夫", color: "#9c6a36",
    story: "陨星击中新崔斯特姆大教堂。奈非天从营救凯恩开始，追查失忆的陌生人，并第一次正面击溃彼列与阿兹莫丹的黑暗盟友。",
    quests: [
      { name: "陨落之星", area: "新崔斯特姆 → 旧镇道路", route: "从城门清理复生尸群，进入旅店处理莉亚的异变，再沿旧镇道路前往大教堂。", objective: "找到迪卡·凯恩并开启大教堂传送点。" },
      { name: "凯恩的遗产", area: "大教堂花园 → 李奥瑞克密道", route: "跟随莉亚调查凯恩的研究，穿过苦难旷野边缘寻找凯恩的旧宅和秘密通道。", objective: "确认陨星落点与陌生人的身份线索。" },
      { name: "破碎的王冠", area: "悲泣荒原 → 被亵渎的墓穴", route: "在悲泣荒原搜寻三座墓穴；真正的墓穴深处存放骷髅王的王冠。", objective: "让铁匠海德格修复王冠，打开皇家墓室。" },
      { name: "黑狂君的统治", area: "大教堂深层 → 皇家墓室", route: "从大教堂继续向下，穿过刑牢与王室墓穴，使用王冠唤醒李奥瑞克。", objective: "击败骷髅王并进入陨星坑。" },
      { name: "陌生人的剑", area: "陨星坑 → 苦难旷野", route: "救出失忆的陌生人后分头寻找断剑碎片；先清理卡兹拉巢穴并追踪巫师会。", objective: "取得第一块剑刃并带回城镇。" },
      { name: "破碎之刃", area: "淹没神殿 → 战士之陵", route: "与盗贼林登会合，开启淹没神殿；完成两处勇士仪式后进入地下圣殿。", objective: "夺回第二块剑刃并揭开艾德莉亚的去向。" },
      { name: "沃萨姆末日", area: "沃萨姆", route: "乘船抵达燃烧的沃萨姆，沿村庄主路清理邪教徒并进入教堂地下室。", objective: "救出村民，追踪玛格妲与最后的剑刃。" },
      { name: "追踪巫师会", area: "苦难旷野 → 高地洞穴", route: "寻找卡兹拉法杖组件，修复法杖后打开高地封印，穿过南部高地追击巫师会。", objective: "进入李奥瑞克庄园，逼近被囚禁的陌生人。" },
      { name: "被囚禁的天使", area: "李奥瑞克庄园 → 苦痛刑牢", route: "从庄园进入苦痛刑牢三层，在屠夫刑房前清理精英与机关。", objective: "击败屠夫，救出陌生人并恢复泰瑞尔身份。" },
      { name: "返回新崔斯特姆", area: "新崔斯特姆", route: "与泰瑞尔、莉亚和商队成员逐一交谈，确认下一站前往卡尔蒂姆。", objective: "完成第一幕并启程横越沙漠。" },
    ],
  },
  {
    act: "第二幕", zone: "卡尔蒂姆", boss: "彼列", color: "#b38a42",
    story: "奈非天在卡尔蒂姆寻找黑灵魂石，与佐敦·库勒短暂合作；谎言之王彼列隐藏在皇室之中，操纵城市与难民。",
    quests: [
      { name: "沙漠阴影", area: "秘密营地 → 凄凉沙漠", route: "从秘密营地进入峡谷，救出被幻术围困的卡尔蒂姆铁狼并清理蛇人据点。", objective: "找到通往卡尔蒂姆的安全路线。" },
      { name: "通往奥卡纳斯之路", area: "黑谷矿坑 → 奥卡纳斯", route: "穿过矿坑和哨站，摧毁邪教徒的召唤仪式，进入被玛格妲控制的奥卡纳斯。", objective: "打开城门并追上玛格妲。" },
      { name: "血之城", area: "奥卡纳斯 → 女巫巢穴", route: "释放囚犯，寻找巢穴入口，在封闭竞技场中清理玛格妲的护卫。", objective: "击杀玛格妲，为凯恩复仇。" },
      { name: "皇室觐见", area: "卡尔蒂姆集市 → 皇宫", route: "护送莉亚进入皇宫，识破卫兵与皇室的谎言，在城内突围。", objective: "确认彼列已经渗透卡尔蒂姆权力核心。" },
      { name: "意外盟友", area: "下水道 → 秘密营地", route: "进入卡尔蒂姆下水道营救阿德莉亚，沿隐蔽水道躲开封锁。", objective: "让阿德莉亚协助寻找黑灵魂石。" },
      { name: "赫拉迪姆叛徒", area: "达厄古绿洲 → 远古水道", route: "在绿洲寻找佐敦·库勒的头颅，依次开启东西水道并取回他的血液。", objective: "复活佐敦·库勒，获得黑灵魂石位置。" },
      { name: "血与沙", area: "凄凉沙地 → 刺客地库", route: "在风沙中寻找两处档案馆入口，取得库勒身体所需的关键材料。", objective: "打开佐敦·库勒档案馆。" },
      { name: "黑灵魂石", area: "未知深境 → 库勒藏书馆", route: "穿过档案馆各层并激活暗影锁，在灵魂石大厅与复活的库勒决裂。", objective: "击败佐敦·库勒并取得黑灵魂石。" },
      { name: "清剿卡尔蒂姆", area: "卡尔蒂姆城", route: "从秘密营地反攻城内，保护难民并摧毁蛇人封锁，逐街推进到皇宫。", objective: "为对彼列的最终战打开道路。" },
      { name: "谎言之王", area: "皇宫", route: "识破彼列伪装，先处理蛇人军团，再应对彼列巨型形态的范围攻击。", objective: "击败彼列，将其灵魂封入黑灵魂石。" },
    ],
  },
  {
    act: "第三幕", zone: "巴斯廷要塞", boss: "阿兹莫丹", color: "#8c3f2f",
    story: "罪恶之王阿兹莫丹率地狱军团围攻巴斯廷要塞。奈非天从城墙反击到亚瑞特巨坑，一路摧毁攻城武器与罪恶核心。",
    quests: [
      { name: "围攻巴斯廷要塞", area: "要塞堡垒 → 城垛", route: "与泰瑞尔会合，登上城墙点燃五座信号火盆并击退攻城部队。", objective: "稳定要塞防线，恢复守军士气。" },
      { name: "扭转战局", area: "石垒 → 战场", route: "离开要塞进入战场，摧毁投石机和恶魔据点，救援被围困的士兵。", objective: "解除外墙持续受到的远程轰击。" },
      { name: "被攻破的要塞", area: "要塞下层", route: "从内部缺口进入地下三层，清除储藏区和兵营中的恶魔。", objective: "找到并封闭恶魔进入要塞的缺口。" },
      { name: "石中震颤", area: "要塞深层", route: "调查地下震动源，穿过被腐化的防御设施并保护工程人员。", objective: "阻止地狱军团从地底瓦解城堡。" },
      { name: "战争机器", area: "拉基斯路口 → 战场", route: "跨越战场摧毁弩炮和投石机，沿拉基斯长桥向地狱军阵推进。", objective: "切断阿兹莫丹的攻城火力与补给。" },
      { name: "攻城突击兽", area: "拉基斯长桥 → 深渊边缘", route: "穿过长桥上的连续攻势，在桥尾竞技场面对攻城突击兽。", objective: "击败攻城突击兽，进入亚瑞特巨坑。" },
      { name: "罪恶之心", area: "亚瑞特巨坑 → 罪恶之核", route: "逐层深入地狱裂隙，摧毁罪恶之心并进入核心大厅。", objective: "击败阿兹莫丹，将其封入黑灵魂石。" },
    ],
  },
  {
    act: "第四幕", zone: "高阶天堂", boss: "迪亚波罗", color: "#736493",
    story: "阿德莉亚利用莉亚与黑灵魂石复活迪亚波罗。高阶天堂陷落，奈非天必须恢复希望之光并攀登水晶圣拱。",
    quests: [
      { name: "高阶天堂的陷落", area: "钻石之门 → 天堂前厅", route: "跟随泰瑞尔进入高阶天堂，救援被围困的天使并穿过被腐化的前厅。", objective: "阻止迪亚波罗继续摧毁天堂防线。" },
      { name: "希望之光", area: "希望花园", route: "在希望花园上下层寻找伊瑟瑞尔，摧毁腐化地狱裂隙并解除拉卡诺斯封锁。", objective: "击败拉卡诺斯，救回希望大天使奥莉尔。" },
      { name: "塔尖之下", area: "水晶柱廊", route: "穿过银光高塔入口，清除恐惧幻象并依次登上高塔。", objective: "抵达水晶圣拱，准备面对万恶之源。" },
      { name: "万恶之源", area: "银光高塔 → 水晶圣拱", route: "在现实与恐惧领域间作战，处理分身和大范围火焰，最终返回圣拱。", objective: "击败迪亚波罗，使黑灵魂石坠落凡间。" },
    ],
  },
  {
    act: "第五幕", zone: "威斯特玛", boss: "马萨伊尔", color: "#52747b",
    story: "死亡天使马萨伊尔夺走黑灵魂石，并在威斯特玛收割人类灵魂。奈非天追入混沌界要塞，终结死亡军团。",
    quests: [
      { name: "威斯特玛的陷落", area: "威斯特玛城门 → 幸存者据点", route: "从城门救出幸存者，沿街区清理死亡侍女与收割者，建立临时据点。", objective: "找到幸存的赫拉迪姆并确认马萨伊尔目标。" },
      { name: "亡者之魂", area: "威斯特玛广场 → 地下墓园", route: "追踪被收割的灵魂进入墓园，摧毁灵魂熔炉并解救被囚禁者。", objective: "切断死亡军团在城内的灵魂来源。" },
      { name: "死亡先驱", area: "威斯特玛高地", route: "穿过贵族区和废弃宅邸，调查死亡侍女的召唤仪式。", objective: "击败厄杰尔，阻止城市继续被死亡之雾吞没。" },
      { name: "女巫", area: "血沼泽 → 科乌斯遗迹", route: "离开威斯特玛进入血沼泽，寻找符文石并开启被遗忘的遗迹。", objective: "击败阿德莉亚，结束她对莉亚与奈非天的背叛。" },
      { name: "混沌界要塞之门", area: "混沌界入口", route: "与泰瑞尔和奥莉尔会合，取得开启混沌界通道所需的灵魂指引。", objective: "进入永恒战场，追击马萨伊尔。" },
      { name: "永恒战场", area: "永恒战场 → 攻城前哨", route: "穿过天使与恶魔永战之地，解除攻城符文并启动攻城锤。", objective: "为攻破混沌界要塞建立前进基地。" },
      { name: "攻破要塞", area: "混沌界要塞", route: "护送攻城锤撞开要塞大门，进入要塞深层并击败守门者。", objective: "打开通往死亡领域核心的道路。" },
      { name: "死亡天使", area: "混沌界要塞核心", route: "进入灵魂之井，躲避死亡云雾与旋转灵魂，分阶段压制马萨伊尔。", objective: "击败马萨伊尔，释放黑灵魂石中的人类灵魂。" },
    ],
  },
];

export const LIBRARY_SECTIONS = [
  { id: "equipment", name: "装备库", count: 829, description: "传奇与套装装备，保留类型、品质、官方图标和原始页面。" },
  { id: "active", name: "主动技能库", count: 163, description: "七职业主动技能，关联职业、符文和官方技能图标。" },
  { id: "passive", name: "被动技能库", count: 131, description: "所有被动技能可参与 BD 联动图，不再只是文字标签。" },
  { id: "runes", name: "符文库", count: 815, description: "按技能与 A–E 符文键归档，保留官网繁中命名。" },
  { id: "gems", name: "宝石库", count: 177, description: "普通、传奇及赎罪之语等级变体，全部使用官方物品图标。" },
];
