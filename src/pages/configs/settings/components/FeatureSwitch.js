import { withResponse } from '@/hofs';
import { Switch } from 'antd';
import { List } from 'antd';
import { Tooltip } from 'antd';
import { message } from '@/components';
import { useModel } from '@umijs/max';
import { cloneDeep } from 'lodash-es';
import { omit } from 'lodash-es';
import { eq } from 'lodash-es';
import { get } from 'lodash-es';
import { set } from 'lodash-es';
import { useRequest } from 'alova/client';
import service from '../service';

// 只读提示分两种：系统统一管理的锁定，与配置没拉到导致整块不可用
const READONLY_TIP = '该配置由系统统一管理，暂不支持修改';
const LOAD_FAILED_TIP = '配置加载失败，请刷新页面重试';

// 值不存本地：同一 code 下可能有多个开关共用一块 configs，
// 各持副本会在提交时互相覆盖，所以值由父级持有、这里改完立刻回写
const FeatureSwitch = (props) => {
  // 1. configs 是「自己这一块」配置；只读标记由它下发，缺省视为可编辑
  const {
    code,
    configs,
    field,
    loading,
    loadFailed,
    pending,
    title,
    desc,
    onBlockPending,
    onBlockChange,
  } = props;

  const {
    refresh,
  } = useModel('@@initialState');

  // 只读标记由整块顶层下发，缺省视为可编辑
  const {
    readonly = !1,
  } = configs ?? {};

  // loadFailed 是父级在配置拉取失败时下发的整块只读，两者任一为真即禁用
  const disabled = readonly || loadFailed;

  // 2. 后端按整块覆盖存储，所以每次提交都要带上当前最新的整块
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

  // 3. field 支持点号路径，读写都要走 lodash 才会落到嵌套层
  const handleChange = async (enabled) => {
    const prev = configs ?? {};
    // 乐观更新：先切换显示，失败再回滚
    const next = set(cloneDeep(prev), field, enabled);
    onBlockChange?.(() => next);
    // 整块覆盖提交期间锁住同块其余开关，避免两笔并发各带一份快照互相覆盖；
    // 解锁放在 finally，任何异常都不会把这一块永久锁在 loading 上
    onBlockPending?.(!0);
    // 剔除后端下发的只读标记，避免连同 enabled 一起回传
    const ok = await update(omit(next, 'readonly'))
      .then((res) => eq(res?.success, !0))
      .catch(() => !1)
      .finally(() => onBlockPending?.(!1));
    // 业务失败与网络失败统一判为未成功。只恢复自己那个字段，
    // 同块里兄弟开关改过的字段保留
    if (!ok) onBlockChange?.((cur) => (
      set(cloneDeep(cur ?? {}), field, get(prev, field))
    ));
  };

  // 4. 加载中、提交中、同块提交中一律由 Switch 自带的 loading 呈现（自动禁用交互）
  const control = <Switch
    loading={loading || updating || pending}
    disabled={disabled}
    checked={get(configs, field) ?? !1}
    unCheckedChildren='关'
    checkedChildren='开'
    onChange={handleChange}
  />;

  // 禁用原因不同，提示文案也不同
  const disabledTip = loadFailed ? LOAD_FAILED_TIP : READONLY_TIP;

  // 只读态包一层 span 承接事件：disabled 的 Switch 自身不触发鼠标事件，Tooltip 会失效
  const actions = [disabled ? (
    <Tooltip title={disabledTip}>
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

FeatureSwitch.defaultProps = {
  configs: {},
  field: 'enabled',
  loading: !1,
  loadFailed: !1,
  pending: !1,
};

export default FeatureSwitch;
