import type { ProTableProps } from '@ant-design/pro-components';
import type { ProColumnType } from '@ant-design/pro-components';
import type { Key } from 'react';
import type { MutableRefObject } from 'react';

export type TableAlertOptionType = {
  enableExport?: boolean;
  enableClear?: boolean;
  exportName?: string;
}

export type TableColumnType = ProColumnType<any, any> & {
  placeholder?: string;
  hideInExport?: boolean;
  renderExport?: (text: any, record: any, index: number) => any;
}

export type TableProps = Omit<ProTableProps<any, any>, 'columns'> & {
  onTListChange?: (selectedRowKey?: Key) => void;
  tableAlertOption?: TableAlertOptionType;
  name?: string;
  syncQueries?: boolean | ((values: any) => any);
  columns: TableColumnType[];
}

export type AlertRenderType = TableProps['tableAlertOptionRender'];

export type HeaderRefType = {
  refreshTime?: () => void;
}

export type HeaderProps = {
  headerRef?: MutableRefObject<HeaderRefType>;
}
