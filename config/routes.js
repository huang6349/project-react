const $system$tenant = [{
  path: '/system/tenant/user/create',
  component: '@/pages/system/tenant/user/save',
  name: '邀请用户',
  access: '$tenant$create',
  hideInMenu: !0,
}, {
  path: '/system/tenant/user/update',
  component: '@/pages/system/tenant/user/save',
  name: '编辑用户',
  access: '$tenant$update',
  hideInMenu: !0,
}, {
  path: '/system/tenant/user/view',
  component: '@/pages/system/tenant/user/view',
  name: '用户详情',
  access: '$tenant$query',
  hideInMenu: !0,
}, {
  path: '/system/tenant/create',
  component: '@/pages/system/tenant/save',
  name: '新建组织',
  access: '$tenant$create',
  hideInMenu: !0,
}, {
  path: '/system/tenant/update',
  component: '@/pages/system/tenant/save',
  name: '编辑组织',
  access: '$tenant$update',
  hideInMenu: !0,
}, {
  path: '/system/tenant/view',
  component: '@/pages/system/tenant/view',
  name: '组织详情',
  access: '$tenant$query',
  hideInMenu: !0,
}, {
  path: '/system/tenant',
  component: '@/pages/system/tenant',
}];

const $system$user = [{
  path: '/system/user',
  component: '@/pages/system/user',
}];

const $system$role = [{
  path: '/system/role',
  component: '@/pages/system/role',
}];

const $system$perm = [{
  path: '/system/perm',
  component: '@/pages/system/perm',
}];

const $system = [{
  path: '/system/tenant',
  name: '组织管理',
  icon: 'TeamOutlined',
  access: '$system$tenant',
  routes: $system$tenant,
}, {
  path: '/system/user',
  name: '用户管理',
  icon: 'UserOutlined',
  access: '$system$user',
  routes: $system$user,
}, {
  path: '/system/role',
  name: '角色管理',
  icon: 'UserSwitchOutlined',
  access: '$system$role',
  routes: $system$role,
}, {
  path: '/system/perm',
  name: '权限管理',
  icon: 'SafetyOutlined',
  access: '$system$perm',
  routes: $system$perm,
}, {
  path: '/system',
  component: '@/pages/system',
}];

const routes = [{
  path: '/system',
  name: '系统管理',
  icon: 'SettingOutlined',
  access: '$system',
  routes: $system,
}, {
  path: '/login',
  component: '@/pages/login',
  name: '登录',
  headerRender: !1,
  footerRender: !1,
  menuRender: !1,
  menuHeaderRender: !1,
  hideInMenu: !0,
}, {
  path: '/',
  component: '@/pages',
}];

export default routes;
