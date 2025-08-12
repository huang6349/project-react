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
  title: '帐号',
  placeholder: '请输入帐号',
  width: 150,
  dataIndex: 'username',
  ellipsis: !0,
  copyable: !0,
  hideInForm: !0,
}, {
  title: '昵称',
  placeholder: '请输入昵称',
  span: 2,
  width: 150,
  dataIndex: 'nickname',
  ellipsis: !0,
  hideInForm: !0,
}, {
  title: '手机号码',
  placeholder: '请输入手机号码',
  width: 180,
  dataIndex: 'mobile',
  copyable: !0,
  hideInForm: !0,
}, {
  title: '邮箱',
  span: 2,
  width: 150,
  dataIndex: 'email',
  ellipsis: !0,
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
}, {
  title: '性别',
  span: 1,
  width: 150,
  dataIndex: 'genderTag',
  hideInForm: !0,
  hideInSearch: !0,
  renderExport: ({ label } = {}) => (
    label
  ),
  render: ({ label, style } = {}) => (<SysDictTag
    label={label}
    style={style}
  />),
}, {
  title: '生日',
  span: 2,
  width: 150,
  dataIndex: 'birthday',
  hideInForm: !0,
  hideInTable: !0,
  hideInSearch: !0,
}, {
  title: '地址',
  span: 3,
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
    title: '帐号',
    placeholder: '请输入帐号',
    required: !0,
    width: 'md',
    dataIndex: 'username',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
    title: '密码',
    placeholder: '请输入密码',
    required: !0,
    width: 'md',
    dataIndex: 'password1',
    valueType: 'password',
  }, {
    title: '确认密码',
    placeholder: '请输入密码',
    required: !0,
    width: 'md',
    dataIndex: 'password2',
    valueType: 'password',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
    title: '昵称',
    placeholder: '请输入昵称',
    required: !0,
    width: 'md',
    dataIndex: 'nickname',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
    title: '手机号码',
    placeholder: '请输入手机号码',
    required: !0,
    width: 'md',
    dataIndex: 'mobile',
  }, {
    title: '邮箱',
    placeholder: '请输入邮箱',
    width: 'md',
    dataIndex: 'email',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
    title: '性别',
    placeholder: '请选择性别',
    width: 'md',
    dataIndex: 'gender',
    request: queryDict('user-gender'),
  }, {
    title: '生日',
    placeholder: '请输入生日',
    width: 'md',
    dataIndex: 'birthday',
    valueType: 'date',
  }],
}, {
  valueType: 'group',
  hideInDescriptions: !0,
  hideInTable: !0,
  hideInSearch: !0,
  hideInExport: !0,
  columns: [{
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
