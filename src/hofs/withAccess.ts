import type { AccessDeclare } from '@/utils/safeAccess';
import type { AccessMap } from '@/utils/safeAccess';
import { safeAccess } from '@/utils';

// 声明以 thunk 传入：调用时才求值，供 umi 在 initialState 变化时重算
const withAccess = <D extends AccessDeclare>(declare: () => D) => (
  (): AccessMap<D> => safeAccess(declare())
);

export default withAccess;
