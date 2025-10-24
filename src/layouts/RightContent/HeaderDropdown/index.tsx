import type { DropdownProps } from 'antd';
import { Dropdown } from 'antd';
import clsx from 'clsx';

const HeaderDropdown = (props: DropdownProps) => {
  const {
    overlayClassName: cls,
    ...dropdownProps
  } = props;
  return (<Dropdown
    overlayClassName={clsx('umi-plugin-layout-container', cls)}
    {...dropdownProps}
  />);
};

export default HeaderDropdown;
