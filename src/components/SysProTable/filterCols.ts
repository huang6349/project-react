import type { SysProTableColumnType } from './types';
import { isString } from 'lodash-es';
import { includes } from 'lodash-es';

export const getValueType = (
  col: SysProTableColumnType,
) => (
  isString(col?.valueType) ? col?.valueType : ''
);

export const filterExportCols = (
  columns: SysProTableColumnType[],
): SysProTableColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInExport
  ))?.filter((col) => {
    const cols = ['indexBorder', 'index', 'option'];
    const valueType = getValueType(col);
    return !includes(cols, valueType);
  })
);
