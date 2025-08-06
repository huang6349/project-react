import type { ProTableProps } from '@ant-design/pro-components';
import type { ProColumnType } from '@ant-design/pro-components';
import type { Key } from 'react';
import type { MutableRefObject } from 'react';

export type TableColumnType = ProColumnType<any, any> & {
  placeholder?: string;
}

export type TableProps = Omit<ProTableProps<any, any>, 'columns'> & {
  onTListChange?: (selectedRowKey?: Key) => void;
  syncQueries?: boolean | ((values: any) => any);
  columns: TableColumnType[];
}

export type HeaderRefType = {
  refreshTime?: () => void;
}

export type HeaderProps = {
  headerRef?: MutableRefObject<HeaderRefType>;
}
