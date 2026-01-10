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

## 使用方式

当用户需要创建新的业务模块时，使用此技能。

## 交互步骤

### 第一步：读取现有配置（强制执行）

**在提问之前必须先读取以下文件**：

1. 读取 `config/routes.js` 了解现有路由结构
2. 读取 `src/access.js` 了解现有权限结构

**⚠️ 严格禁止**：在未读取上述文件之前，禁止向用户提出任何问题。

### 第二步：收集基础信息

**原则**：每次只问一个问题，按顺序逐一收集。

**🚫 严格禁止**：一次性列出所有问题让用户填写。

**✅ 正确做法**：用户回答一个问题后，再问下一个问题。

---

#### 信息收集顺序

| 阶段 | 问题                             | 存储变量        |
|----|--------------------------------|-------------|
| Q1 | 请输入功能模块名（默认提示：user）：           | `permName`  |
|    | ⚠️ 如果名称以 `$` 开头，自动去掉 `$` 符号    |             |
| Q2 | 请输入菜单显示名称（默认提示：用户管理）：          | `menuName`  |
|    | ⚠️ 如果名称以"管理"结尾，自动去掉"管理"二字      |             |
| Q3 | 后端接口权限前缀（默认提示：#{permName}）：    | `apiPerm`   |
|    | ⚠️ 如果名称以 `@` 开头，自动去掉 `@` 符号    |             |
| Q4 | API 请求地址路径（默认提示：#{permName}）：  | `apiPath`   |
| Q5 | 路由路径（默认提示：#{permName}）：        | `routePath` |
| Q6 | pages 下目录路径（默认提示：#{permName}）： | `pageDir`   |
| Q7 | 需要新建/编辑页面 save.js 吗？           | `needSave`  |
| Q8 | 需要详情页面 view.js 吗？              | `needView`  |
| Q9 | 请输入菜单图标（Antd 图标组件名）：           | `menuIcon`  |

---

#### 交互方式

**🚫 禁止做法**：不要这样提问

```
请一次性填写以下信息：
1. 功能模块名：
2. 菜单显示名称：
3. 后端接口权限前缀：
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

- 权限标识：`$#{permName}$query`、`$#{permName}$create` 等
- 路由名称中的权限字段
- 权限检查：`@#{apiPerm}:query`、`@#{apiPerm}:add` 等
- 路由名称：`#{menuName}管理`
- 子路由名称：`新建#{menuName}`、`编辑#{menuName}`、`#{menuName}详情`

#### 收集完成后的总结确认

所有问题回答完毕后，**必须**向用户展示收集到的信息摘要（展示处理后的 menuName）：

```
✅ 信息收集完成，请确认以下配置：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| 功能模块名 | user | 权限标识和文件名 |
| 菜单显示名称 | 用户 | 菜单上显示的名称 |
| 接口权限前缀 | user | 后端权限标识 |
| API 请求地址 | user | 接口路径 |
| 路由路径 | user | URL 路径 |
| pages 目录 | user | 文件存放位置 |
| 新建/编辑页面 | 否 | save.js |
| 详情页面 | 否 | view.js |
| 菜单图标 | UserOutlined | |

是否确认开始生成代码？
- 输入「确认」或直接回车：开始生成
- 输入「修改」：重新填写指定项
```

---

### 第三步：生成代码文件

**生成规则**：

- 根据用户选择确定生成哪些文件
- 文件保存路径：`src/pages/#{pageDir}/`
- **必须**替换所有模板中的变量占位符

#### columns.js 模板

