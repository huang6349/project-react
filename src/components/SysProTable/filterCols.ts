import type { TableColumnType } from './types';
import { isString } from 'lodash-es';
import { includes } from 'lodash-es';

export const getValueType = (col: TableColumnType) => (
  isString(col?.valueType) ? col?.valueType : ''
);

export const filterExportCols = (
  columns: TableColumnType[],
): TableColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInExport
  ))?.filter((col) => {
    const cols = ['indexBorder', 'index', 'option'];
    const valueType = getValueType(col);
    return !includes(cols, valueType);
  })
);

export const filterTableCols = (
  columns: TableColumnType[],
): TableColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInTable
  ))
);
