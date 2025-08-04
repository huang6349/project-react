import { SysDictTag } from '@/components';
import { compact } from 'lodash-es';
import { queryDict } from '@/services';

const columns = (options) => compact([{
  title: '#序号',
  valueType: 'indexBorder',
  width: 80,
  dataIndex: 'index',
  fixed: 'left',
  hideInDescriptions: !0,
  hideInForm: !0,
  hideInTable: !0,
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
  hideInTable: !0,
  hideInSearch: !0,
  hidden: !0,
}, {
  title: '名称',
  placeholder: '请输入名称',
  width: 150,
  dataIndex: 'name',
  ellipsis: !0,
  hideInForm: !0,
}, {
  title: '简称',
  span: 2,
  width: 150,
  dataIndex: 'abbr',
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
}, {
  title: '类别',
  span: 3,
  width: 150,
  dataIndex: 'categoryTag',
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
  render: ({ label, style } = {}) => (<SysDictTag
    label={label}
    style={style}
  />),
}, {
  title: '地区',
  width: 150,
  dataIndex: 'area',
  ellipsis: !0,
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
}, {
  title: '地址',
  span: 2,
  width: 180,
  dataIndex: 'address',
  ellipsis: !0,
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
}, {
  title: '备注',
  span: 3,
  dataIndex: 'desc',
  ellipsis: !0,
  hideInForm: !0,
  hideInTable: !0,
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
  hideInTable: !0,
  hideInSearch: !0,
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  columns: [{
    title: '名称',
    placeholder: '请输入名称',
    width: 'md',
    required: !0,
    dataIndex: 'name',
  }, {
    title: '简称',
    placeholder: '请输入简称',
    width: 'md',
    required: !0,
    dataIndex: 'abbr',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  columns: [{
    title: '类别',
    placeholder: '请选择类别',
    required: !0,
    width: 'md',
    dataIndex: 'category',
    request: queryDict('tenant-category'),
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  columns: [{
    title: '地区',
    placeholder: '请输入地区',
    required: !0,
    width: 'md',
    dataIndex: 'area',
  }, {
    title: '地址',
    placeholder: '请输入地址',
    width: 'md',
    dataIndex: 'address',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  columns: [{
    title: '备注',
    placeholder: '请输入备注',
    width: 'md',
    dataIndex: 'desc',
    valueType: 'textarea',
  }],
}, options]);

export default columns;
