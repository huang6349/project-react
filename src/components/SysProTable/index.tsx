import type { SysProTableProps } from './types';
import type { SysProTableAlertRenderType } from './types';
import type { SysProTableHeaderRefType } from './types';
import { useMemo } from 'react';
import { useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import { TableTitle } from './TableTitle';
import { SysLink } from '@/components';
import { useLocation } from '@umijs/max';
import { useSnapshot } from '@umijs/max';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useUpdateEffect } from 'react-use';
import { isFunction } from 'lodash-es';
import { compact } from 'lodash-es';
import { join } from 'lodash-es';
import { set } from 'lodash-es';
import { filterExportCols } from './filterCols';
import { exportToExcel } from './exceljs';
import { patchCols } from '@/utils';
import dayjs from 'dayjs';
import clsx from 'clsx';
import state from './index.state';

const SysProTable = (
  props: SysProTableProps,
) => {
  const {
    className: cls,
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

  const headerRef = useRef<SysProTableHeaderRefType>();

  const {
    pathname: namespace,
  } = useLocation();
  const snap = useSnapshot(state);

  const tableAlertOptionRender: SysProTableAlertRenderType = (alertProps) => {
    const {
      onCleanSelected,
      selectedRows,
      intl,
    } = alertProps;

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

    return (<Space size='small'>
      {enableExport ? (<SysLink onClick={handleExport} key='export'>
        <>导出所选</>
      </SysLink>) : null}
      {enableClear ? (<SysLink onClick={onCleanSelected} key='clear'>
        {intl.getMessage('alert.clear', '清空')}
      </SysLink>) : null}
    </Space>);
  };

  const $cols = useMemo(() => (
    patchCols(columns)
  ), [columns]);

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
    className={clsx('sys-pro-table', cls)}
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
    request={(params, sort, filter) => {
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
      header?.refreshTime?.();
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
