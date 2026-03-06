import type { ComponentProps } from 'react';
import { Button } from 'antd';

/** 按钮 Props */
export type ButtonProps = ComponentProps<typeof Button> & {
  /** 是否隐藏 */
  invisible?: boolean | (() => boolean);
};
