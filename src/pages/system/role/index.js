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
      pathname: `/system/role/view`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleAuth = (record) => {
    history.push({
      pathname: `/system/role/auth`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/system/role/create`,
      search: qs.stringify({}),
    });
  });

  const handleUpdate = (record) => (() => {
    history.push({
      pathname: `/system/role/update`,
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
      name='角色信息'
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
            disabled={!access?.$role$update}>
            <>编辑</>
          </SysButton>,
          <SysButton
            key='delete'
            type='link'
            onClick={handleDelete(record)}
            disabled={!access?.$role$delete}>
            <>删除</>
          </SysButton>,
          <Divider
            key='divider'
            type='vertical' />,
          <TableDropdown
            key={'action'}
            onSelect={(key) => {
              eq(key, 'view') && handleView(record);
              eq(key, 'auth') && handleAuth(record);
            }}
            menus={[{
              key: 'view',
              name: '详情',
              disabled: !access?.$role$query,
            }, {
              key: 'auth',
              name: '授权',
              disabled: !access?.$role$auth,
            }]}
          />,
        ]),
      })}
      toolBarRender={() => ([
        <SysButton
          key='create'
          type='primary'
          onClick={handleCreate()}
          invisible={!access?.$role$create}>
          <>新建</>
        </SysButton>,
      ])} />
  </SysContainer>);
});

export default IndexPage;
