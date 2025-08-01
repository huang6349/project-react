import { withTable } from '@/hofs';
import { withData } from '@/hofs';
import { isEmpty } from 'lodash-es';
import { safeRequest } from '@/utils';

export const queryAssoc = (id) => id ? (
  safeRequest.Get(`/api/tenant/user/${id}/_assoc`)
) : null;

export const dataAssoc = (id) => id ? (
  withData(() => queryAssoc(id))
) : null;

export const queryUser = (params) => (
  safeRequest.Get(`/api/user/_items`, { params })
);

export const dataUser = () => (
  withData(({ keyWords: username }) => (
    isEmpty(username) ?
      Promise.resolve(null) :
      queryUser({ username })
  ))
);

export const queryPage = (params) => (
  safeRequest.Get(`/api/tenant/user/_query/paging`, { params })
);

export const dataPage = () => (
  withTable((params) => (
    isEmpty(params?.tenantId) ?
      Promise.resolve(null) :
      queryPage(params)
  ))
);

export const queryById = (id) => id ? (
  safeRequest.Get(`/api/tenant/user/${id}`)
) : null;

export const dataById = (id) => id ? (
  withData(() => queryById(id))
) : null;

export const fnById = () => (
  ({ id }) => queryById(id)
);

export const create = (data) => (
  safeRequest.Post(`/api/tenant/user`, data)
);

export const update = (data) => (
  safeRequest.Put(`/api/tenant/user`, data)
);

export const removeById = (id) => id ? (
  safeRequest.Delete(`/api/tenant/user/${id}`)
) : null;

export default ({
  queryAssoc,
  dataAssoc,
  queryUser,
  dataUser,
  queryPage,
  dataPage,
  queryById,
  dataById,
  fnById,
  create,
  update,
  removeById,
});
