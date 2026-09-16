import { get } from 'lodash-es';

// 当前用户声明：新增字段在 DEFAULTS 加默认值、在 pickUser 加映射
// 读写基建见 src/utils/safeUser.ts，接口接线见 src/hofs/withUser.ts

const DEFAULTS = {
  perms: [],
  roles: [],
};

// 参数类型用 JSDoc 声明：pickUser 的推导类型经 ReturnType 供 src/utils/safeUser.ts 使用，
// 缺省会推断成 {}，导致 lodash get 的返回值退化为 undefined，User 类型失真
/** @param {Record<string, any>} raw */
export const pickUser = (raw = {}) => ({
  name: get(raw, 'user.nickname') ?? get(raw, 'user.username'),
  avatar: get(raw, 'user.avatar'),
  perms: get(raw, 'perms') ?? DEFAULTS.perms,
  roles: get(raw, 'roles') ?? DEFAULTS.roles,
});
