import { pickUser } from '@/user';
import safeStore from './safeStore';

// 声明产物类型（随 src/user.ts 自动推导）
export type User = ReturnType<typeof pickUser>;

// 当前用户 store：state 供 useUser 订阅，读写走 get / set
export default safeStore(pickUser);
