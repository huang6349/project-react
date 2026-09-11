import { safeUser } from '@/utils';

/* 校验当前用户权限：任一权限码命中即通过 */
const checkPerm = (...codes: string[]): boolean => {
  if (!codes.length) return !1;
  const perms = safeUser.get('perms');
  if (perms.includes('*')) return !0;
  return codes.some(code => {
    const [prefix] = code.split(':');
    return perms.includes(`${prefix}:*`) || perms.includes(code);
  });
};

export default checkPerm;
