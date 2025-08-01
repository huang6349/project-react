const checkPerm = (perm?: string[], ...codes: string[]): boolean => {
  if (!perm || !codes.length) return !1;
  if (perm.includes('*')) return !0;
  return codes.some(code => {
    const [prefix] = code.split(':');
    return perm.includes(`${prefix}:*`) || perm.includes(code);
  });
};

export default checkPerm;
