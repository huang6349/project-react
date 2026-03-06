import type { ProTableProps } from '@ant-design/pro-components';
import type { ProColumnType } from '@ant-design/pro-components';
import type { Key } from 'react';

/** 表格列类型 */
export type TableColumnType = ProColumnType<any, any> & {
  /** 占位符 */
  placeholder?: string;
};

/** 表格 Props */
export type TableProps = Omit<ProTableProps<any, any>, 'columns'> & {
  /** 列表变化回调 */
  onTListChange?: (selectedRowKey?: Key) => void;
  /** 同步查询参数 */
  syncQueries?: boolean | ((values: any) => any);
  /** 列配置 */
  columns: TableColumnType[];
};
