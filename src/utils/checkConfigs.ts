import { safeConfigs } from '@/utils';
import { eq } from 'lodash-es';
import { get } from 'lodash-es';

/* 校验全局配置开关：任一字段为 true 即通过 */
const checkConfigs = (...fields: string[]): boolean => {
  if (!fields.length) return !1;
  const configs = safeConfigs.get();
  return fields.some(field => eq(get(configs, field), !0));
};

export default checkConfigs;
