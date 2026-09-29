import clsx from 'clsx';

const HeaderName = (props) => {
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
