import { compact } from 'lodash-es';
import { SysDictTag } from '@/components';

const columns = (options) => compact([{
  title: '#序号',
  valueType: 'indexBorder',
  width: 80,
  dataIndex: 'index',
  fixed: 'left',
  hideInDescriptions: !0,
  hideInForm: !0,
  hideInSearch: !0,
}, {
  title: '@数据编号',
  span: 3,
  width: 180,
  dataIndex: 'id',
  fixed: 'left',
  ellipsis: !0,
  copyable: !0,
  hideInDescriptions: !0,
  hideInSearch: !0,
  formItemProps: {
    hidden: !0,
  },
}, {
  title: '名称',
  placeholder: '请输入名称',
  width: 150,
  dataIndex: 'name',
  ellipsis: !0,
  hideInForm: !0,
}, {
  title: '代码',
  placeholder: '请输入代码',
  span: 2,
  width: 150,
  dataIndex: 'code',
  ellipsis: !0,
  hideInForm: !0,
}, {
  title: '备注',
  span: 3,
  dataIndex: 'desc',
  ellipsis: !0,
  hideInForm: !0,
  hideInSearch: !0,
}, {
  title: '状态',
  span: 3,
  width: 150,
  dataIndex: 'statusTag',
  hideInDescriptions: !0,
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  renderExport: ({ label } = {}) => (
    label
  ),
  render: ({ label, style } = {}) => (<SysDictTag
    label={label}
    style={style}
  />),
}, {
  title: '创建时间',
  width: 180,
  dataIndex: 'createTime',
  valueType: 'dateTime',
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
}, {
  title: '更新时间',
  width: 180,
  dataIndex: 'updateTime',
  valueType: 'dateTime',
  hideInForm: !0,
  hideInSearch: !0,
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
    title: '名称',
    placeholder: '请输入名称',
    required: !0,
    width: 'md',
    dataIndex: 'name',
  }, {
    title: '代码',
    placeholder: '请输入代码',
    required: !0,
    width: 'md',
    dataIndex: 'code',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
    title: '备注',
    placeholder: '请输入备注',
    width: 'md',
    dataIndex: 'desc',
    valueType: 'textarea',
  }],
}, options]);

export default columns;
