import { useSnapshot } from '@umijs/max';
import { safeTenant } from '@/utils';

// 订阅可切换组织 store，store 变化时组件自动重渲染
const useTenants = () => (
  useSnapshot(safeTenant.state)
);

export default useTenants;
