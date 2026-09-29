import { isArray } from 'lodash-es';
import safeStore from './safeStore';

// GET /api/user/tenant 的选项；value 为雪花 ID 字符串，不可转数字
export type TenantOption = {
  /** 组织名，后端可能缺省，缺省时菜单项回落占位文案 */
  label?: string;
  /** 组织 ID，菜单 key 与切换入参 */
  value: string;
};

// store 声明形态：safeStore 要求 T 是 object，所以包一层 tenants
export type Tenants = {
  tenants: TenantOption[];
};

// 可切换组织 store：数据即使用形态，build 只做形状适配与非数组收口
const build = (raw: any = []): Tenants => ({
  tenants: isArray(raw) ? raw : [],
});

// state 供订阅，读写走 get / set
export default safeStore(build);
