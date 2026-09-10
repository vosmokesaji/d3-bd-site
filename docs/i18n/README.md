# 网站 i18n 与客户端文本映射

默认 `zhCN`，支持 `zhTW`、`enUS`。网站设置保存语言、赛季和角色性别；语言 Cookie 用于服务端首屏，localStorage 用于原有设置及跨标签同步。正式运行只读取源码内的精选词库，不读取 `work/`，也不调用翻译服务。

## 正式文件

- `app/i18n/core.ts`：翻译、游戏实体名称、技能范围内的符文解析、数字属性与搜索。
- `app/i18n/I18nProvider.tsx`：React 上下文和 HTML 语言、Cookie、标题同步。
- `app/i18n/client-terms.json`：本站使用的 3,579 个客户端名称及界面术语，保留原始空值。
- `app/i18n/term-mappings.json`：2,353 件物品、294 个技能及其符文、旧图片路径和显示别名的稳定映射。
- `app/i18n/client-texts.json`：2,581 条完整描述、属性或经验证的组合文本；数值取自原站。
- `app/i18n/zhCN.json`、`zhTW.json`、`enUS.json`：应用文案。`manual.json` 保存人工编辑的覆盖；`site-terms.json` 是“冲层、速刷、低巅峰”等本站用语，均不声称是官方原文。
- `app/i18n/source-index.json`：原站文案到稳定 `app.<hash>` 键的索引。业务数据保留原始 ID、路由、关联和资源路径，在显示处本地化。
- `docs/i18n/translation-source-report.md`：按条数说明完整官方文本、官方术语、混合文案及本站重新翻译内容。

## 来源与匹配规则

官方文本来自本地提取的 PC 客户端：国服简中 2.8.1.101167，国际服繁中及英文 2.8.0.99920。提取素材及版本限制见 `work/d3-client-i18n-2026-09-08/README.md`。Switch 客户端尚未取得，因此全部 Switch 术语、效果与平台差异仍未核验。本次没有将 PC 数值或赛季配置更新到原站。

1. 物品优先用原始物品 ID，旧资源用能追溯至原物品 ID 的图片路径；技能用技能图片/内部 ID 对应 `Powers/<power>_name`。
2. 符文使用同一技能下的 `AttributeDescriptions/NameRune_<letter>#<power>`，不跨技能按同名匹配，也不再用名称哈希生成符文字母。旧页面“白骨脱臼”的字母 `b` 与名称、眩晕说明矛盾，已按官方该技能的精确名称对应 `c`（Dislocation）；原业务 ID 和选用符文含义保留。
3. 网站原始名称只有在所有带身份依据的本站实体都指向同一原始条目时，才用于正文中的别名替换。例如本站“克己/守心”按各自物品图片 ID 对应，不能反用台服同名字条来替换国服正文。证据见 `site-alias-evidence.json`。
4. 完整属性/描述只采用精确文本匹配，或除数字外完全相同的模板匹配。仅解析已知数值占位符，将原站已有的数值字符串绑定到相同公式标识；**不计算公式**。三语中的固定数字及公式标识不一致时拒绝匹配，防止跨版本更新效果。
5. 品质与物品类型按客户端 `ItemQuality/FormatString` 组合。原镜像 `armorWeapon` 的“防具”仅在确认为护甲物品的数值字段中改用 `HeroDetails/Armor` 标签，保留原数值。
6. 只去除明确的颜色和展示标记；未知 HTML、公式、占位符及测试标记不作为可展示客户端原文。React 以文本渲染，不使用客户端内容执行代码或注入 HTML。
7. `Number/` 只格式化原文已经写明的万、亿与码单位，例如 80万对应英文 800,000、25码对应 25 yards；这不是客户端公式计算。相邻英文术语自动保留词间空格。
8. 官方术语和数字先被保护后才翻译本站原创说明。英文使用用户已授权的 googletrans 批处理并辅以人工覆盖，简繁原创文案使用系统转换并辅以人工覆盖。机器译文仍需编辑润色；它们不是官方译文。`googletrans` 是非官方客户端，不是 Google Cloud Translation 官方 SDK，换用它不改变数据发送的授权要求。

