import type { ProFormColumnsType } from '@ant-design/pro-components';
import type { ProFormProps } from '@ant-design/pro-components';
import type { ProCardProps } from '@ant-design/pro-components';

/** 表单列类型 */
export type SysFormColumnType = Omit<ProFormColumnsType<any, any>, 'columns'> & {
  /** 占位符 */
  placeholder?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否显示搜索 */
  showSearch?: boolean;
  /** 子列配置 */
  columns?: SysFormColumnType[] | ((values: any) => SysFormColumnType[]);
  /** 扩展属性 */
  [key: string]: any;
};

/** 表单 Props */
export type SysFormProps = Omit<ProFormProps<any>, 'action'> & {
  /** 列配置 */
  columns: SysFormColumnType[];
  /** 是否显示边框（可选，默认 true） */
  bordered?: ProCardProps['bordered'];
  /** 是否为幽灵模式（可选，默认 false） */
  ghost?: ProCardProps['ghost'];
  /** 卡片 Props */
  cardProps?: ProCardProps;
};
