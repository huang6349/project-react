import { withData } from '@/hofs';
import { isEmpty } from 'lodash-es';
import { safeRequest } from '@/utils';

export const queryRole = () => (
  safeRequest.Get(`/api/role/_items`)
);

export const dataRole = () => (
  withData(() => queryRole())
);

export const query = (params) => (
  safeRequest.Get(`/api/user/role`, { params })
);

export const data = (params) => (
  withData(() => {
    if (isEmpty(params?.tenantId)) {
      return Promise.resolve(null);
    } else if (isEmpty(params?.id)) {
      return Promise.resolve(null);
    } else return query(params);
  })
);

export default ({
  queryRole,
  dataRole,
  query,
  data,
});
