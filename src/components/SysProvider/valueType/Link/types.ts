import type { ReactNode } from 'react';

/** Link 字段属性 */
export type LinkFieldProps = {
  /** 权限编码 */
  access?: string;
  /** 链接地址 */
  href?: string;
};

/** Link 文本 Props */
export type LinkTextProps = {
  /** 文本内容 */
  text: ReactNode;
  /** 字段属性 */
  fieldProps?: LinkFieldProps;
};
