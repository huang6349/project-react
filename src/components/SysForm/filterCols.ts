import type { FormColumnType } from './types';
import { isString } from 'lodash-es';
import { includes } from 'lodash-es';

export const getValueType = (col: FormColumnType) => (
  isString(col?.valueType) ? col?.valueType : ''
);

export const filterFormCols = (
  columns: FormColumnType[],
): FormColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInForm
  ))?.filter((col) => {
    const cols = ['indexBorder', 'index', 'option'];
    const valueType = getValueType(col);
    return !includes(cols, valueType);
  })
);
