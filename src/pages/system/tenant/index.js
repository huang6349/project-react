import { useState, useRef } from 'react';
import { withResponse } from '@/hofs';
import { withAuth } from '@/hocs';
import { ProCard } from '@ant-design/pro-components';
import { TableDropdown } from '@ant-design/pro-components';
import { SysContainer } from '@/components';
import { SysProTList } from '@/components';
import { SysButton } from '@/components';
import { UserPane } from './user';
import { useAccess } from '@umijs/max';
import { useRequest } from 'alova/client';
import { history } from '@umijs/max';
import { eq } from 'lodash-es';
import { modal } from '@/hocs';
import qs from 'query-string';
import service from './service';
import columns from './columns';

const IndexPage = withAuth(() => {
  const [id, setSelectedRowKey] = useState();
  const actionRef = useRef();
  const formRef = useRef();
  const access = useAccess();

  const handleTListChange = () => ((selectedRowKey) => {
    setSelectedRowKey(selectedRowKey);
  });

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
      pathname: `/system/tenant/view`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleCreate = () => (() => {
    history.push({
      pathname: `/system/tenant/create`,
      search: qs.stringify({}),
    });
  });

  const handleUpdate = (record) => {
    history.push({
      pathname: `/system/tenant/update`,
      search: qs.stringify({
        id: record?.id,
      }),
    });
  };

  const handleDelete = (record) => {
    modal?.confirm({
      content: '您确认要执行删除操作吗',
      title: '删除提示',
      onOk: () => (
        removeById(record?.id)
      ),
    });
  };

  return (<SysContainer>
    <ProCard
      bordered={!0}
      split='vertical'>
      <ProCard
        className='min-h-[765px]'
        bordered={!1}
        colSpan='350px'>
        <SysButton
          className='mt-2'
          type='primary'
          block={!0}
          onClick={handleCreate()}
          disabled={!access?.$tenant$create}>
          新建
        </SysButton>
        <SysProTList
          rowKey='id'
          onTListChange={handleTListChange()}
          request={service.dataPage()}
          actionRef={actionRef}
          formRef={formRef}
          columns={columns({
            title: '操作',
            width: 35,
            dataIndex: 'option',
            fixed: 'right',
            valueType: 'option',
            hideInSearch: !0,
            hideInTable: !1,
            hideInDescriptions: !1,
            render: (_, record) => ([
              <TableDropdown
                key='action'
                onSelect={(key) => {
                  eq(key, 'editable') && handleUpdate(record);
                  eq(key, 'delete') && handleDelete(record);
                  eq(key, 'view') && handleView(record);
                }}
                menus={[{
                  key: 'editable',
                  name: '编辑',
                  disabled: !access?.$tenant$update,
                }, {
                  key: 'delete',
                  name: '删除',
                  disabled: !access?.$tenant$delete,
                }, {
                  key: 'view',
                  name: '详情',
                  disabled: !access?.$tenant$query,
                }]}
              />,
            ]),
          })}
        />
      </ProCard>
      <ProCard
        bordered={!1}
        ghost={!0}>
        <UserPane id={id} />
      </ProCard>
    </ProCard>
  </SysContainer>);
});

export default IndexPage;
