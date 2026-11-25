import type { Key } from 'react';
import type { SysProTListProps } from './types';
import { useMemo } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useUpdateEffect } from 'react-use';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { ProTable } from '@ant-design/pro-components';
import { isFunction } from 'lodash-es';
import { includes } from 'lodash-es';
import { head } from 'lodash-es';
import { set } from 'lodash-es';
import { map } from 'lodash-es';
import { patchCols } from '@/utils';
import clsx from 'clsx';
import state from './index.state';

const SysProTList = (
  props: SysProTListProps,
) => {
  const {
    className: cls,
    onTListChange,
    syncQueries,
    rowSelection,
    pagination,
    columns,
    search,
    form,
    request,
    onDataSourceChange,
    ...proTableProps
  } = props;

  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const $cols = useMemo(() => (
    patchCols(columns)
  ), [columns]);

  const {
    selectedRowKeys,
    selectedRowKey,
    pageSize,
    current,
    queries,
  } = snap[namespace] || {};

  useIsomorphicLayoutEffect(() => {
    const form = (props?.formRef as any)?.current;
    form?.setFieldsValue(queries || {});
    onTListChange?.(selectedRowKey);
  }, []);

  useUpdateEffect(() => {
    const selectedRowKey = head(selectedRowKeys) as Key;
    set(state, `${namespace}.selectedRowKey`, selectedRowKey);
    onTListChange?.(selectedRowKey);
  }, [selectedRowKeys]);

  return (<ProTable
    className={clsx('sys-pro-tlist', cls)}
    cardBordered={!1}
    options={!1}
    ghost={!0}
    defaultSize='small'
    tableAlertRender={!1}
    {...proTableProps}
    columns={$cols}
    rowSelection={{
      ...rowSelection,
      selectedRowKeys: selectedRowKeys || [],
      type: 'radio',
      onChange: (selectedRowKeys) => (
        set(state, `${namespace}.selectedRowKeys`, selectedRowKeys)
      ),
    }}
    pagination={{
      ...pagination,
      defaultPageSize: pageSize || 10,
      defaultCurrent: current || 1,
    }}
    search={{
      ...search,
      filterType: 'light',
    }}
    form={{
      ...form,
      layout: 'vertical',
    }}
    request={(params, sort, filter) => {
      const {
        pageSize,
        current,
        ...values
      } = params || {};
      const queries = getQueries(syncQueries || !0, values);
      set(state, `${namespace}.pageSize`, pageSize);
      set(state, `${namespace}.current`, current);
      set(state, `${namespace}.queries`, queries);
      return request?.(params, sort, filter) as any;
    }}
    onDataSourceChange={(dataSource) => {
      onDataSourceChange?.(dataSource);
      const rowKeys = map(dataSource, props?.rowKey as any);
      if (includes(rowKeys, selectedRowKey)) return;
      else set(state, `${namespace}.selectedRowKeys`, [head(rowKeys)]);
    }}
  />);
};

const getQueries = (
  syncQueries: boolean | ((values: any) => any),
  values: any,
): any => {
  if (isFunction(syncQueries)) {
    return syncQueries?.(values);
  } else return values;
};

export default SysProTList;
