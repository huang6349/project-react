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
