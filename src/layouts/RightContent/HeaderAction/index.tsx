import type { SpanProps } from './types';
import clsx from 'clsx';

const HeaderAction = (props: SpanProps) => {
  const {
    className: cls,
    ...spanProps
  } = props;
  return (<span
    className={clsx('umi-plugin-layout-action', cls)}
    {...spanProps}
  />);
};

export default HeaderAction;
