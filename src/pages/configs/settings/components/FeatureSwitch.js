import { withResponse } from '@/hofs';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Switch } from 'antd';
import { List } from 'antd';
import { Tooltip } from 'antd';
import { message } from '@/components';
import { useModel } from '@umijs/max';
import { omit } from 'lodash-es';
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
    desc,
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

  // 只读标记由配置块下发，缺省视为可编辑
  const {
    readonly = !1,
  } = configs ?? {};

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
    // 剔除后端下发的只读标记，避免连同 enabled 一起回传
    const ok = await update(omit(next, 'readonly'))
      .then((res) => eq(res?.success, !0))
      .catch(() => !1);
    // 业务失败（success=false）与网络失败统一判为未成功，回滚到变更前
    if (!ok) setValue(prev);
  };

  // 6. 渲染输出：加载中或提交中由 Switch 呈现 loading 态（自动禁用交互）
  const control = <Switch
    key={code}
    loading={loading || updating}
    disabled={readonly}
    checked={value?.[field] ?? !1}
    unCheckedChildren='关'
    checkedChildren='开'
    onChange={handleChange}
  />;

  // 只读态包一层 span 承接事件：disabled 的 Switch 自身不触发鼠标事件，Tooltip 会失效
  const actions = [readonly ? (
    <Tooltip key={code} title='该配置由系统统一管理，暂不支持修改'>
      <span className='inline-flex'>{control}</span>
    </Tooltip>
  ) : control];

  return (<List.Item
    actions={actions}>
    <List.Item.Meta
      title={title}
      description={desc} />
  </List.Item>);
};

// 默认属性
FeatureSwitch.defaultProps = {
  configs: {},
  field: 'enabled',
  loading: !1,
};

export default FeatureSwitch;
