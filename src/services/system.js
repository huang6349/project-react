import { withConfigs } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryConfigs = withConfigs(() => configs());

export const configs = () => (
  safeRequest.Get(`/api/system/configs`)
);