```
import { compact } from 'lodash-es';

const columns = (options) => compact([{
  title: '#序号',
  valueType: 'indexBorder',
  width: 80,
  dataIndex: 'index',
  fixed: 'left',
  hideInDescriptions: !0,
  hideInForm: !0,
  hideInSearch: !0,
}, {
  title: '数据编号',
  span: 3,
  width: 180,
  dataIndex: 'id',
  fixed: 'left',
  ellipsis: !0,
  copyable: !0,
  hideInDescriptions: !0,
  hideInSearch: !0,
  formItemProps: {
    hidden: !0,
  },
}, {
  // TODO: 在此添加业务字段列配置
  title: '字段名称',
  dataIndex: 'fieldName',
}, {
  title: '创建时间',
  width: 180,
  dataIndex: 'createTime',
  valueType: 'dateTime',
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
}, {
  title: '更新时间',
  width: 180,
  dataIndex: 'updateTime',
  valueType: 'dateTime',
  hideInForm: !0,
  hideInSearch: !0,
}, options]);

export default columns;
```

#### service.js 模板

```
import { withTable } from '@/hofs';
import { withData } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryPage = (params) => (
  safeRequest.Get(`/api/#{apiPath}/_query/paging`, { params })
);

export const dataPage = () => (
  withTable((params) => queryPage(params))
);

export const queryById = (id) => id ? (
  safeRequest.Get(`/api/#{apiPath}/${id}`)
) : null;

export const dataById = (id) => id ? (
  withData(() => queryById(id))
) : null;

export const fnById = () => (
  ({ id }) => queryById(id)
);

export const create = (data) => (
  safeRequest.Post(`/api/#{apiPath}`, data)
);

export const update = (data) => (
  safeRequest.Put(`/api/#{apiPath}`, data)
);

export const removeById = (id) => id ? (
  safeRequest.Delete(`/api/#{apiPath}/${id}`)
) : null;

export default {
  queryPage,
  dataPage,
  queryById,
  dataById,
  fnById,
  create,
  update,
  removeById,
};
```

#### index.js 模板

```
import { useRef } from 'react';
import { withResponse } from '@/hofs';
import { withAuth } from '@/hocs';
import { TableDropdown } from '@ant-design/pro-components';
import { Divider } from 'antd';
import { SysContainer } from '@/components';
import { SysProTable } from '@/components';
import { SysButton } from '@/components';
import { useAccess } from '@umijs/max';
import { useRequest } from 'alova/client';
import { history } from '@umijs/max';
import { eq } from 'lodash-es';
import { modal } from '@/hocs';
import qs from 'query-string';
import service from './service';
import columns from './columns';

