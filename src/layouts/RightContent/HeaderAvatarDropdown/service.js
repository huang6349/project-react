import { safeRequest } from '@/utils';

// 切换会话默认租户，切完由调用方 refresh() 刷新
// 恒返回 Method：useRequest 的 handler 契约不接受 null
/** @param {string} tenantId */
export const switchTenant = (tenantId) => (
  safeRequest.Put(`/api/user/tenant`, { tenantId })
);

export default ({
  switchTenant,
});
