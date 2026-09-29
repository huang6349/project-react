import type { MenuProps } from 'antd';

// useTenantMenu 的对外契约：菜单片段 + 包住外层 onClick 的分流器
// items 收窄掉 antd 的 undefined —— hook 恒返回数组，外层展开才不报 2488
export type UseTenantMenu = {
  items: NonNullable<MenuProps['items']>;
  withClick: WithClick;
};

// antd 的菜单点击处理器类型
export type MenuClick = NonNullable<MenuProps['onClick']>;

// 包住外层 onClick 的分流器：命中组织项时内置切换并短路，其余原样透传
export type WithClick = (onFallback: MenuClick) => MenuClick;
