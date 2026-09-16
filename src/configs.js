import { get } from 'lodash-es';

// 配置声明：新增配置在 DEFAULTS 加默认值、在 pickConfigs 加映射
// 读写基建见 src/utils/safeConfigs.ts，接口接线见 src/hofs/withConfigs.ts

const DEFAULTS = {
  name: '前端应用框架模版',
  slogan: '这是一个构建 REACT 项目的模板库',
  tenantEnabled: !1,
  iotEnabled: !1,
  aiEnabled: !1,
};

// 参数类型用 JSDoc 声明：pickConfigs 的推导类型经 ReturnType 供 src/utils/safeConfigs.ts 使用，
// 缺省会推断成 {}，导致 lodash get 的返回值退化，Configs 类型不可控
/** @param {Record<string, any>} raw */
export const pickConfigs = (raw = {}) => ({
  name: get(raw, 'system.name') ?? DEFAULTS.name,
  slogan: get(raw, 'system.slogan') ?? DEFAULTS.slogan,
  tenantEnabled: get(raw, 'tenant.enabled') ?? DEFAULTS.tenantEnabled,
  iotEnabled: get(raw, 'iot.enabled') ?? DEFAULTS.iotEnabled,
  aiEnabled: get(raw, 'ai.enabled') ?? DEFAULTS.aiEnabled,
});
