import { useRef } from 'react';
import { SysForm } from '@/components';
import { useQueries } from '@/hooks';
import service from './service';
import columns from './columns';
import styles from './index.scss';

const RolePane = () => {
  const queries = useQueries();
  const formRef = useRef();

  return (<SysForm
    className={styles['form']}
    bordered={!1}
    ghost={!0}
    submitter={!1}
    request={service.data(queries)}
    formRef={formRef}
    columns={columns()}
  />);
};

export default RolePane;
