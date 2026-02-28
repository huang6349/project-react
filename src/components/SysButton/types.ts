import type { ComponentProps } from 'react';
import { Button } from 'antd';

export type SysButtonProps = ComponentProps<typeof Button> & {
  invisible?: boolean | (() => boolean);
};
