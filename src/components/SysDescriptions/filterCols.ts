import type { SysDescriptionsColumnType } from './types';
import { isString } from 'lodash-es';
import { includes } from 'lodash-es';

export const getValueType = (
  col: SysDescriptionsColumnType,
) => (
  isString(col?.valueType) ? col?.valueType : ''
);

export const filterDescriptionsCols = (
  columns: SysDescriptionsColumnType[],
): SysDescriptionsColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInDescriptions
  ))?.filter((col) => {
    const cols = ['indexBorder', 'index', 'option'];
    const valueType = getValueType(col);
    return !includes(cols, valueType);
  })
);
