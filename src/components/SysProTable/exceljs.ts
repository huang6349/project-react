import type { Worksheet } from 'exceljs';
import type { Workbook } from 'exceljs';
import type { Xlsx } from 'exceljs';
import type { Buffer } from 'exceljs';
import type { Column } from 'exceljs';
import type { TableColumnType } from './types';
import { isUndefined } from 'lodash-es';
import { isString } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { isArray } from 'lodash-es';
import { isObject } from 'lodash-es';
import { includes } from 'lodash-es';
import { toNumber } from 'lodash-es';
import { eq } from 'lodash-es';
import { find } from 'lodash-es';
import { get } from 'lodash-es';
import { saveAs } from 'file-saver';
import ExcelJs from 'exceljs';
import dayjs from 'dayjs';

// 默认的列宽
export const DEFAULT_COLUMN_WIDTH: number = 20;

const formatOptionsType = (
  text: any,
  col: TableColumnType,
) => {
  if (col?.valueEnum) {
    return get(col?.valueEnum, [text, 'text']);
  } else if (col?.fieldProps) {
    if (isFunction(col?.fieldProps)) {
      const options = get(col.fieldProps({}, { current: {} }, col), 'options', []);
      return find(options, { value: text })?.label;
    } else {
      const options = get(col.fieldProps, 'options', []);
      return find(options, { value: text })?.label;
    }
  }
};

const formatDateType = (
  text: any,
  template?: string,
) => {
  if (isUndefined(text)) {
    return '';
  } else if (!isString(text)) {
    return dayjs(text).format(template);
  } else return text;
};

export const getExportValue = (
  record: Record<string, any>,
  col: TableColumnType,
  index: number = 0,
): any => {
  // dataIndex 如果是 react node 就不导出
  const text = isString(col.dataIndex) ? record[col?.dataIndex] : '';

  if (col?.renderExport) {
    return col?.renderExport(text, record, index);
  }

  if (includes(['select', 'radio', 'radioButton', 'checkbox'], col?.valueType)) {
    return formatOptionsType(text, col);
  }

  if (eq(col?.valueType, 'date')) {
    return formatDateType(text, 'YYYY-MM-DD');
  }

  if (eq(col?.valueType, 'dateTime')) {
    return formatDateType(text, 'YYYY-MM-DD HH:mm:ss');
  }

  if (eq(col?.valueType, 'dateRange')) {
    if (isArray(text)) {
      return text?.map((date) => (
        formatDateType(date, 'YYYY-MM-DD')
      )).join(' - ');
    }
  }

  if (eq(col?.valueType, 'dateTimeRange')) {
    if (isArray(text)) {
      return text?.map((date) => (
        formatDateType(date, 'YYYY-MM-DD HH:mm:ss')
      )).join(' - ');
    }
  }

  if (eq(col?.valueType, 'money')) {
    return isUndefined(text) ? '' : text;
  }

  if (isObject(text)) {
    return get(text, 'value');
  }

  return text;
};

export const saveWorkbook = (
  workbook: Workbook,
  fileName: string,
) => {
  // 导出文件
  const xlsx: Xlsx = workbook.xlsx;
  xlsx.writeBuffer().then((
    data: Buffer,
  ) => (
    saveAs(new Blob([data], {
      type: '',
    }), fileName)
  ));
};

export const exportToExcel = (
  columns: TableColumnType[],
  dataSource: any,
  fileName: string = '默认导出',
) => {
  // 创建工作簿
  const workbook: Workbook = new ExcelJs.Workbook();
  // 添加 sheet
  const worksheet: Worksheet = workbook.addWorksheet('sheet1');
  // 设置 sheet 的默认行高
  worksheet.properties.defaultRowHeight = 20;

  // 设置列
  worksheet.columns = columns?.map((
    col: TableColumnType,
  ): Partial<Column> => ({
    header: isString(col.title) ? col.title : '',
    key: isString(col.dataIndex) ? col.dataIndex : dayjs().format('x'),
    width: col.width ? toNumber(col.width) / 5 : DEFAULT_COLUMN_WIDTH,
  })) ?? [];

  // 设置垂直的对齐方式
  worksheet.columns?.forEach((
    col: Partial<Column>,
  ) => {
    col.alignment = {
      vertical: 'middle',
    };
  });

  // 处理行
  const rowsData: any[] = dataSource?.map((
    record: Record<string, any>,
    recordIndex: number,
  ) => columns.map((col: TableColumnType) => (
    getExportValue(record, col, recordIndex)
  )));

  // 添加行
  worksheet.addRows(rowsData);

  // 处理合并问题
  dataSource?.forEach((
    record: Record<string, any>,
    recordIndex: number,
  ) => {
    columns?.forEach((
      col: TableColumnType,
      colIdx: number,
    ) => {
      if (isFunction(col?.onCell)) {
        const rowSpan = get(col?.onCell(record), 'rowSpan', 1);
        if (rowSpan > 1) {
          // 向下合并
          const rowIndex = recordIndex + 2;
          const colIndex = colIdx + 1;
          worksheet.mergeCells(
            rowIndex,
            colIndex,
            rowIndex + rowSpan - 1,
            colIndex,
          );
        }
      }
    });
  });

  // 导出excel
  saveWorkbook(workbook, `${fileName}.xlsx`);
};
