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

// 两种只读原因对应两种提示：系统统一管理的锁定 / 配置没拉到
const READONLY_TIP = '该配置由系统统一管理，暂不支持修改';
const LOAD_FAILED_TIP = '配置加载失败，请刷新页面重试';

// 值不存本地：同 code 的多个开关共用一块 configs，各持副本会在提交时互相覆盖，
// 所以值由父级持有、这里改完立刻回写
const FeatureSwitch = (props) => {
  // 1. configs 是「自己这一块」配置
  const {
    code,
    configs,
    path,
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

  // 2. 后端整块覆盖存储，每次提交都要带上当前最新的整块
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

  // 3. 读写都按 path 落到嵌套层
  const handleChange = async (enabled) => {
    const prev = configs ?? {};
    // 乐观更新：先切换显示，失败再回滚
    const next = set(cloneDeep(prev), path, enabled);
    onBlockChange?.(() => next);
    // 提交期间锁住同块其余开关（整块覆盖，两笔并发会互相覆盖）；
    // 解锁挂在 finally 上，请求失败也会释放
    onBlockPending?.(!0);
    // 剔除后端下发的只读标记，不随本次提交回传
    const ok = await update(omit(next, 'readonly'))
      .then((res) => eq(res?.success, !0))
      .catch(() => !1)
      .finally(() => onBlockPending?.(!1));
    // 业务失败与网络失败一律视为未成功，只回滚自己那个字段
    if (!ok) onBlockChange?.((cur) => (
      set(cloneDeep(cur ?? {}), path, get(prev, path))
    ));
  };

  // 4. 三种在途状态都交给 Switch 自带的 loading，它会一并禁用交互
  const control = <Switch
    loading={loading || updating || pending}
    disabled={disabled}
    checked={get(configs, path) ?? !1}
    unCheckedChildren='关'
    checkedChildren='开'
    onChange={handleChange}
  />;

  // 禁用原因不同，提示文案也不同
  const disabledTip = loadFailed ? LOAD_FAILED_TIP : READONLY_TIP;

  // disabled 的 Switch 不触发鼠标事件，包一层 span 才能让 Tooltip 生效
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
  path: ['enabled'],
  loading: !1,
  loadFailed: !1,
  pending: !1,
};

export default FeatureSwitch;
