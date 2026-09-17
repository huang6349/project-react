import { withData } from '@/hofs';
import { isEmpty } from 'lodash-es';
import { safeRequest } from '@/utils';

export const queryPerm = () => (
  safeRequest.Get(`/api/perm/_items`)
);

export const dataPerm = () => (
  withData(() => queryPerm())
);

export const query = (params) => (
  safeRequest.Get(`/api/user/perm/_all`, { params })
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
  queryPerm,
  dataPerm,
  query,
  data,
});
