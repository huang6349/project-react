import type { ComponentProps } from 'react';
import { Button } from 'antd';

/** 按钮 Props */
export type SysButtonProps = ComponentProps<typeof Button> & {
  /** 是否隐藏（可选，默认 false） */
  invisible?: boolean | (() => boolean);
};
