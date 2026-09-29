import { SWITCH_MSG_KEY } from './constants';
import { TENANT_KEY } from './constants';
import { withResponse } from '@/hofs';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { ApartmentOutlined } from '@ant-design/icons';
import { CheckOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { TeamOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { isEmpty } from 'lodash-es';
import { replace } from 'lodash-es';
import { startsWith } from 'lodash-es';
import { message } from '@/components';
import { useTenants } from '@/hooks';
import { useUser } from '@/hooks';
import { safeEq } from '@/utils';
import { useRequest } from 'alova/client';
import service from './service';

// 头像菜单的组织切换模块：数据与切换链路在此，片段由外层按 access.$tenant$switch 挂载
/** @returns {import('./types').UseTenantMenu} */
const useTenantMenu = () => {
  // 1. State & Hooks —— 可切换组织已在 getInitialState 阶段拉好，这里只订阅
  const {
    loading: refreshing,
    refresh,
  } = useModel('@@initialState');

  const {
    tenants,
  } = useTenants();

  const {
    tenantId,
  } = useUser();

  // 目标组织 id —— loading 只有布尔值，给不了「是哪一个」
  const [target, setTarget] = useState(null);

  // 本次已提示过成功，防 .onComplete 把同 key 的成功提示又关掉
  const succeeded = useRef(!1);

  // 卸载时收掉残留的加载提示 —— 它 duration 是 0，没人关就永远挂着
  useEffect(() => () => {
    message?.destroy(SWITCH_MSG_KEY);
  }, []);

  // 2. 数据交互：PUT 在途或刷新在途都算切换中，驱动入口守卫与菜单项 disabled
  const {
    loading: requesting,
    send: switchTo,
  } = useRequest((id) => (
    service.switchTenant(id)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => {
    succeeded.current = !0;
    // 与 loading 同 key 顶掉，不留「先消失再出现」那道缝
    message?.success({ content: '组织切换成功', key: SWITCH_MSG_KEY });
    // 重跑 getInitialState 刷新三处 store，新引用触发 umi 重算 access
    refresh()?.catch(() => {
    });
  })).onComplete(() => {
    // 成功/失败都会走到这里，收掉残留的加载提示；成功那条已被同 key 顶掉
    if (succeeded.current) return;
    message?.destroy(SWITCH_MSG_KEY);
  });

  // 切换中 = PUT 在途 或 刷新在途
  const switching = requesting || refreshing;

  // 切换结束后丢掉目标，避免它残留到下一次无关 refresh 时误转圈
  useEffect(() => {
    if (!switching) setTarget(null);
  }, [switching]);

  // 3. 事件处理：链路与失败提示都在上面，这里只判该不该切
  //    入口守卫不能省 —— disabled 只拦鼠标，键盘 ENTER 不受它约束
  const handleSwitch = (id) => {
    if (switching) return;
    if (isEmpty(id)) return;
    if (safeEq(id, tenantId)) return;
    succeeded.current = !1;
    // duration 0 不自动关，只能由 .onComplete destroy
    message?.loading({
      content: '正在切换组织',
      key: SWITCH_MSG_KEY,
      duration: 0,
    });
    setTarget(id);
    switchTo(id);
  };

  // 4. 菜单片段：自带分隔线，取不到数据时整段为空，不留悬空 divider
  const items = useMemo(() => (
    tenants?.length ? [{
      key: 'tenant-menu',
      label: (<>
        <TeamOutlined />
        切换组织
      </>),
      // 目标转圈、当前打勾、其余公寓图标；不用 selectedKeys，避免染成主题蓝
      children: tenants?.map(({ label, value }) => ({
        key: `${TENANT_KEY}${value}`,
        // 切换期间禁用（含刷新），连点击冒泡一起拦
        disabled: switching,
        icon: switching && safeEq(value, target) ?
          <LoadingOutlined spin /> :
          safeEq(value, tenantId) ?
            <CheckOutlined /> :
            <ApartmentOutlined />,
        // 后端可能不返回组织名，缺省时回落到这个占位
        label: label ?? '未选择组织',
      })),
    }, {
      type: 'divider',
    }] : []
  ), [tenants, switching, target, tenantId]);

  // 5. 点击封装（高阶函数）：命中组织项内置切换并短路，其余透传给外层
  const withClick = (onFallback) => (info) => {
    if (startsWith(info.key, TENANT_KEY)) {
      handleSwitch(replace(info.key, TENANT_KEY, ''));
    } else onFallback(info);
  };

  return {
    items,
    withClick,
  };
};

export default useTenantMenu;
