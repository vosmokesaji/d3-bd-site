# BD 校对交接入口

更新日期：2026-09-14

为避免执行规则、统计和游标在多份长文中重复并逐渐失真，本文件不再维护另一套交接说明。

后续执行模型只需完整阅读并持续更新：

- [BD 准确性整改执行任务](./bd-accuracy-execution-tasks.md)

该文档现在同时包含：

- 可直接复制给弱模型的提示词；
- 当前唯一工作游标与跨窗口恢复协议；
- Maxroll 优先、官方机制和独立来源交叉核对规则；
- 单套 BD 的机械执行 SOP；
- 全量验证命令、完成定义与禁止事项；
- 全部 TODO 队列、历史收口记录和最新审计基线。

项目边界见 [项目最终目标与差距记录](./project-goal-and-gap.md)，研究背景仍可按需查阅 [BD 内容准确性审计、资料源评估与验证计划](./bd-accuracy-research-and-validation-plan.md)，但它们都不是当前任务状态源。逐套事实与冲突以 [BD 证据档案索引](./bd-evidence/README.md) 为准。

当前交接点：D04 `h90-frenzy` 已收口为 `source-checked / platform-risk`；下一项是 D05 `firebird-eb`。主模型已按用户要求停止继续逐套校对，等待弱模型执行完毕后做最终验收。
