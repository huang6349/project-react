import type { FormColumnType } from './types';
import type { FormProps } from './types';
import type { ProCardProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import SchemaForm from './SchemaForm';

const SysForm = (props: FormProps & {
  bordered?: ProCardProps['bordered'];
  ghost?: ProCardProps['ghost'];
  cardProps?: ProCardProps,
  columns: FormColumnType[];
}) => {
  const {
    bordered,
    ghost,
    cardProps,
    ...formSchema
  } = props;

  return (<ProCard
    bordered={bordered}
    ghost={ghost}
    {...cardProps}>
    <SchemaForm {...formSchema} />
  </ProCard>);
};

SysForm.SchemaForm = SchemaForm;

SysForm.defaultProps = {
  bordered: !0,
  ghost: !1,
};

export default SysForm;
