import type { ButtonProps } from 'antd';
import { useNavigate } from '@umijs/max';
import { SysButton } from '@/components';

const SysBack = (props: ButtonProps & {
  invisible?: boolean | (() => boolean);
  label?: string;
}) => {
  const navigate = useNavigate();

  const {
    onClick,
    label,
    ...buttonProps
  } = props;

  return (<SysButton
    type='primary'
    {...buttonProps}
    onClick={(event) => {
      onClick?.(event);
      navigate(-1);
    }}>
    {label}
  </SysButton>);
};

SysBack.defaultProps = {
  label: '返回',
};

export default SysBack;
