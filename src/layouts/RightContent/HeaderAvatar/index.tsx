import type { AvatarProps } from 'antd';
import { Avatar } from 'antd';
import clsx from 'clsx';

const HeaderAvatar = (props: AvatarProps) => {
  const {
    className: cls,
    src,
    ...avatarProps
  } = props;
  console.log(avatarProps);
  return (<Avatar
    className={clsx('umi-plugin-layout-avatar', cls)}
    alt='avatar'
    size='small'
    src={src ?? require('@/assets/avatar.jpg')}
    {...avatarProps}
  />);
};

export default HeaderAvatar;
