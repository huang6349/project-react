import type { ButtonProps } from 'antd';
import { useNavigate } from '@umijs/max';
import { Button } from 'antd';

const SysBack = (props: ButtonProps & {
  label?: string;
}) => {
  const navigate = useNavigate();

  const {
    onClick,
    label,
    ...buttonProps
  } = props;

  return (<Button
    type='primary'
    {...buttonProps}
    onClick={(event) => {
      onClick?.(event);
      navigate(-1);
    }}>
    {label}
  </Button>);
};

SysBack.defaultProps = {
  label: '返回',
};

export default SysBack;
