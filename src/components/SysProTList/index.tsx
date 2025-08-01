import type { ProTableProps } from '@ant-design/pro-components';
import type { Key } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useUpdateEffect } from 'react-use';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { includes } from 'lodash-es';
import { head } from 'lodash-es';
import { set } from 'lodash-es';
import { map } from 'lodash-es';
import state from './index.state';

const SysProTList = (props: ProTableProps<any, any> & {
  onTListChange?: (selectedRowKey?: Key) => void;
}) => {
  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const {
    onTListChange,
    rowSelection,
    pagination,
    search,
    form,
    request,
    onDataSourceChange,
    ...proTableProps
  } = props;

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
    cardBordered={!1}
    options={!1}
    ghost={!0}
    defaultSize='small'
    tableAlertRender={!1}
    {...proTableProps}
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
    request={(params,
              sort,
              filter) => {
      const {
        pageSize,
        current,
        ...queries
      } = params || {};
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

export default SysProTList;
