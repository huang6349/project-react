import type { MenuProps } from 'antd';
import { useCallback } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { useModel } from '@umijs/max';
import { useAccess } from '@umijs/max';
import { invalidateCache } from 'alova';
import { safeToken } from '@/utils';
import { eq } from 'lodash-es';
import { modal } from '@/components';
import HeaderDropdown from '../HeaderDropdown';
import HeaderAction from '../HeaderAction';
import HeaderAvatar from '../HeaderAvatar';
import HeaderName from '../HeaderName';

const HeaderAvatarDropdown = () => {
  const {
    initialState,
  } = useModel('@@initialState');

  const access = useAccess();

  const items: MenuProps['items'] = [{
    key: 'settings',
    label: (<>
      <UserOutlined />
      个人设置
    </>),
  }, {
    key: 'system',
    label: (<>
      <SettingOutlined />
      系统设置
    </>),
    disabled: !access?.$tenant$query,
  }, {
    type: 'divider',
  }, {
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
      else if (eq(key, 'system')) history?.push('/tenant/settings');
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
