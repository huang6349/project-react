import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import type { ProDescriptionsProps } from '@ant-design/pro-components';
import type { ProCardProps } from '@ant-design/pro-components';

/** 描述列表列类型 */
export type SysDescriptionsColumnType = Omit<ProDescriptionsItemProps<any, any>, 'editable'>;

/** 描述列表 Props */
export type SysDescriptionsProps = Omit<ProDescriptionsProps<any, any>, 'columns'> & {
  /** 是否显示边框（可选，默认 true） */
  bordered?: ProCardProps['bordered'];
  /** 标题 */
  title?: ProCardProps['title'];
  /** 列配置 */
  columns: SysDescriptionsColumnType[];
};
