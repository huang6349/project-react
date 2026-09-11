import { proxy } from '@umijs/max';
import { snapshot } from '@umijs/max';
import { get } from 'lodash-es';

// 深路径（lodash get 语法，须含点号）
export type StorePath = `${string}.${string}`;

/* 创建 store：build 把后端原始数据映射成声明形态，无参调用时给出默认值 */
const safeStore = <T extends object>(build: (raw?: any) => T) => {
  const state: T = proxy(build());

  /* 读取：不传 key 返回全量，传 key 走深路径；返回只读快照 */
  function read(): T;
  function read<K extends keyof T>(key: K): T[K];
  // 深路径须含点号（否则匹配不到重载 → 拼错字段编译即报错）
  function read(path: StorePath): any;
  function read(key?: string) {
    const snap = snapshot(state);
    return key ? get(snap, key) : snap;
  }

  /* 写入：合并进 store 并返回声明形态 */
  const write = (raw: Record<string, any> = {}): T => {
    const next = build(raw);
    Object.assign(state, next);
    return next;
  };

  return {
    get: read,
    set: write,
    state,
  };
};

export default safeStore;
