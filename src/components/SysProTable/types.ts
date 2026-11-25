import type { ProTableProps } from '@ant-design/pro-components';
import type { ProColumnType } from '@ant-design/pro-components';
import type { Key } from 'react';
import type { MutableRefObject } from 'react';

/** 表格列配置 */
export type SysProTableAlertOptionType = {
  /** 启用导出 */
  enableExport?: boolean;
  /** 启用清空 */
  enableClear?: boolean;
  /** 导出文件名 */
  exportName?: string;
};

/** 表格列类型 */
export type SysProTableColumnType = ProColumnType<any, any> & {
  /** 占位符 */
  placeholder?: string;
  /** 权限编码 */
  access?: string;
  /** 链接地址 */
  linkHref?: string | ((record: any) => string);
  /** 在导出中隐藏 */
  hideInExport?: boolean;
  /** 导出渲染 */
  renderExport?: (text: any, record: any, index: number) => any;
};

/** 表格 Props */
export type SysProTableProps = Omit<ProTableProps<any, any>, 'columns'> & {
  /** 列表变化回调 */
  onTListChange?: (selectedRowKey?: Key) => void;
  /** 表格顶部配置 */
  tableAlertOption?: SysProTableAlertOptionType;
  /** 表格名称 */
  name?: string;
  /** 同步查询参数 */
  syncQueries?: boolean | ((values: any) => any);
  /** 列配置 */
  columns: SysProTableColumnType[];
};

/** 提示渲染类型 */
export type SysProTableAlertRenderType = SysProTableProps['tableAlertOptionRender'];

/** 表头引用类型 */
export type SysProTableHeaderRefType = {
  /** 刷新时间 */
  refreshTime?: () => void;
};

/** 表头 Props */
export type SysProTableHeaderProps = {
  /** 表头引用 */
  headerRef?: MutableRefObject<SysProTableHeaderRefType | undefined>;
};
