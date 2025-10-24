import type { DivProps } from './types';
import clsx from 'clsx';

const HeaderWrapper = (props: DivProps) => {
  const {
    className: cls,
    ...divProps
  } = props;
  return (<div
    className={clsx('umi-plugin-layout-right', 'anticon', cls)}
    {...divProps}
  />);
};

export default HeaderWrapper;
