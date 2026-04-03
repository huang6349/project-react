import { withTable } from '@/hofs';
import { withData } from '@/hofs';
import { isEmpty } from 'lodash-es';
import { safeRequest } from '@/utils';

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

export const queryAssoc = (id) => id ? (
  safeRequest.Get(`/api/tenant/user/${id}/_assoc`)
) : null;

export const dataAssoc = (id) => id ? (
  withData(() => queryAssoc(id))
) : null;

export const queryPage = (params) => (
  safeRequest.Get(`/api/tenant/user/_query/paging`, { params })
);

export const dataPage = () => (
  withTable((params) => (
    params?.tenantId ?
      queryPage(params) :
      Promise.resolve(null)
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
  queryUser,
  dataUser,
  queryAssoc,
  dataAssoc,
  queryPage,
  dataPage,
  queryById,
  dataById,
  fnById,
  create,
  update,
  removeById,
});
