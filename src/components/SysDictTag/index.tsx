import type { DictTagProps } from './types';
import { SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { isEmpty } from 'lodash-es';
import clsx from 'clsx';

export const STATE = [{
  color: 'default',
}, {
  color: 'processing',
}, {
  color: 'success',
}, {
  color: 'error',
}, {
  color: 'processing',
  icon: (<SyncOutlined spin={!0} />),
}, {
  color: 'warning',
}];

const SysDictTag = (
  props: DictTagProps,
) => {
  const {
    className: cls,
    label,
    style,
    ...tagProps
  } = props;

  if (isEmpty(label)) {
    return <>-</>;
  } else return (<Tag
    className={clsx('sys-dict-tag', cls)}
    color={STATE[style ?? 0]?.color}
    icon={STATE[style ?? 0]?.icon}
    {...tagProps}>
    {label}
  </Tag>);
};

SysDictTag.defaultProps = {
  style: 0,
};

export default SysDictTag;
