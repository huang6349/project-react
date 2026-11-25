import type { ReactNode } from 'react';
import type { ConfigContextPropsType } from '@ant-design/pro-components';

/** valueType 映射 */
export type ValueTypeMap = ConfigContextPropsType['valueTypeMap'];

/** Provider Props */
export type SysProviderProps = {
  /** 子节点 */
  children: ReactNode;
};
