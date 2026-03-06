import type { TagProps } from 'antd';

/** 字典标签 Props */
export type DictTagProps = TagProps & {
  /** 标签文本 */
  label?: string;
  /** 样式索引 */
  style?: number;
};
