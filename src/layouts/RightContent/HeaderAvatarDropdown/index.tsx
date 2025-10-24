import type { MenuProps } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import HeaderAction from '../HeaderAction';
import HeaderAvatar from '../HeaderAvatar';
import HeaderName from '../HeaderName';
import { LogoutOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { history } from '@umijs/max';
import { useModel } from '@umijs/max';
import { modal } from '@/components';
import { eq } from 'lodash-es';
import { invalidateCache } from 'alova';
import { safeToken } from '@/utils';

const HeaderAvatarDropdown = () => {
  const { initialState } = useModel('@@initialState');

  const items: MenuProps['items'] = [{
    key: 'logout',
    label: (<>
      <LogoutOutlined />
      退出登录
    </>),
  }];

  const menu: MenuProps = {
    className: 'umi-plugin-layout-menu',
    selectedKeys: [],
    items,
    onClick({ key }) {
      if (eq(key, 'logout')) logout();
      else history?.push(`/account/${key}`);
    },
  };

  const logout = useCallback(() => {
    modal?.confirm({
      content: '你确定要退出登录吗',
      title: '退出提示',
      async onOk() {
        await invalidateCache();
        await safeToken.remove();
        history?.replace('/login');
      },
    });
  }, []);

  return (<HeaderDropdown menu={menu}>
    <HeaderAction>
      <HeaderAvatar src={initialState?.avatar} />
      <HeaderName name={initialState?.name} />
    </HeaderAction>
  </HeaderDropdown>);
};

export default HeaderAvatarDropdown;
