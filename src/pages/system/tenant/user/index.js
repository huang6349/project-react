import { useRef } from 'react';
import { withResponse } from '@/hofs';
import { TableDropdown } from '@ant-design/pro-components';
import { Divider } from 'antd';
import { Button } from 'antd';
import { SysProTable } from '@/components';
import { useAccess } from '@umijs/max';
import { useRequest } from 'alova/client';
import { history } from '@umijs/max';
import { eq } from 'lodash-es';
import { modal } from '@/hocs';
import qs from 'query-string';
import service from './service';
import columns from './columns';

export const UserPane = ({ id: tenantId }) => {
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
      pathname: `/system/tenant/user/view`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/system/tenant/user/create`,
      search: qs.stringify({
        tenantId,
      }),
    });
  });

  const handleUpdate = (record) => (() => {
    history.push({
      pathname: `/system/tenant/user/update`,
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

  return (<SysProTable
    rowKey='id'
    name='用户信息'
    params={{ tenantId }}
    request={service.dataPage()}
    scroll={{ x: 950 }}
    actionRef={actionRef}
    formRef={formRef}
    form={{ className: 'border-b' }}
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
        <Button
          key='editable'
          type='link'
          disabled={!access?.$tenant$update}
          onClick={handleUpdate(record)}>
          编辑
        </Button>,
        <Button
          key='delete'
          type='link'
          disabled={!access?.$tenant$delete}
          onClick={handleDelete(record)}>
          删除
        </Button>,
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
            disabled: !access?.$tenant$query,
          }]}
        />,
      ]),
    })}
    toolBarRender={() => ([
      <Button
        type='primary'
        onClick={handleCreate()}
        disabled={!access?.$tenant$create}>
        邀请
      </Button>,
    ])}
  />);
};
