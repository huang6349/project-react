import { compact } from 'lodash-es';
import { dataPerm } from './service';

const columns = (options) => compact([{
  title: '@数据编号',
  width: 'md',
  dataIndex: 'id',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  formItemProps: {
    hidden: !0,
  },
}, {
  title: '@租户编号',
  width: 'md',
  dataIndex: 'tenantId',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  formItemProps: {
    hidden: !0,
  },
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
    width: 'xl',
    dataIndex: 'permIds',
    valueType: 'checkbox',
    request: dataPerm(),
    fieldProps: {
      disabled: !0,
    },
  }],
}, options]);

export default columns;
