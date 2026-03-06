import type { TabsProps } from './types';
import { ProCard } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { set } from 'lodash-es';
import clsx from 'clsx';
import state from './index.state';

const SysTabs = (
  props: TabsProps,
) => {
  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const {
    className: cls,
    tabs,
    ...cardProps
  } = props;

  const {
    activeKey,
  } = snap[namespace] || {};

  return (<ProCard
    className={clsx('sys-tabs', cls)}
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
