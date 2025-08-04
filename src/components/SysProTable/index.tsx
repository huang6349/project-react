import type { ProTableProps } from '@ant-design/pro-components';
import type { ProColumnType } from '@ant-design/pro-components';
import type { Key } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { TableTitle } from './TableTitle';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useUpdateEffect } from 'react-use';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { isFunction } from 'lodash-es';
import { compact } from 'lodash-es';
import { join } from 'lodash-es';
import { set } from 'lodash-es';
import { produce } from 'immer';
import state from './index.state';

export type TableColumnType = ProColumnType<any, any> & {
  placeholder?: string;
}

const SysProTable = (props: Omit<ProTableProps<any, any>, 'columns'> & {
  onTListChange?: (selectedRowKey?: Key) => void;
  syncQueries?: boolean | ((values: any) => any);
  columns: TableColumnType[];
}) => {
  const headerRef = useRef<any>();

  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const {
    onTListChange,
    syncQueries,
    pagination,
    columns,
    form,
    request,
    onLoad,
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
    columns={patchColumn(columns)}
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
        ...values
      } = params || {};
      const queries = getQueries(syncQueries || !0, values);
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

const getQueries = (
  syncQueries: boolean | ((values: any) => any),
  values: any,
): any => {
  if (isFunction(syncQueries)) {
    return syncQueries?.(values);
  } else return values;
};

export default SysProTable;
