import { useCallback } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { useAccess } from '@umijs/max';
import { useUser } from '@/hooks';
import { history } from '@umijs/max';
import { invalidateCache } from 'alova';
import { safeToken } from '@/utils';
import { safeEq } from '@/utils';
import { modal } from '@/components';
import HeaderDropdown from '../HeaderDropdown';
import HeaderAction from '../HeaderAction';
import HeaderAvatar from '../HeaderAvatar';
import HeaderName from '../HeaderName';
import useTenantMenu from './useTenantMenu';

const routeMap = {
  configs: '/configs/settings',
  account: '/account/settings',
};

const HeaderAvatarDropdown = () => {
  const access = useAccess();

  const {
    items: tenantItems,
    withClick: tenantClick,
  } = useTenantMenu();

  const {
    name,
    avatar,
  } = useUser();

  const items = [
    // 组织切换片段：租户功能开启才渲染，自带分隔线，数据与切换逻辑都在 useTenantMenu
    ...(access?.$tenant$switch ? tenantItems : []),
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
    },
  ];

  const menu = {
    className: 'umi-plugin-layout-menu',
    selectedKeys: [],
    items,
    onClick: tenantClick(({ key }) => {
      if (safeEq(key, 'logout')) return logout();
      history?.push(routeMap[key] ?? '/');
    }),
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
      <HeaderAvatar src={avatar} />
      <HeaderName name={name} />
    </HeaderAction>
  </HeaderDropdown>);
};

export default HeaderAvatarDropdown;
