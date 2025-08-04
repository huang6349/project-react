import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import type { ProDescriptionsProps } from '@ant-design/pro-components';
import type { ProCardProps } from '@ant-design/pro-components';

export type DescriptionsColumnType = ProDescriptionsItemProps;

export type DescriptionsProps = Omit<ProDescriptionsProps<any, any>, 'columns'> & {
  bordered?: ProCardProps['bordered'];
  title?: ProCardProps['title'];
  columns: DescriptionsColumnType[];
}
