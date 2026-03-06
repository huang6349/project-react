import type { BackProps } from './types';
import { useNavigate } from '@umijs/max';
import { SysButton } from '@/components';
import clsx from 'clsx';

const SysBack = (
  props: BackProps,
) => {
  const navigate = useNavigate();

  const {
    className: cls,
    onClick,
    label,
    ...buttonProps
  } = props;

  return (<SysButton
    className={clsx('sys-back', cls)}
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
