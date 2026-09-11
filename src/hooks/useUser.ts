import { useSnapshot } from '@umijs/max';
import { safeUser } from '@/utils';

// 订阅当前用户 store，store 变化时组件自动重渲染
const useUser = () => (
  useSnapshot(safeUser.state)
);

export default useUser;
