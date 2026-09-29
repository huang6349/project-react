import clsx from 'clsx';

const HeaderAction = (props) => {
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
