import { withTable } from '@/hofs';
import { withData } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryPage = (params) => (
  safeRequest.Get(`/api/user/_query/paging`, { params })
);

export const dataPage = () => (
  withTable((params) => queryPage(params))
);

export const queryById = (id) => id ? (
  safeRequest.Get(`/api/user/${id}`)
) : null;

export const dataById = (id) => id ? (
  withData(() => queryById(id))
) : null;

export const fnById = () => (
  ({ id }) => queryById(id)
);

export const create = (data) => (
  safeRequest.Post(`/api/user`, data)
);

export const update = (data) => (
  safeRequest.Put(`/api/user`, data)
);

export const removeById = (id) => id ? (
  safeRequest.Delete(`/api/user/${id}`)
) : null;

export default ({
  queryPage,
  dataPage,
  queryById,
  dataById,
  fnById,
  create,
  update,
  removeById,
});
