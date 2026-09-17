import type { TabsProps } from './types';
import { useMemo } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { isFunction } from 'lodash-es';
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
    invisible,
    tabs,
    ...cardProps
  } = props;

  const hidden = useMemo(() => {
    if (isFunction(invisible)) {
      return invisible();
    } else return invisible;
  }, [invisible]);

  const {
    activeKey,
  } = snap[namespace] || {};

  if (hidden) {
    return null;
  } else return (<ProCard
    className={clsx('sys-tabs', cls)}
    bordered={!0}
    {...cardProps}
    tabs={{
      activeKey: activeKey || tabs?.[0]?.key,
      onChange(activeKey) {
        set(state, `${namespace}.activeKey`, activeKey);
      },
      ...tabs,
    }}
  />);
};

SysTabs.defaultProps = {
  invisible: !1,
};

export default SysTabs;
