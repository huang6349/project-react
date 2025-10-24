import type { SpanProps } from './types';
import clsx from 'clsx';

const HeaderName = (props: SpanProps & {
  name?: string;
}) => {
  const {
    className: cls,
    name,
    ...spanProps
  } = props;
  return (<span
    className={clsx('umi-plugin-layout-name', cls)}
    {...spanProps}>
    {name ?? '匿名'}
  </span>);
};

export default HeaderName;
