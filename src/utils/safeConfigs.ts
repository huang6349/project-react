import { pickConfigs } from '@/configs';
import safeStore from './safeStore';

// 声明产物类型（随 src/configs.js 自动推导）
export type Configs = ReturnType<typeof pickConfigs>;

// 全局配置 store：state 供订阅，读写走 get / set
export default safeStore(pickConfigs);
