import { pickConfigs } from '@/configs';
import { proxy } from '@umijs/max';
import { snapshot } from '@umijs/max';
import { get } from 'lodash-es';

// 后端原始配置（形状未知）
export type RawConfigs = Record<string, any>;

// 声明产物类型（随 src/configs.ts 自动推导）
export type Configs = ReturnType<typeof pickConfigs>;

// 深路径（lodash get 语法，须含点号）
export type ConfigPath = `${string}.${string}`;

// 全局配置 store（文件私有）
const configsState: Configs = proxy(pickConfigs());

/* 读取：不传 key 返回全量，传 key 走深路径；返回只读快照 */
function getConfigs(): Configs;
function getConfigs<K extends keyof Configs>(key: K): Configs[K];
// 深路径须含点号（否则匹配不到重载 → 拼错字段编译即报错）
function getConfigs(path: ConfigPath): any;
function getConfigs(key?: string) {
  const configs = snapshot(configsState);
  return key ? get(configs, key) : configs;
}

/* 设置：写入 store 并返回声明形态 */
const setConfigs = (raw: RawConfigs = {}): Configs => {
  const configs = pickConfigs(raw);
  Object.assign(configsState, configs);
  return configs;
};

export default ({
  get: getConfigs,
  set: setConfigs,
});
