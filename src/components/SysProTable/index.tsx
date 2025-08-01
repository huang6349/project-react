import type { ProTableProps } from '@ant-design/pro-components';
import type { Key } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { TableTitle } from './TableTitle';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useUpdateEffect } from 'react-use';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { compact } from 'lodash-es';
import { join } from 'lodash-es';
import { set } from 'lodash-es';
import state from './index.state';

const SysProTable = (props: ProTableProps<any, any> & {
  onTListChange?: (selectedRowKey?: Key) => void;
}) => {
  const headerRef = useRef<any>();

  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const {
    onTListChange,
    pagination,
    form,
    request,
    onLoad,
    ...proTableProps
  } = props;

  const {
    selectedRowKey,
  } = snap?.tl[namespace] || {};

  const {
    activeKey,
  } = snap?.tt[namespace] || {};

  const workspace = useMemo(() => (
    join(compact([namespace, selectedRowKey, activeKey]), '#')
  ), [selectedRowKey, activeKey, namespace]);

  const {
    pageSize,
    current,
    queries,
  } = snap[workspace] || {};

  useIsomorphicLayoutEffect(() => {
    const form = (props?.formRef as any)?.current;
    form?.setFieldsValue(queries || {});
    onTListChange?.(selectedRowKey);
  }, []);

  useUpdateEffect(() => {
    const action = (props?.actionRef as any)?.current;
    action?.reset();
    onTListChange?.(selectedRowKey);
  }, [selectedRowKey]);

  return (<ProTable
    headerTitle={(<TableTitle
      headerRef={headerRef}
    />)}
    cardBordered={!1}
    {...proTableProps}
    pagination={{
      ...pagination,
      defaultPageSize: pageSize || 10,
      defaultCurrent: current || 1,
    }}
    form={{
      ...form,
      layout: 'vertical',
    }}
    request={(params,
              sort,
              filter) => {
      const {
        pageSize,
        current,
        ...queries
      } = params || {};
      set(state, `${workspace}.pageSize`, pageSize);
      set(state, `${workspace}.current`, current);
      set(state, `${workspace}.queries`, queries);
      return request?.(params, sort, filter) as any;
    }}
    onLoad={(dataSource) => {
      onLoad?.(dataSource);
      const header = headerRef?.current;
      header?.refreshTime();
    }}
  />);
};

export default SysProTable;