const IndexPage = withAuth(() => {
  const actionRef = useRef();
  const formRef = useRef();
  const access = useAccess();

  const {
    send: removeById,
  } = useRequest((id) => (
    service.removeById(id)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => (
    actionRef?.current?.reload()
  )));

  const handleView = (record) => {
    history.push({
      pathname: `/#{routePath}/view`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/#{routePath}/create`,
      search: qs.stringify({}),
    });
  });

  const handleUpdate = (record) => (() => {
    history.push({
      pathname: `/#{routePath}/update`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  });

  const handleDelete = (record) => (() => {
    modal?.confirm({
      content: '您确认要执行删除操作吗',
      title: '删除提示',
      onOk: () => (
        removeById(record?.id)
      ),
    });
  });

  return (<SysContainer>
    <SysProTable
      rowKey='id'
      request={service.dataPage()}
      scroll={{ x: 1300 }}
      cardBordered={!0}
      actionRef={actionRef}
      formRef={formRef}
      rowSelection={{}}
      columns={columns({
        title: '操作',
        width: 138,
        dataIndex: 'option',
        fixed: 'right',
        valueType: 'option',
        search: !1,
        hideInTable: !1,
        hideInDescriptions: !1,
        render: (_, record) => ([
          <SysButton
            key='editable'
            type='link'
            onClick={handleUpdate(record)}
            disabled={!access?.$#{permName}$update}>
            <>编辑</>
          </SysButton>,
          <SysButton
            key='delete'
            type='link'
            onClick={handleDelete(record)}
            disabled={!access?.$#{permName}$delete}>
            <>删除</>
          </SysButton>,
          <Divider
            key='divider'
            type='vertical' />,
          <TableDropdown
            key={'action'}
            onSelect={(key) => {
              eq(key, 'view') && handleView(record);
            }}
            menus={[{
              key: 'view',
              name: '详情',
              disabled: !access?.$#{permName}$query,
            }]}
          />,
        ]),
      })}
      toolBarRender={() => ([
        <SysButton
          key='create'
          type='primary'
          onClick={handleCreate()}
          invisible={!access?.$#{permName}$create}>
          <>新建</>
        </SysButton>,
      ])} />
  </SysContainer>);
});

export default IndexPage;
```

#### save.js 模板（仅当用户选择需要时生成）

```
import { useRef } from 'react';
import { withAuth } from '@/hocs';
import { withResponse } from '@/hofs';
import { useNavigate } from '@umijs/max';
import { SysContainer } from '@/components';
import { SysForm } from '@/components';
import { useRequest } from 'alova/client';
import { useQueries } from '@/hooks';
import { isUndefined } from 'lodash-es';
import service from './service';
import columns from './columns';

const IndexPage = withAuth(() => {
  const navigate = useNavigate();
  const queries = useQueries();
  const formRef = useRef();

  const {
    send: create,
  } = useRequest((data) => (
    service.create(data)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => {
    navigate(-1);
  }));

  const {
    send: update,
  } = useRequest((data) => (
    service.update(data)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => {
    navigate(-1);
  }));

  const handleFinish = () => (values) => (
    isUndefined(values?.id) ?
      create(values) :
      update(values)
  );

  return (<SysContainer back={!0}>
    <SysForm
      request={service.dataById(queries?.id)}
      formRef={formRef}
      columns={columns()}
      onFinish={handleFinish()} />
  </SysContainer>);
});

export default IndexPage;
```

#### view.js 模板（仅当用户选择需要时生成）

```
import { withAuth } from '@/hocs';
import { SysDescriptions } from '@/components';
import { SysContainer } from '@/components';
import { useQueries } from '@/hooks';
import service from './service';
import columns from './columns';

const IndexPage = withAuth(() => {
  const queries = useQueries();

  return (<SysContainer back={!0}>
    <SysDescriptions
      title='基本信息'
      params={{ id: queries?.id }}
      request={service.fnById()}
      columns={columns()} />
  </SysContainer>);
});

export default IndexPage;
```

### 第四步：修改 access.js

读取 `src/access.js`，在导出对象末尾添加权限配置：

```
  $#{permName}$query: checkPerm(perms, '@#{apiPerm}:query'),
  $#{permName}$create: checkPerm(perms, '@#{apiPerm}:add'),
  $#{permName}$update: checkPerm(perms, '@#{apiPerm}:update'),
  $#{permName}$delete: checkPerm(perms, '@#{apiPerm}:delete'),
```

**注意**：

- 不要删除现有配置
- 不要添加 import 语句（文件已有）
- 添加到导出对象内部，位于最后一个配置后面

### 第五步：修改路由配置

读取 `config/routes.js`，根据用户选择确定需要添加的路由：

**完整路由结构**（当用户需要 save.js 和 view.js 时）：

```
const $#{permName} = [{
  path: '/#{routePath}/create',
  component: '@/pages/#{pageDir}/save',
  name: '新建#{menuName}',
  access: '$#{permName}$create',
  hideInMenu: !0,
}, {
  path: '/#{routePath}/update',
  component: '@/pages/#{pageDir}/save',
  name: '编辑#{menuName}',
  access: '$#{permName}$update',
  hideInMenu: !0,
}, {
  path: '/#{routePath}/view',
  component: '@/pages/#{pageDir}/view',
  name: '#{menuName}详情',
  access: '$#{permName}$query',
  hideInMenu: !0,
}, {
  path: '/#{routePath}',
  component: '@/pages/#{pageDir}',
}];

const routes = [{
  // ... 现有路由
}, {
  path: '/#{routePath}',
  name: '#{menuName}管理',
  icon: '#{menuIcon}',
  access: '$#{permName}',
  routes: $#{permName},
}, {
  // ... 其他路由
}];
```

**仅列表页+save**（当用户需要 save.js 但不需要 view.js 时）：

```
const $#{permName} = [{
  path: '/#{routePath}/create',
  component: '@/pages/#{pageDir}/save',
  name: '新建#{menuName}',
  access: '$#{permName}$create',
  hideInMenu: !0,
}, {
  path: '/#{routePath}/update',
  component: '@/pages/#{pageDir}/save',
  name: '编辑#{menuName}',
  access: '$#{permName}$update',
  hideInMenu: !0,
}, {
  path: '/#{routePath}',
  component: '@/pages/#{pageDir}',
}];

