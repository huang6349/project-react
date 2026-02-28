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

const IndexPage = withAuth(() => {
  // State & Hooks
  const actionRef = useRef();
  const formRef = useRef();
  const access = useAccess();

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
      pathname: `/system/perm/view`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/system/perm/create`,
      search: qs.stringify({}),
    });
  });

  const handleUpdate = (record) => (() => {
    history.push({
      pathname: `/system/perm/update`,
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

  // 渲染输出
  return (<SysContainer>
    <SysProTable
      rowKey='id'
      name='权限信息'
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
            onClick={handleUpdate(record)}
            disabled={!access?.$perm$update}>
            编辑
          </SysButton>,
          <SysButton
            key='delete'
            type='link'
            onClick={handleDelete(record)}
            disabled={!access?.$perm$delete}>
            删除
          </SysButton>,
          <Divider
            key='divider'
            type='vertical' />,
          <TableDropdown
            key='action'
            onSelect={(key) => {
              eq(key, 'view') && handleView(record);
            }}
            menus={[{
              key: 'view',
              name: '详情',
              disabled: !access?.$perm$query,
            }]}
          />,
        ],
      })}
      toolBarRender={() => [
        <SysButton
          key='create'
          type='primary'
          onClick={handleCreate()}
          invisible={!access?.$perm$create}>
          新建
        </SysButton>,
      ]} />
  </SysContainer>);
});

export default IndexPage;
