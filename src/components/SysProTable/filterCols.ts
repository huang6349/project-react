import type { TableColumnType } from './types';
import { chain } from 'lodash-es';
import { isString } from 'lodash-es';
import { includes } from 'lodash-es';

export const filterExportCols = (
  columns: TableColumnType[],
): TableColumnType[] => (
  chain(columns)
    .filter((col: TableColumnType) => !col?.hideInExport)
    .filter((col: TableColumnType) => {
      const valueType = isString(col?.valueType) ? col?.valueType : '';
      return !includes(['index', 'indexBorder', 'option'], valueType);
    }).value()
);
