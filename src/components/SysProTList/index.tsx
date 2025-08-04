import type { TableColumnType } from './types';
import type { TableProps } from './types';
import type { Key } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useUpdateEffect } from 'react-use';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { isFunction } from 'lodash-es';
import { includes } from 'lodash-es';
import { head } from 'lodash-es';
import { set } from 'lodash-es';
import { map } from 'lodash-es';
import { produce } from 'immer';
import state from './index.state';

const SysProTList = (props: TableProps) => {
  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const {
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

  const patchColumn = ($cols: TableColumnType[]): any[] => (
    produce($cols, (cols) => {
      cols?.forEach((col) => {
        const {
          fieldProps = {},
          placeholder,
        } = col;

        if (placeholder) {
          if (typeof fieldProps === 'function') {
            col.fieldProps = (_form: any, _config: any): any => {
              const _fieldProps = fieldProps(_form, _config);
              if (!_fieldProps.placeholder)
                _fieldProps.placeholder = placeholder;
              return _fieldProps;
            };
          } else {
            const _fieldProps = fieldProps || {};
            if (!_fieldProps.placeholder)
              _fieldProps.placeholder = placeholder;
            col.fieldProps = _fieldProps;
          }
        }
      });
    })
  );

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
    columns={patchColumn(columns)}
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
