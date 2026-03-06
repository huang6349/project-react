import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import type { ProDescriptionsProps } from '@ant-design/pro-components';
import type { ProCardProps } from '@ant-design/pro-components';

/** 描述列表列类型 */
export type DescriptionsColumnType = Omit<ProDescriptionsItemProps<any, any>, 'editable'>;

/** 描述列表 Props */
export type DescriptionsProps = Omit<ProDescriptionsProps<any, any>, 'columns' | 'editable'> & {
  /** 是否显示边框 */
  bordered?: ProCardProps['bordered'];
  /** 标题 */
  title?: ProCardProps['title'];
  /** 列配置 */
  columns: DescriptionsColumnType[];
};
