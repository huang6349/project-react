import { withTenant } from '@/hofs';
import { withUser } from '@/hofs';
import { safeRequest } from '@/utils';

// 拉可切换组织并写入 safeTenant store
export const queryTenant = withTenant(() => (
  safeRequest.Get(`/api/user/tenant`)
));

// 拉当前用户并写入 safeUser store
export const queryUser = withUser(() => (
  safeRequest.Get(`/api/user/me`)
));
