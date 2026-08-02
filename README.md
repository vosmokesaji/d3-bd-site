# 圣休亚瑞秘典

面向 Nintendo Switch 玩家、以第 39 赛季为当前基准的《暗黑破坏神 III》单人攻略站。

项目包含七职业 49 套 BD、赛季开荒、五幕剧情路线和本地化官方物品资料库。BD 详情使用统一数据模型，图形化展示装备、技能、符文、被动、卡奈魔方、套装效果和实战手法之间的联动。

## 本地运行

要求 Node.js `>= 22.13.0`。

```bash
npm install
npm run dev -- --port 3001
```

完整验证：

```bash
npm test
```

## 项目文档

- [文档总览](./docs/README.md)
- [技术架构](./docs/architecture.md)
- [数据模型](./docs/data-model.md)
- [数据采集与更新](./docs/data-pipeline.md)
- [开发与维护指南](./docs/development-guide.md)

