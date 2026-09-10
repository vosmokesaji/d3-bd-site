# BD 表格视图

参考用户提供的微信群攻略图，仅采用「部位 / 装备 / 优先词缀 / 镶嵌」及技能、萃取、输出手法的信息关系，不复制广告和群信息。沿用站内游戏素材、黑铁表面、金色边框与套装绿。详情页配置栏内增加视图切换，表格处于配置栏后的普通文档流，替代原装备盘等详情模块；保持相同内容边界。

单张导出固定 1440 CSS px、2 倍像素 PNG，使用与页面相同的表格组件，完整保留长文和当前随从。全量导出覆盖目录内全部职业全部 BD（有多套配装时逐套包含），采用每个 BD 的默认用途、低巅峰、推荐随从，按职业分文件夹 ZIP；进度、取消、失败报告与重新下载均可见。赛季跟随当前设置。尚未校对的差异继续标注，不编造配置。

## UI Mapping

无已有 design-tokens 或 OpenSpec 目录。已检查详情页、BuildCommandDeck、BuildAbilitiesPanel、FollowerShowcase 与 globals.css；新表格关系没有对应组件，局部排版值标为 inferred，颜色和基础文字优先复用全局 token。以下采用值实现于 components/build/BuildTableView.tsx 和 build-table.css；实现前 planned，完成后按末尾 Verify 更新。

| UI ID | 属性 | evidenceType | 直接证据 / sourceValue | adoptedValue / implementationValue | 级别 | 核对方式 |
|---|---|---|---|---|---|---|
| UI-LAYOUT-01 | 插入与定位 | source | app/page.tsx UnifiedBuildDetail 配置栏后的 workbench，普通流 | 同位置切换表格，grid-column 1 / -1，grid-row 4 / 同采用值（已实现） | core | SSR 与结构检查 |
| UI-LAYOUT-02 | 宽度 | inferred | N/A；新密集表格 | 页面 100%，表格 min-width 1080px，导出 1440px / 同采用值（已实现） | core | 宽屏及窄屏横向滚动 |
| UI-LAYOUT-03 | 高度 | inferred | N/A；长文本不得截断 | auto / 同采用值（已实现） | core | 长文自适应 |
| UI-LAYOUT-04 | 分栏 | inferred | N/A；参考图装备与手法相邻 | 装备 2.15fr、侧栏 .85fr / 同采用值（已实现） | core | 表格与侧栏顶对齐 |
| UI-LAYOUT-05 | 内边距 | explicit | 用户要求导出图减少无效留白 | 页头 14px 18px，单元格 5px 8px，分区 7px 10px / 同采用值（已实现） | core | 对齐与可读性 |
| UI-LAYOUT-06 | 间距 | explicit | 用户要求更紧凑并保持层次 | 图文 gap 7px，控制区 gap 6px / 同采用值（已实现） | warning | 图文不重叠 |
| UI-SURFACE-01 | 背景 | source | globals.css :root --ink #07090a | var(--ink) / 同采用值（已实现） | warning | 实现检查 |
| UI-SURFACE-02 | 边框 | source | globals.css :root --line rgba(170,139,84,.27) | 1px solid var(--line) / 同采用值（已实现） | warning | 实现检查 |
| UI-SURFACE-03 | 圆角 | inferred | N/A；暗黑三硬质表格 | 0 / 同采用值（已实现） | warning | 无圆角卡片 |
| UI-SURFACE-04 | 阴影 | inferred | N/A；框内金属包边 | inset 0 0 0 3px #07090a, inset 0 0 0 4px var(--line) / 同采用值（已实现） | warning | 导出包含内框 |
| UI-TYPOGRAPHY-01 | 正文字号 | source | globals.css :root --text-body-size 16px | 16px / 同采用值（已实现） | core | 不通过缩放减小字体 |
| UI-TYPOGRAPHY-02 | 表格字号 | source | globals.css :root --text-small-size 14px | 14px / 同采用值（已实现） | core | 长装备名换行 |
| UI-TYPOGRAPHY-03 | 行高 | explicit | 用户要求次要信息更紧凑 | 主表 1.45，次要说明 1.35–1.4 / 同采用值（已实现） | warning | 实现检查 |
| UI-TYPOGRAPHY-04 | 字重 | inferred | N/A；标题强于说明 | 标题 600、正文 400 / 同采用值（已实现） | warning | 实现检查 |
| UI-TYPOGRAPHY-05 | 文本颜色 | source | globals.css :root --parchment #d4c5a8，--gold-bright #f0d28b | 正文 parchment，标题 gold-bright / 同采用值（已实现） | warning | 实现检查 |
| UI-TYPOGRAPHY-06 | 品质颜色 | inferred | N/A；D3 套装绿、传奇橙、稀有黄 | #83cf60 / #e9ad61 / #efe16f / 同采用值（已实现） | core | 同时显示品质文字 |
| UI-TYPOGRAPHY-07 | 对齐 | inferred | N/A；装备扫描表 | 左对齐、单元格垂直居中 / 同采用值（已实现） | warning | 表头和内容对齐 |
| UI-TYPOGRAPHY-08 | 换行溢出 | inferred | N/A；完整攻略和导出要求 | overflow-wrap anywhere，无省略，外层 overflow-x auto / 同采用值（已实现） | core | 长文不截断 |
| UI-ASSET-01 | 游戏素材 | explicit | 用户要求有图则图文；public/d3 现有素材 | 装备 / 宝石 / 技能 / 被动 / 萃取复用真实图；符文只用已知映射，否则通用符文标记 / 同采用值（已实现） | core | 所有素材路径存在性检查 |
| UI-ASSET-02 | 图片尺寸 | explicit | 用户要求导出图减少留空 | 30×36 装备框、28×28 技能、20×20 宝石 / 同采用值（已实现） | warning | contain 不变形 |
| UI-INTERACTION-01 | 视图 | explicit | 用户要求新增 BD 表格视图 | 配置栏按钮切换，aria-pressed / 同采用值（已实现） | core | SSR table 参数 |
| UI-INTERACTION-02 | 随从 | explicit | 魔女 / 盗贼 / 圣殿骑士切换 | 同一表格更新装备与技能 / 同采用值（已实现） | core | 三随从分别渲染 |
| UI-INTERACTION-03 | 导出 | explicit | 当前 / 全部 BD 图片 | 单 PNG / 职业目录 ZIP、进度、取消、失败报告 / 同采用值（已实现） | core | 导出任务与 ZIP 数据检查 |
| UI-INTERACTION-04 | 状态 | inferred | N/A；异步图片生成 | 导出禁用重复操作，aria-live 反馈，完成保留下载链接 / 同采用值（已实现） | core | 卸载与取消清理 |

