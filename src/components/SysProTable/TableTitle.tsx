import { memo } from 'react';
import { useCallback, useState, useImperativeHandle } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

export const TableTitle = memo(({ headerRef }: any) => {
  const [refreshTime, setRefreshTime] = useState(dayjs());

  const handleRefreshTime = useCallback(() => {
    setRefreshTime(dayjs());
  }, []);

  useImperativeHandle(headerRef, () => ({
    refreshTime: handleRefreshTime,
  }));

  return (<Typography.Text>
    更新时间：{dayjs(refreshTime).format('YYYY-MM-DD HH:mm:ss')}
  </Typography.Text>);
});
