import type { FormSchema } from '@ant-design/pro-form/es/components/SchemaForm';
import type { ProCardProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import SchemaForm from './SchemaForm';

const SysForm: {
  SchemaForm: typeof SchemaForm;
} = (props: FormSchema<any, any> & {
  cardProps?: ProCardProps,
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