## Verify

最终生产构建成功，63 项测试全部通过（含表格导出和三语渲染）。

- 7 个职业、51 个 BD 全部纳入导出队列，名称去重，装备、6 主动技能、4 被动技能、萃取和输出手法完整性检查通过。
- 三名随从分别静态渲染通过；全部表格引用的 img 本地路径存在。未知符文映射使用中性通用标记，未用哈希随机指定符文。
- 页面及导出共用 resolveDetailData 与 BuildTableSheet；三槽赛季过滤、全部 ZIP 文件条目、部分失败报告、取消后清理检查通过。
- 导出测试替换了 DOM 到 PNG 的浏览器边界，验证实际队列与 ZIP 字节。另在 1280px 浏览器视口检查英文表格首屏和底部输出循环，确认主次层级、三列/双列自适应及长文换行；检查中发现两位步骤号会被拆行，已增加固定宽度和禁止断行规则。
- 本地预览 `/builds/tragoul-nova?view=table` 返回 HTTP 200；表格在页面中保持横向滚动，导出仍固定 1440 CSS px、2 倍像素。
- 全仓 TypeScript 检查通过。
- 新增导出模块与表格模块 ESLint 无错误；保留原生 img 以适配本地游戏素材和 DOM 导出（Next 图片优化提示属 warning）。

补充映射：摘要并入页头，标题保持 27px，装备/技能名称和关键信息保持明亮；词缀、使用说明、随从理由和循环补充说明使用 12–13px 与较暗的灰褐色。输出循环宽屏每行三项，最后两项自动各占半行，最后一项自动占满，减少空白。UI-INTERACTION-03 离屏宿主 absolute left:-100000px top:0 width:1440px，aria-hidden、不参与页面布局、finally 清理。所有新增 CSS 限定在 bd-sheet / bd-table 前缀下。

导出库依据：[html-to-image](https://github.com/bubkoo/html-to-image) 的 toBlob、pixelRatio 和 fetchRequestInit；[fflate](https://github.com/101arrowz/fflate) 的 zipSync 和 UTF-8 文件名。PNG 已压缩，ZIP 使用 STORE，避免重复压缩。
