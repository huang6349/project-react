import { withData } from '@/hofs';
import { safeRequest } from '@/utils';
import { isEmpty } from 'lodash-es';

export const queryPerm = () => (
  safeRequest.Get(`/api/perm/_items`)
);

export const dataPerm = () => (
  withData(() => queryPerm())
);

export const query = (id) => (
  safeRequest.Get(`/api/role/perm/${id}`)
);

export const data = (params) => (
  withData(() => {
    if (isEmpty(params?.id)) {
      return Promise.resolve(null);
    } else return query(params?.id);
  })
);

export default ({
  queryPerm,
  dataPerm,
  query,
  data,
});
