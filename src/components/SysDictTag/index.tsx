import type { SysDictTagProps } from './types';
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
  props: SysDictTagProps,
) => {
  const {
    className: cls,
    label,
    style,
    ...tagProps
  } = props;

  const tagState = STATE[style ?? 0];

  if (isEmpty(label)) {
    return <>-</>;
  } else return (<Tag
    className={clsx('sys-dict-tag', cls)}
    color={tagState?.color}
    icon={tagState?.icon}
    {...tagProps}>
    {label}
  </Tag>);
};

SysDictTag.defaultProps = {
  style: 0,
};

export default SysDictTag;
