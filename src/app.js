import { RightContent } from '@/layouts/RightContent';
import { SysFooter } from '@/components';
import { queryUser } from '@/services';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config
export const getInitialState = async () => {
  const {
    perms,
    roles,
    user,
  } = await queryUser();
  const {
    username,
    nickname,
    avatar,
  } = user ?? {};
  return {
    avatar,
    name: nickname ?? username,
    perms: perms ?? [],
    roles: roles ?? [],
  };
};

const bgLayoutImgList = [{
  src: require('@/assets/tps-609-606.png'),
  left: 85,
  bottom: 100,
  height: '303px',
}, {
  src: require('@/assets/tps-609-606.png'),
  bottom: -68,
  right: -45,
  height: '303px',
}, {
  src: require('@/assets/tps-884-496.png'),
  bottom: 0,
  left: 0,
  width: '331px',
}];

export const layout = () => ({
  layout: 'mix',
  title: '前端应用框架模版',
  logo: require('@/assets/logo.jpg'),
  bgLayoutImgList,
  defaultCollapsed: !0,
  contentWidth: 'Fluid',
  fixedHeader: !1,
  fixSiderbar: !0,
  breakpoint: !1,
  colorWeak: !1,
  disableMobile: !0,
  splitMenus: !0,
  rightContentRender: () =>
    <RightContent />,
  footerRender: () =>
    <SysFooter />,
});

export const antd = (memo) => {
  memo.theme ??= {};
  return memo;
};
