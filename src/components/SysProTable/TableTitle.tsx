import type { HeaderProps } from './types';
import { memo } from 'react';
import { useState } from 'react';
import { useImperativeHandle } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

export const TableTitle = memo((
  props: HeaderProps,
) => {
  const {
    headerRef,
  } = props;

  const [refreshTime, setRefreshTime] = useState(dayjs());

  const handleRefreshTime = () => (
    setRefreshTime(dayjs())
  );

  useImperativeHandle(headerRef, () => ({
    refreshTime: handleRefreshTime,
  }));

  return (<Typography.Text>
    更新时间：{dayjs(refreshTime).format('YYYY-MM-DD HH:mm:ss')}
  </Typography.Text>);
});
