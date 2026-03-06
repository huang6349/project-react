import type { LinkProps } from './types';
import { SysButton } from '@/components';
import clsx from 'clsx';

const SysLink = (
  props: LinkProps,
) => {
  const {
    className: cls,
    ...linkProps
  } = props;

  return (<SysButton
    className={clsx('sys-link', 'h-auto', 'p-0', cls)}
    type='link'
    {...linkProps}
  />);
};

export default SysLink;
