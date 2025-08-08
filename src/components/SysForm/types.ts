import type { ProFormColumnsType } from '@ant-design/pro-components';
import type { ProFormProps } from '@ant-design/pro-components';

export type FormColumnType = Omit<ProFormColumnsType<any, any>, 'columns'> & {
  placeholder?: string;
  required?: boolean;
  showSearch?: boolean;
  columns?: FormColumnType[] | ((values: any) => FormColumnType[]);
  [key: string]: any;
}

export type FormProps = Omit<ProFormProps<any>, 'action'> & {
  columns: FormColumnType[];
}
