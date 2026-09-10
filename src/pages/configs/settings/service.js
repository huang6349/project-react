import { withData } from '@/hofs';
import { safeRequest } from '@/utils';

export const dataConfigs = (key) => (
  withData(() => configs(), key)
);

export const configs = () => (
  safeRequest.Get(`/api/system/configs`)
);

export const update = (data) => (
  safeRequest.Put(`/api/system/configs`, data)
);

export default ({
  dataConfigs,
  configs,
  update,
});
