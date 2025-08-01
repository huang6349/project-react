import type { FormSchema } from '@ant-design/pro-form/es/components/SchemaForm';
import { BetaSchemaForm } from '@ant-design/pro-components';

const SchemaForm = (props: FormSchema<any, any>) => {
  return (<BetaSchemaForm
    requiredMark={!0}
    {...props}
  />);
};

export default SchemaForm;
