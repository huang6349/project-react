import { withUser } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryUser = withUser(() => user());

export const user = () => (
  safeRequest.Get(`/api/user/me`)
);
