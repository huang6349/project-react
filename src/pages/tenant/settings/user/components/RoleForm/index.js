import { useRef } from 'react';
import { useRequest } from 'alova/client';
import { useQueries } from '@/hooks';
import { withResponse } from '@/hofs';
import { message } from '@/hocs';
import { SysForm } from '@/components';
import service from './service';
import columns from './columns';

const RoleForm = () => {
  const queries = useQueries();
  const formRef = useRef();

  const {
    send: update,
  } = useRequest((data) => (
    service.update(data)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => {
    message.success('授权成功');
  }));

  const handleFinish = () => (values) => (
    update(values)
  );

  return (<SysForm
    bordered={!1}
    ghost={!0}
    request={service.data(queries)}
    formRef={formRef}
    columns={columns()}
    onFinish={handleFinish()}
  />);
};

export default RoleForm;