## 如何新增或修订

- 组件内使用 `const {t, tr, entity} = useI18n()`。固定应用键用 `t(key, {0: value})`；保留原有数据结构的显示入口用 `tr(text)`；装备/技能名称用 `entity(record)`，符文用 `entity(skill, 'rune')`。不要用翻译后的名称作业务判断、路由或数据关联。
- **组合文案先译各部分再组合**。例如宝石列表应逐项 `entity({...socket, name: socket.label})` 后连接，不能把整串未登记的名称当成单个词条。
- 新的原创词条加入 `manual.json`（三语），运行文案收集及目录生成。已有 `app.<hash>` 由原始文案计算；只改译文不改键。`Site/` 引用是网站术语，`Items/`、`Powers/` 等引用是官方术语，两类来源分开。
- 新游戏实体先核对内部 ID 或图片原始 ID；确实需要的旧别名、旧图片、符文映射加入 `scripts/i18n/overrides.json` 并说明依据。不要通过相似中文名批量认领候选。
- 客户端来源标识始终是“表名 + 原始键”。`client-evidence.json` 记录版本与提取依据，`client-text-matches.json` 记录每条描述的原始键、候选、公式绑定和三语结果；`message-sources.json` 可找到应用词条的源文件。

维护时显式运行（构建不会运行这些步骤）：

```sh
node scripts/i18n/extract-client.mjs /path/to/client-material
node scripts/i18n/collect-messages.mjs
node scripts/i18n/match-client-text.mjs /path/to/client-material
swiftc -module-cache-path /tmp/d3-swift-module-cache scripts/i18n/convert-chinese.swift -o /tmp/d3-convert-chinese
node scripts/i18n/build-chinese.mjs /tmp/d3-convert-chinese
# 单独的维护环境安装 googletrans==4.0.2；发送文案前应具备对应授权。
python scripts/i18n/translate-messages.py --cache /path/to/translation-cache.json
npm run test:i18n
npm run typecheck
npm test
```

完整原始素材、第三方核对数据、翻译缓存和维护用 Python/Swift 环境都不进入前端包。正式源码和生成词库应一起评审提交。

## 缺失与待核对

详见 `review-queue.json`、`client-text-matches.json` 的 `ambiguous` 和 `translation-failures.json`。通用同名候选不会自动合并；实体名称优先使用身份映射。部分文字只有本站译文，不能由此反推它们已经与官方效果核对。

- 旧随从技能 `Powers/Scoundrel_Multishot_name` 在两份中文客户端缺失。显示本语言“译名待核对”及有来源的英文 Multishot，不拿另一个中文地区或别的技能补齐。
- 五组旧攻略符文尚不能唯一确认：蕾蔻巨石的战吼“蓄势待发”、九十蛮的威吓呐喊“恫吓”、阿克汉天谴“无情爆发”、罗兰横扫“电流扫击”、散件轰击的挑衅“蓄势待发”。保留配置，在界面明确显示本语言“符文待核对”，不擅自替换技能选择。
- 104 个通用别名存在跨条目/跨地区候选；其中 24 个由本站实体或已核对的明确场景解除，80 个通用别名仍不自动推断。能由本站实体身份解除的歧义另有 `site-alias-evidence.json`。71 个完整文本同名候选的三语结果不同，未自动认领为官方描述。
- 魔女护盾所用旧图片文件名含 erosion，说明与选择对应 Powered Shield；图像本身仍需另行视觉核对。Switch 的全部平台差异尚未核验。
- 新词缺失时显示本语言明确提示，不输出翻译键、null、公式，也不静默退回另一中文地区。新增内容应由测试拦截后补词。

## 验证

测试覆盖完整词库三语解析、全部物品/技能/符文映射、纸娃娃数字属性、宝石注释和孔数、多语言搜索、白骨脱臼旧字母冲突、英文残留中文、原站数值保留、全部主要页面及 51 个 BD 详情三语服务端渲染（含 title/alt/aria-label），以及原有表格导出、ZIP、取消和其他交互结构回归。实际执行结果及浏览器验证见 `validation.md`。
