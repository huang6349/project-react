# 代码模式模板库

本文件包含项目通用的代码模式，供 Skills/Agents/Commands 引用。

---

## CRUD 模块模板

### 列表列配置

```text
// columns.js
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
  // 在此添加业务字段列配置
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

### 服务接口

```text
// service.js
import { withTable } from '@/hofs';
import { withData } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryPage = (params) => (
  safeRequest.Get(`/api/{apiPath}/_query/paging`, { params })
);

export const dataPage = () => (
  withTable((params) => queryPage(params))
);

export const queryById = (id) => id ? (
  safeRequest.Get(`/api/{apiPath}/${id}`)
) : null;

export const dataById = (id) => id ? (
  withData(() => queryById(id))
) : null;

export const fnById = () => (
  ({ id }) => queryById(id)
);

export const create = (data) => (
  safeRequest.Post(`/api/{apiPath}`, data)
);

export const update = (data) => (
  safeRequest.Put(`/api/{apiPath}`, data)
);

export const removeById = (id) => id ? (
  safeRequest.Delete(`/api/{apiPath}/${id}`)
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

### 列表页

```text
// index.js
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
      pathname: `/{routePath}/view`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/{routePath}/create`,
      search: qs.stringify({}),
    });
  });

  const handleUpdate = (record) => (() => {
    history.push({
      pathname: `/{routePath}/update`,
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
            disabled={!access?.${permName}$update}>
            <>编辑</>
          </SysButton>,
          <SysButton
            key='delete'
            type='link'
            onClick={handleDelete(record)}
            disabled={!access?.${permName}$delete}>
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
              disabled: !access?.${permName}$query,
            }]}
          />,
        ]),
      })}
      toolBarRender={() => ([
        <SysButton
          key='create'
          type='primary'
          onClick={handleCreate()}
          invisible={!access?.${permName}$create}>
          <>新建</>
        </SysButton>,
      ])} />
  </SysContainer>);
});

export default IndexPage;
```

### 保存表单

```text
// save.js（仅当用户选择需要时生成）
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

### 详情页

```text
// view.js（仅当用户选择需要时生成）
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

### 权限配置

```text
// access.js
export default ({ perms } = {}) => ({
  // ... 现有权限
  ${permName}$query: checkPerm(perms, '@{apiPerm}:query'),
  ${permName}$create: checkPerm(perms, '@{apiPerm}:add'),
  ${permName}$update: checkPerm(perms, '@{apiPerm}:update'),
  ${permName}$delete: checkPerm(perms, '@{apiPerm}:delete'),
  // ... 其他权限
});
```

### 路由配置

**完整路由结构**（当用户需要 save.js 和 view.js 时）：

```text
// routes.js
const ${permName} = [{
  path: '/{routePath}/create',
  component: '@/pages/{routeDir}/save',
  name: '新建{menuName}',
  access: '${permName}$create',
  hideInMenu: !0,
}, {
  path: '/{routePath}/update',
  component: '@/pages/{routeDir}/save',
  name: '编辑{menuName}',
  access: '${permName}$update',
  hideInMenu: !0,
}, {
  path: '/{routePath}/view',
  component: '@/pages/{routeDir}/view',
  name: '{menuName}详情',
  access: '${permName}$query',
  hideInMenu: !0,
}, {
  path: '/{routePath}',
  component: '@/pages/{routeDir}',
}];

const routes = [{
  // ... 现有路由
}, {
  path: '/{routePath}',
  name: '{menuName}管理',
  icon: '{menuIcon}',
  access: '${permName}',
  routes: ${permName,
}, {
  // ... 其他路由
}];
```

**仅列表页+save**（当用户需要 save.js 但不需要 view.js 时）：

```text
const ${permName} = [{
  path: '/{routePath}/create',
  component: '@/pages/{routeDir}/save',
  name: '新建{menuName}',
  access: '${permName}$create',
  hideInMenu: !0,
}, {
  path: '/{routePath}/update',
  component: '@/pages/{routeDir}/save',
  name: '编辑{menuName}',
  access: '${permName}$update',
  hideInMenu: !0,
}, {
  path: '/{routePath}',
  component: '@/pages/{routeDir}',
}];

const routes = [{
  // ... 现有路由
}, {
  path: '/{routePath}',
  name: '{menuName}管理',
  icon: '{menuIcon}',
  access: '${permName}',
  routes: ${permName},
}, {
  // ... 其他路由
}];
```

**仅列表页**（当用户不需要 save.js 和 view.js 时）：

```text
const routes = [{
  // ... 现有路由
}, {
  path: '/{routePath}',
  name: '{menuName}管理',
  icon: '{menuIcon}',
  access: '${permName}',
  component: '@/pages/{routeDir}',
}, {
  // ... 其他路由
}];
```

---

## 变量替换速查表

| 变量            | 使用场景 | 示例            |
|---------------|------|---------------|
| `{permName}`  | 功能权限 | `$user$query` |
| `{apiPerm}`   | 接口权限 | `@user:query` |
| `{apiPath}`   | 接口路径 | `/api/user`   |
| `{routePath}` | 路由路径 | `/user`       |
| `{routeDir}`  | 路由目录 | `/pages/user` |
| `{menuName}`  | 菜单名称 | 用户            |
| `{menuIcon}`  | 菜单图标 | UserOutlined  |
