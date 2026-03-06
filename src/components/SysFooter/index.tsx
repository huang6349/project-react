import type { FooterProps } from './types';
import { DefaultFooter } from '@ant-design/pro-components';
import clsx from 'clsx';

const SysFooter = (
  props: FooterProps,
) => {
  const {
    className: cls,
    ...footerProps
  } = props;

  return (<DefaultFooter
    className={clsx('sys-footer', 'bg-transparent', cls)}
    copyright='2025 HYLONG'
    {...footerProps}
  />);
};

export default SysFooter;
