import type { PageContainerProps } from '@ant-design/pro-components';

/** 页面容器 Props */
export type SysContainerProps = PageContainerProps & {
  /** 是否显示返回按钮（可选，默认 false） */
  back?: boolean;
};
