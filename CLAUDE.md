# CLAUDE.md

本文档为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

基于 UMI 4.x 框架的 React 后台管理项目，使用 Ant Design 组件库。

## Skills 索引

| Skill            | 触发词                      | 说明                           |
|------------------|--------------------------|------------------------------|
| crud-development | 创建模块、新建页面、增删改查、CRUD、开发功能 | 自动生成 CRUD 模块的代码文件，并更新权限和路由配置 |
| git-gitignore    | gitignore                | 自动生成符合此代码库的 .gitignore 文件    |

## 架构

### 状态管理

- **Valtio**: 用于复杂组件的响应式代理状态
- **UMI Model**: 全局用户状态和权限管理

### 数据请求

- **Alova** (`@alova/adapter-axios`): 基于 `axios` 的请求库
- 使用 `@/utils/safeRequest.ts` 中的 `safeRequest` 封装
- Token 管理通过 `safeToken.ts`，使用 `localforage`

### 核心模式

**服务层** (`@/pages/*/service.js`):

```javascript
export const queryPage = (params) => (
  safeRequest.Get(`/api/xxx/_query/paging`, { params })
);

export const dataPage = () => (
  withTable((params) => queryPage(params))
);
```

**高阶函数** (`@/hofs/`):

- `withResponse()`: 处理响应结构，检查 `success` 标志
- `withTable()`: 封装表格 API，带分页处理
- `withData()`: 从响应中提取 `data`

**UI 组件**:

- `@/components/` 下 `Sys*` 前缀的组件（SysTable、SysForm、SysButton 等）
- 封装 Ant Design Pro 组件保持一致性

### 路由

- UMI 文件路由，配置在 `config/routes.js`
- 通过路由的 `access` 字段控制权限
- 使用 `history.push('/path')` 进行页面跳转

### 样式

- **Tailwind CSS**: 主要样式方案（配置在 `tailwind.config.js`）
- **SCSS Modules**: 页面级样式（如 `@/pages/*/index.scss`）
- **Ant Design 5.x**: UI 组件库
