import { withConfigs } from '@/hofs';
import { safeRequest } from '@/utils';

// 拉全局配置并写入 safeConfigs store
export const queryConfigs = withConfigs(() => (
  safeRequest.Get(`/api/system/configs`)
));
