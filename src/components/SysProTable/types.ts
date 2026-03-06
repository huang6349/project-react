import type { ProTableProps } from '@ant-design/pro-components';
import type { ProColumnType } from '@ant-design/pro-components';
import type { Key } from 'react';
import type { MutableRefObject } from 'react';

/** 表格列配置 */
export type TableAlertOptionType = {
  /** 启用导出 */
  enableExport?: boolean;
  /** 启用清空 */
  enableClear?: boolean;
  /** 导出文件名 */
  exportName?: string;
};

/** 表格列类型 */
export type TableColumnType = ProColumnType<any, any> & {
  /** 占位符 */
  placeholder?: string;
  /** 在导出中隐藏 */
  hideInExport?: boolean;
  /** 导出渲染 */
  renderExport?: (text: any, record: any, index: number) => any;
};

/** 表格 Props */
export type TableProps = Omit<ProTableProps<any, any>, 'columns'> & {
  /** 列表变化回调 */
  onTListChange?: (selectedRowKey?: Key) => void;
  /** 表格顶部配置 */
  tableAlertOption?: TableAlertOptionType;
  /** 表格名称 */
  name?: string;
  /** 同步查询参数 */
  syncQueries?: boolean | ((values: any) => any);
  /** 列配置 */
  columns: TableColumnType[];
};

/** 提示渲染类型 */
export type AlertRenderType = TableProps['tableAlertOptionRender'];

/** 表头引用类型 */
export type HeaderRefType = {
  /** 刷新时间 */
  refreshTime?: () => void;
};

/** 表头 Props */
export type HeaderProps = {
  /** 表头引用 */
  headerRef?: MutableRefObject<HeaderRefType>;
};
