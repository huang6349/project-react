import { safeRequest } from '@/utils';

export const authorize = (data) => (
  safeRequest.Post(`/api/authenticate`, data)
);

export default ({
  authorize,
});
