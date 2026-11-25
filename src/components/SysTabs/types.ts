import type { ComponentProps } from 'react';
import { ProCard } from '@ant-design/pro-components';

/** 标签页 Props */
export type SysTabsProps = ComponentProps<typeof ProCard> & {
  /** 是否隐藏（可选，默认 false） */
  invisible?: boolean | (() => boolean);
};
