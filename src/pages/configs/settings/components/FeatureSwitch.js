import { withResponse } from '@/hofs';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Switch } from 'antd';
import { List } from 'antd';
import { message } from '@/components';
import { useModel } from '@umijs/max';
import { eq } from 'lodash-es';
import { useRequest } from 'alova/client';
import service from '../service';

const FeatureSwitch = (props) => {
  // 1. Props 解构
  const {
    code,
    configs,
    field,
    loading,
    title,
    description,
  } = props;

  const {
    refresh,
  } = useModel('@@initialState');

  // 2. 内部状态：开关值快照与用户操作标记
  const [value, setValue] = useState(configs);
  const touched = useRef(!1);

  // 3. 初始值同步：configs 晚于行挂载返回时回填开关值（用户已操作则不覆盖）
  useEffect(() => {
    if (!touched.current)
      setValue(configs);
  }, [configs]);

  // 4. 提交请求
  const {
    loading: updating,
    send: update,
  } = useRequest((next) => (
    service.update({ code, configs: next })
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => {
    message.success('设置更新成功');
    // 重新拉取全局配置，开关即时生效
    refresh()?.catch(() => {
    });
  }));

  // 5. 事件处理
  const handleChange = async (enabled) => {
    touched.current = !0;
    const prev = value;
    // 乐观更新：先切换显示，失败再回滚
    const next = { ...prev, [field]: enabled };
    setValue(next);
    // 业务失败（success=false）与网络失败统一判为未成功，回滚到变更前
    const ok = await update(next)
      .then((res) => eq(res?.success, !0))
      .catch(() => !1);
    if (!ok) setValue(prev);
  };

  // 6. 渲染输出：加载中或提交中由 Switch 呈现 loading 态（自动禁用交互）
  const actions = [<Switch
    key={code}
    loading={loading || updating}
    checked={value?.[field] ?? !1}
    unCheckedChildren='关'
    checkedChildren='开'
    onChange={handleChange}
  />];

  return (<List.Item
    actions={actions}>
    <List.Item.Meta
      title={title}
      description={description} />
  </List.Item>);
};

// 默认属性
FeatureSwitch.defaultProps = {
  configs: {},
  field: 'enabled',
  loading: !1,
};

export default FeatureSwitch;
