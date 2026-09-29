import clsx from 'clsx';

const HeaderWrapper = (props) => {
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
