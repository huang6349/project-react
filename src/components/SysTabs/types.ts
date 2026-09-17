import type { ComponentProps } from 'react';
import { ProCard } from '@ant-design/pro-components';

/** 标签页 Props */
export type TabsProps = ComponentProps<typeof ProCard> & {
  /** 是否隐藏 */
  invisible?: boolean | (() => boolean);
};
