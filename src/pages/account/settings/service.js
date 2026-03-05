import { safeRequest } from '@/utils';

export const update = (data) => (
  safeRequest.Put(`/api/user/password`, data)
);

export default ({
  update,
});
