import type { ProTableProps } from '@ant-design/pro-components';
import type { ProColumnType } from '@ant-design/pro-components';
import type { Key } from 'react';

/** 表格列类型 */
export type SysProTListColumnType = ProColumnType<any, any> & {
  /** 占位符 */
  placeholder?: string;
  /** 权限编码 */
  access?: string;
  /** 链接地址 */
  linkHref?: string | ((record: any) => string);
};

/** 表格 Props */
export type SysProTListProps = Omit<ProTableProps<any, any>, 'columns'> & {
  /** 列表变化回调 */
  onTListChange?: (selectedRowKey?: Key) => void;
  /** 同步查询参数 */
  syncQueries?: boolean | ((values: any) => any);
  /** 列配置 */
  columns: SysProTListColumnType[];
};
