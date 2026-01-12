---
name: crud-development
description: |
  自动生成 CRUD 模块的代码文件，并更新权限和路由配置。

  适用场景：
  - 创建新的业务模块
  - 编写 columns、service、index、save、view
  - 前端 API 定义

  触发词：创建模块、新建页面、增删改查、CRUD、开发功能
---

# CRUD 开发技能

## 功能概述

自动生成 CRUD 模块的代码文件，并更新权限和路由配置。

## 交互步骤

### 第一步：读取现有配置（强制执行）

**在提问之前必须先读取以下文件**：

1. 读取 `config/routes.js` 了解现有路由结构
2. 读取 `@/access.js` 了解现有权限结构

**⚠️ 严格禁止**：在未读取上述文件之前，禁止向用户提出任何问题。

### 第二步：收集基础信息

**原则**：每次只问一个问题，按顺序逐一收集。

**🚫 严格禁止**：一次性列出所有问题让用户填写。

**✅ 正确做法**：用户回答一个问题后，再问下一个问题。

---

#### 信息收集顺序

| 阶段 | 问题                          | 存储变量        |
|----|-----------------------------|-------------|
| Q1 | 请输入功能模块名称（默认提示：user）：       | `permName`  |
|    | ⚠️ 如果名称以 `$` 开头，自动去掉 `$` 符号 |             |
| Q2 | 请输入菜单显示名称（默认提示：用户管理）：       | `menuName`  |
|    | ⚠️ 如果名称以"管理"结尾，自动去掉"管理"二字   |             |
| Q3 | 接口权限（默认提示：{permName}）：      | `apiPerm`   |
|    | ⚠️ 如果名称以 `@` 开头，自动去掉 `@` 符号 |             |
| Q4 | 接口路径（默认提示：{permName}）：      | `apiPath`   |
| Q5 | 路由路径（默认提示：{permName}）：      | `routePath` |
| Q6 | 路由目录（默认提示：{permName}）：      | `routeDir`  |
| Q7 | 需要保存页 save.js 吗？            | `needSave`  |
| Q8 | 需要详情页 view.js 吗？            | `needView`  |
| Q9 | 请输入菜单图标（Antd 图标组件名）：        | `menuIcon`  |

---

#### 交互方式

**🚫 禁止做法**：不要这样提问

```
请一次性填写以下信息：
1. 功能模块名称：
2. 菜单显示名称：
3. 接口权限：
...
```

**✅ 正确做法**：逐个提问，每问一个等待用户回答后再问下一个

**Q1-Q2、Q3-Q6、Q9**：直接弹出文本框，用户逐个填写

**Q7-Q8 使用 AskUserQuestion**：

- 选项1：「是」
- 选项2：「否」

---

#### 自动处理规则

**Q1 收集 permName 时**：

- 如果用户输入的名称以 `$` 开头，自动去掉 `$` 符号
- 例如：输入 `$user` → 存储为 `user`

**Q2 收集 menuName 时**：

- 如果用户输入的名称以"管理"结尾，自动去掉"管理"二字
- 例如：输入"用户管理" → 存储为"用户"

**Q3 收集 apiPerm 时**：

- 如果用户输入的名称以 `@` 开头，自动去掉 `@` 符号
- 例如：输入 `@user` → 存储为 `user`

**处理后的值用于**：

- 权限标识：`${permName}$query`、`${permName}$create` 等
- 路由名称中的权限字段
- 权限检查：`@{apiPerm}:query`、`@{apiPerm}:add` 等
- 路由名称：`{menuName}管理`
- 子路由名称：`新建{menuName}`、`编辑{menuName}`、`{menuName}详情`

#### 收集完成后的总结确认

所有问题回答完毕后，**必须**向用户展示收集到的信息摘要（展示处理后的 menuName）：

```
✅ 信息收集完成，请确认以下配置：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| 功能模块名称 | user | 权限标识和文件名 |
| 菜单显示名称 | 用户 | 菜单上显示的名称 |
| 接口权限 | user | 后端权限标识 |
| 接口路径 | user | 接口路径 |
| 路由路径 | user | URL 路径 |
| 路由目录 | user | 文件存放位置 |
| 保存页 | 否 | save.js |
| 详情页 | 否 | view.js |
| 菜单图标 | UserOutlined | |

是否确认开始生成代码？
- 输入「确认」或直接回车：开始生成
- 输入「修改」：重新填写指定项
```

---

### 第三步：生成代码文件

**模板来源**：`@/templates/code-patterns.md`

**生成规则**：

- 根据用户选择确定生成哪些文件
- 文件保存路径：`@/pages/{routeDir}/`
- **必须**替换所有模板中的变量占位符

**需生成的文件**：

| 文件         | 来源模板  | 条件            |
|------------|-------|---------------|
| columns.js | 列表列配置 | 必选            |
| service.js | 服务接口  | 必选            |
| index.js   | 列表页   | 必选            |
| save.js    | 保存页   | needSave=true |
| view.js    | 详情页   | needView=true |

---

### 第四步：修改权限配置

**模板来源**：`@/templates/code-patterns.md` → 权限配置

读取 `@/access.js`，在导出对象末尾添加权限配置。

**注意**：

- 不要删除现有配置
- 不要添加 import 语句（文件已有）
- 添加到导出对象内部，位于最后一个配置后面

---

### 第五步：修改路由配置

**模板来源**：`@/templates/code-patterns.md` → 路由配置

读取 `config/routes.js`，根据用户选择确定需要添加的路由结构：

| 场景                              | 路由结构      |
|---------------------------------|-----------|
| needSave=true && needView=true  | 完整路由结构    |
| needSave=true && needView=false | 仅列表页+save |
| needSave=false                  | 仅列表页      |

**注意**：

- 替换模板变量后再写入文件

---

## 变量替换速查表

**详见**：`@/templates/code-patterns.md` → 变量替换速查表

---

## 生成提示

代码生成完成后，向用户展示以下格式的完成报告：

```text
✅ {permName} 模块生成完成

📁 前端文件 (@/pages/{routeDir}/)
   ├── columns.js  列表列配置
   ├── service.js  服务接口
   ├── index.js    列表页
   ├── save.js     保存页    {needSave ? '✅' : '❌'}
   └── view.js     详情页    {needView ? '✅' : '❌'}

⚙️  权限配置 (@/access.js)
   ${permName}$query   @{apiPerm}:query
   ${permName}$create  @{apiPerm}:add
   ${permName}$update  @{apiPerm}:update
   ${permName}$delete  @{apiPerm}:delete

🔗 路由配置 (config/routes.js)
   /{routePath}          {menuName}管理
   /{routePath}/create   新建{menuName}
   /{routePath}/update   编辑{menuName}
   /{routePath}/view     {menuName}详情
```
