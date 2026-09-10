import type { MenuProps } from 'antd';
import { useCallback } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { useAccess } from '@umijs/max';
import { useModel } from '@umijs/max';
import { invalidateCache } from 'alova';
import { safeToken } from '@/utils';
import { safeEq } from '@/utils';
import { modal } from '@/components';
import HeaderDropdown from '../HeaderDropdown';
import HeaderAction from '../HeaderAction';
import HeaderAvatar from '../HeaderAvatar';
import HeaderName from '../HeaderName';

const routeMap: Record<string, string> = {
  configs: '/configs/settings',
  account: '/account/settings',
};

const HeaderAvatarDropdown = () => {
  const {
    initialState,
  } = useModel('@@initialState');
  const access = useAccess();

  const items: MenuProps['items'] = [
    // 系统设置仅超管可见
    ...(access?.$configs ? [{
      key: 'configs',
      label: (<>
        <ControlOutlined />
        系统设置
      </>),
    }] : []),
    ...(access?.$account ? [{
      key: 'account',
      label: (<>
        <UserOutlined />
        个人设置
      </>),
    }] : []), {
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
      if (safeEq(key, 'logout')) return logout();
      history?.push(routeMap[key] ?? '/');
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
