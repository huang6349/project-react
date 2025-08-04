import type { FormColumnType } from './types';
import type { FormProps } from './types';
import type { ProCardProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import SchemaForm from './SchemaForm';

const SysForm: {
  SchemaForm: typeof SchemaForm;
} = (props: FormProps & {
  cardProps?: ProCardProps,
  columns: FormColumnType[];
}) => {
  const {
    cardProps,
    ...formSchema
  } = props;

  return (<ProCard
    bordered={!0}
    {...cardProps}>
    <SchemaForm {...formSchema} />
  </ProCard>);
};

SysForm.SchemaForm = SchemaForm;

export default SysForm;
