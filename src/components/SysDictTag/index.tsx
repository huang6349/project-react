import { SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { isEmpty } from 'lodash-es';

export const state = [
  { color: 'default' },
  { color: 'processing' },
  { color: 'success' },
  { color: 'error' },
  { color: 'processing', icon: (<SyncOutlined spin={!0} />) },
  { color: 'warning' },
];

export type DictTagProps = {
  label?: string,
  style?: number,
};

const SysDictTag = (props: DictTagProps) => {
  const {
    label,
    style = 0,
  } = props;

  if (isEmpty(label)) {
    return <>-</>;
  } else return (<Tag
    color={state[style]?.color}
    icon={state[style]?.icon}>
    {label}
  </Tag>);
};

SysDictTag.defaultProps = {};

export default SysDictTag;
