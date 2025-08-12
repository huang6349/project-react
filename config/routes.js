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
  path: '/system/user/create',
  component: '@/pages/system/user/save',
  name: '新建用户',
  access: '$user$create',
  hideInMenu: !0,
}, {
  path: '/system/user/update',
  component: '@/pages/system/user/save',
  name: '编辑用户',
  access: '$user$update',
  hideInMenu: !0,
}, {
  path: '/system/user/view',
  component: '@/pages/system/user/view',
  name: '用户详情',
  access: '$user$query',
  hideInMenu: !0,
}, {
  path: '/system/user',
  component: '@/pages/system/user',
}];

const $system$role = [{
  path: '/system/role/create',
  component: '@/pages/system/role/save',
  name: '新建角色',
  access: '$role$create',
  hideInMenu: !0,
}, {
  path: '/system/role/update',
  component: '@/pages/system/role/save',
  name: '编辑角色',
  access: '$role$update',
  hideInMenu: !0,
}, {
  path: '/system/role/view',
  component: '@/pages/system/role/view',
  name: '角色详情',
  access: '$role$query',
  hideInMenu: !0,
}, {
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
