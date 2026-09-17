import { useRef } from 'react';
import { eq } from 'lodash-es';
import qs from 'query-string';
import { Divider } from 'antd';
import { TableDropdown } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { useRequest } from 'alova/client';
import { history } from '@umijs/max';
import { withResponse } from '@/hofs';
import { withAuth } from '@/hocs';
import { modal } from '@/hocs';
import { SysContainer } from '@/components';
import { SysProTable } from '@/components';
import { SysButton } from '@/components';
import service from './service';
import columns from './columns';

// 组织管理员视角：在本组织下邀请成员并授权。
// 组织编号暂为固定值，待后端下发「主组织」后改为从会话取。
// 用字符串而非数字：雪花 ID 超出 Number.MAX_SAFE_INTEGER，转数字会丢精度。
const TENANT_ID = '108699815087000122';

const IndexPage = withAuth(() => {
  // State & Hooks
  const actionRef = useRef();
  const formRef = useRef();
  const access = useAccess();
  const tenantId = TENANT_ID;

  // 数据交互
  const {
    send: removeById,
  } = useRequest((id) => (
    service.removeById(id)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => (
    actionRef?.current?.reload()
  )));

  // 事件处理
  const handleView = (record) => {
    history.push({
      pathname: `/org/member/view`,
      search: qs.stringify({
        id: record?.id,
        tenantId,
      }),
    });
  };

  const handleAuth = (record) => {
    history.push({
      pathname: `/org/member/auth`,
      search: qs.stringify({
        id: record?.id,
        tenantId,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/org/member/create`,
      search: qs.stringify({
        tenantId,
      }),
    });
  });

  const handleUpdate = (record) => (() => {
    history.push({
      pathname: `/org/member/update`,
      search: qs.stringify({
        tenantId,
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

  // 渲染输出
  return (<SysContainer>
    <SysProTable
      rowKey='id'
      name='成员信息'
      params={{ tenantId }}
      request={service.dataPage()}
      scroll={{ x: 1310 }}
      cardBordered={!0}
      actionRef={actionRef}
      formRef={formRef}
      rowSelection={{}}
      columns={columns({
        title: '操作',
        width: 150,
        dataIndex: 'option',
        fixed: 'right',
        valueType: 'option',
        search: !1,
        hideInTable: !1,
        hideInDescriptions: !1,
        render: (_, record) => [
          <SysButton
            key='editable'
            type='link'
            disabled={!access?.$member$update}
            onClick={handleUpdate(record)}>
            编辑
          </SysButton>,
          <SysButton
            key='delete'
            type='link'
            disabled={!access?.$member$delete}
            onClick={handleDelete(record)}>
            删除
          </SysButton>,
          <Divider
            key='divider'
            type='vertical' />,
          <TableDropdown
            key='action'
            onSelect={(key) => {
              eq(key, 'view') && handleView(record);
              eq(key, 'auth') && handleAuth(record);
            }}
            menus={[{
              key: 'view',
              name: '详情',
              disabled: !access?.$member$query,
            }, {
              key: 'auth',
              name: '授权',
              disabled: !access?.$member$auth,
            }]}
          />,
        ],
      })}
      toolBarRender={() => [
        <SysButton
          type='primary'
          invisible={!access?.$member$create}
          onClick={handleCreate()}>
          邀请
        </SysButton>,
      ]}
    />
  </SysContainer>);
});

export default IndexPage;