const routes = [{
  // ... 现有路由
}, {
  path: '/#{routePath}',
  name: '#{menuName}管理',
  icon: '#{menuIcon}',
  access: '$#{permName}',
  routes: $#{permName},
}, {
  // ... 其他路由
}];
```

**仅列表页**（当用户不需要 save.js 和 view.js 时）：

```
const routes = [{
  // ... 现有路由
}, {
  path: '/#{routePath}',
  name: '#{menuName}管理',
  icon: '#{menuIcon}',
  access: '$#{permName}',
  component: '@/pages/#{pageDir}',
}, {
  // ... 其他路由
}];
```

**注意**：

- 替换模板变量后再写入文件

## 变量替换速查表

| 变量             | 说明        | 用户输入示例         | 生成的代码示例        |
|----------------|-----------|----------------|----------------|
| `#{permName}`  | 功能模块名     | `user`         | `user`         |
| `#{apiPerm}`   | 接口权限名     | `user`         | `user`         |
| `#{apiPath}`   | API 请求地址  | `user`         | `user`         |
| `#{routePath}` | 路由路径      | `user`         | `user`         |
| `#{pageDir}`   | pages 下目录 | `user`         | `user`         |
| `#{menuName}`  | 菜单显示名称    | `用户管理`         | `用户`           |
| `#{menuIcon}`  | 菜单图标      | `UserOutlined` | `UserOutlined` |

## 完整交互示例

```
用户：创建用户管理模块

助手：
好的，我来帮你创建用户管理模块。

【Q1/9】请输入功能模块名（默认提示：user）：

用户：user

---

【Q2/9】请输入菜单显示名称（默认提示：用户管理）：

用户：用户管理

助手：
✓ 已自动去掉"管理"二字，最终使用：用户

---

【Q3/9】后端接口权限前缀（默认提示：user）：

用户：user

---

【Q4/9】API 请求地址路径（默认提示：user）：

用户：user

---

【Q5/9】路由路径（默认提示：user）：

用户：user

---

【Q6/9】pages 下目录路径（默认提示：user）：

用户：user

---

【Q7/9】需要新建/编辑页面 save.js 吗？

用户选择：否

---

【Q8/9】需要详情页面 view.js 吗？

用户选择：否

---

【Q9/9】请输入菜单图标（Antd 图标组件名）：

用户：TeamOutlined

助手：
✅ 信息收集完成，请确认以下配置：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| 功能模块名 | user | 权限标识和文件名 |
| 菜单显示名称 | 用户 | 菜单上显示的名称 |
| 接口权限前缀 | user | 后端权限标识 |
| API 请求地址 | user | 接口路径 |
| 路由路径 | user | URL 路径 |
| pages 目录 | user | 文件存放位置 |
| 新建/编辑页面 | 否 | save.js |
| 详情页面 | 否 | view.js |
| 菜单图标 | TeamOutlined | |

是否确认开始生成代码？
- 输入「确认」或直接回车：开始生成
- 输入「修改」：重新填写指定项

用户：确认

助手：
正在生成代码文件...
```
