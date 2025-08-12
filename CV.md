# cv 工程师

## 修改 access.js

```js
export default ({ perm } = {}) => ({
  ...,
  $[权限]: checkPerm(perm, '@[权限]:query'),
  $[权限]$query: checkPerm(perm, '@[权限]:query'),
  $[权限]$create: checkPerm(perm, '@[权限]:add'),
  $[权限]$update: checkPerm(perm, '@[权限]:update'),
  $[权限]$delete: checkPerm(perm, '@[权限]:delete'),
});
```

## 新建 columns.js

```js
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
  title: '@数据编号',
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
  ...,
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

## 新建 service.js

```js
import { withTable } from '@/hofs';
import { withData } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryPage = (params) => (
  safeRequest.Get(`/api/[地址]/_query/paging`, { params })
);

export const dataPage = () => (
  withTable((params) => queryPage(params))
);

export const queryById = (id) => id ? (
  safeRequest.Get(`/api/[地址]/${id}`)
) : null;

export const dataById = (id) => id ? (
  withData(() => queryById(id))
) : null;

export const fnById = () => (
  ({ id }) => queryById(id)
);

export const create = (data) => (
  safeRequest.Post(`/api/[地址]`, data)
);

export const update = (data) => (
  safeRequest.Put(`/api/[地址]`, data)
);

export const removeById = (id) => id ? (
  safeRequest.Delete(`/api/[地址]/${id}`)
) : null;

export default ({
  queryPage,
  dataPage,
  queryById,
  dataById,
  fnById,
  create,
  update,
  removeById,
});
```

## 新建 index.js

```js
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
      pathname: `/[路由]/view`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/[路由]/create`,
      search: qs.stringify({}),
    });
  });

  const handleUpdate = (record) => (() => {
    history.push({
      pathname: `/[路由]/update`,
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
            disabled={!access?.$[权限]$update}>
            <>编辑</>
          </SysButton>,
          <SysButton
            key='delete'
            type='link'
            onClick={handleDelete(record)}
            disabled={!access?.$[权限]$delete}>
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
              disabled: !access?.$[权限]$query,
            }]}
          />,
        ]),
      })}
      toolBarRender={() => ([
        <SysButton
          key='create'
          type='primary'
          onClick={handleCreate()}
          invisible={!access?.$[权限]$create}>
          <>新建</>
        </SysButton>,
      ])} />
  </SysContainer>);
});

export default IndexPage;
```

## 新建 save.js

```js
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

## 新建 view.js

```js
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

## 修改 routes.js

```js
const $[路由] = [{
  path: '/[路由]/create',
  component: '@/pages/[文件]/save',
  name: '新建[]',
  access: '$[权限]$create',
  hideInMenu: !0,
}, {
  path: '/[路由]/update',
  component: '@/pages/[文件]/save',
  name: '编辑[]',
  access: '$[权限]$update',
  hideInMenu: !0,
}, {
  path: '/[路由]/view',
  component: '@/pages/[文件]/view',
  name: '[]详情',
  access: '$[权限]$query',
  hideInMenu: !0,
}, {
  path: '/[路由]',
  component: '@/pages/[文件]',
}];

const routes = [{
  ...,
}, {
  path: '/[路由]',
  name: '[]管理',
  icon: '[图标]',
  access: '$[权限]',
  routes: $[路由],
}, {
  ...,
}];
```
