import { useRef } from 'react';
import { withResponse } from '@/hofs';
import { SysForm } from '@/components';
import { message } from '@/components';
import { useRequest } from 'alova/client';
import { useQueries } from '@/hooks';
import service from './service';
import columns from './columns';
import styles from './index.scss';

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
    className={styles['form']}
    bordered={!1}
    ghost={!0}
    request={service.data(queries)}
    formRef={formRef}
    columns={columns()}
    onFinish={handleFinish()}
  />);
};

export default RoleForm;
