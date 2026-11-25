import type { SysButtonProps } from '@/components/SysButton/types';

/** 返回按钮 Props */
export type BackProps = SysButtonProps & {
  /** 按钮文本（可选，有默认值） */
  label?: string;
};
