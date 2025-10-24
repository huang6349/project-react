import { withData } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryUser = withData(() => user());

export const user = () => (
  safeRequest.Get(`/api/user/me`)
);
