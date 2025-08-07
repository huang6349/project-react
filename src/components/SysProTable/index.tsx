import type { TableColumnType } from './types';
import type { TableProps } from './types';
import type { AlertRenderType } from './types';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
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
import { filterExportCols } from './filterCols';
import { exportToExcel } from './exceljs';
import { produce } from 'immer';
import dayjs from 'dayjs';
import state from './index.state';

const SysProTable = (props: TableProps) => {
  const headerRef = useRef<any>();

  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const {
    onTListChange,
    tableAlertOption,
    name,
    syncQueries,
    pagination,
    columns,
    form,
    request,
    onLoad,
    ...proTableProps
  } = props;

  const tableAlertOptionRender: AlertRenderType = (props) => {
    const {
      onCleanSelected,
      selectedRows,
      intl,
    } = props;

    const {
      enableExport = !0,
      enableClear = !0,
      exportName,
    } = tableAlertOption ?? {};

    const handleExport = () => exportToExcel(
      filterExportCols(columns),
      selectedRows,
      exportName ?? `${name}导出-${dayjs().format('x')}`,
    );

    return (<Space>
      {enableExport ? (<a onClick={handleExport} key='export'>
        <>导出所选</>
      </a>) : null}
      {enableClear ? (<a onClick={onCleanSelected} key='clear'>
        {intl.getMessage('alert.clear', '清空')}
      </a>) : null}
    </Space>);
  };

  const $cols = useMemo(() => {
    const patch = ($cols: TableColumnType[]): any[] => (
      produce($cols, (cols) => {
        cols?.forEach((col) => {
          const {
            fieldProps = {},
            placeholder,
          } = col;

          if (placeholder) {
            if (isFunction(fieldProps)) {
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
    return patch(columns);
  }, [columns]);

  const {
    selectedRowKey,
  } = snap?.tl?.[namespace] || {};

  const {
    activeKey,
  } = snap?.tt?.[namespace] || {};

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
    cardBordered={!1}
    tableAlertOptionRender={tableAlertOptionRender}
    headerTitle={(<TableTitle
      headerRef={headerRef}
    />)}
    {...proTableProps}
    columns={$cols}
    pagination={{
      pageSizeOptions: [10, 20, 50, 100, 200, 500],
      showSizeChanger: !0,
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
      const header = headerRef?.current;
      header?.refreshTime();
      onLoad?.(dataSource);
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
