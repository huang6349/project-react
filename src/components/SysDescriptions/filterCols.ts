import type { DescriptionsColumnType } from './types';
import { isString } from 'lodash-es';
import { includes } from 'lodash-es';

export const getValueType = (col: DescriptionsColumnType) => (
  isString(col?.valueType) ? col?.valueType : ''
);

export const filterDescriptionsCols = (
  columns: DescriptionsColumnType[],
): DescriptionsColumnType[] => (
  columns?.filter((col) => (
    !col?.hideInDescriptions
  ))?.filter((col) => {
    const cols = ['indexBorder', 'index', 'option'];
    const valueType = getValueType(col);
    return !includes(cols, valueType);
  })
);
