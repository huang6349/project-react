import type { ProCardProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { set } from 'lodash-es';
import state from './index.state';

const SysTabs = (props: ProCardProps) => {
  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const {
    tabs,
    ...cardProps
  } = props;

  const {
    activeKey,
  } = snap[namespace] || {};

  return (<ProCard
    bordered={!0}
    {...cardProps}
    tabs={{
      activeKey: activeKey || tabs?.[0]?.key,
      onChange(activeKey) {
        set(state, `${namespace}.activeKey`, activeKey);
      },
      ...tabs,
    }} />);
};

export default SysTabs;
