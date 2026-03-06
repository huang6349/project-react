import type { FormProps } from './types';
import { ProCard } from '@ant-design/pro-components';
import SchemaForm from './SchemaForm';
import clsx from 'clsx';

const SysForm = (
  props: FormProps,
) => {
  const {
    className: cls,
    bordered,
    ghost,
    cardProps,
    ...formSchema
  } = props;

  return (<ProCard
    className={clsx('sys-form', cls)}
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
