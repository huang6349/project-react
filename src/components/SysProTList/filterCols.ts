import type { TableColumnType } from './types';

export const filterTableCols = (
  columns: TableColumnType[],
): TableColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInTable
  ))
);
