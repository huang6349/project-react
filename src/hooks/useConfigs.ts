import { useSnapshot } from '@umijs/max';
import { safeConfigs } from '@/utils';

// 订阅全局配置 store，配置变化时组件自动重渲染
const useConfigs = () => (
  useSnapshot(safeConfigs.state)
);

export default useConfigs;
