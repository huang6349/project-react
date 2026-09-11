import { get } from 'lodash-es';

// 当前用户声明：新增字段在 DEFAULTS 加默认值、在 pickUser 加映射
// 读写基建见 src/utils/safeUser.ts，接口接线见 src/hofs/withUser.ts

const DEFAULTS = {
  perms: [],
  roles: [],
};

export const pickUser = (raw: Record<string, any> = {}) => ({
  name: get(raw, 'user.nickname') ?? get(raw, 'user.username'),
  avatar: get(raw, 'user.avatar'),
  perms: get(raw, 'perms') ?? DEFAULTS.perms,
  roles: get(raw, 'roles') ?? DEFAULTS.roles,
});
