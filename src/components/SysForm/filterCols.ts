import type { SysFormColumnType } from './types';
import { isString } from 'lodash-es';
import { includes } from 'lodash-es';

export const getValueType = (
  col: SysFormColumnType,
) => (
  isString(col?.valueType) ? col?.valueType : ''
);

export const filterFormCols = (
  columns: SysFormColumnType[],
): SysFormColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInForm
  ))?.filter((col) => {
    const cols = ['indexBorder', 'index', 'option'];
    const valueType = getValueType(col);
    return !includes(cols, valueType);
  })
);
