import type { TagProps } from 'antd';

/** 字典标签 Props */
export type SysDictTagProps = Omit<TagProps, 'style'> & {
  /** 标签文本 */
  label?: string;
  /** 样式索引（可选，默认 0） */
  style?: number;
};
