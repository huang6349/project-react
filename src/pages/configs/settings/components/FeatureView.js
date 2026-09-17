import { withResponse } from '@/hofs';
import { useState } from 'react';
import { FeatureSwitch } from './';
import { List } from 'antd';
import { useRequest } from 'alova/client';
import service from '../service';

// 开关配置项清单：新增开关在此追加一项，列表随之自动对齐。
// field 支持点号路径：同一个 code 下可以有多个开关，
// 但它们的值同属一块 configs，必须共用同一个状态源，否则提交时会互相覆盖
const FEATURES = [{
  code: 'tenant',
  title: '多租户模式',
  desc: '开启后不同租户的数据相互隔离，互不可见',
}, {
  code: 'iot',
  title: '物联网',
  desc: '开启后可接入物联网设备',
}, {
  code: 'ai',
  title: '智能助手',
  desc: '开启后可使用 AI 智能助手',
}];

const FeatureView = () => {
  // 1. 内部状态：全量配置快照，初始 null 表示尚未成功加载。
  //    同一 code 下的多个开关共用这一块，各自不再持有副本，避免提交时互相覆盖
  const [configs, setConfigs] = useState(null);

  // 2. 提交中标记：后端按整块覆盖，同块并发提交会互相覆盖，
  //    任一行在途时把同块其余开关一并置为 loading，从源头避免交错。
  //    按 code 分别记录，跨块的同时提交互不干扰
  const [pendingCodes, setPendingCodes] = useState({});

  // 3. 查询请求：进页面拉一次原始系统配置。
  //    不走 useConfigs()：全局那份将来会混用户配置，与这里的编辑态数据源会分叉
  const {
    loading,
  } = useRequest(() => (
    service.configs()
  )).onSuccess(withResponse((data) => (
    setConfigs(data ?? {})
  )));

  // 4. 子级提交前后标记本块是否有提交在途，按 code 增删
  const onBlockPending = (code) => (pending) => setPendingCodes((cur) => {
    const next = { ...cur };
    if (pending) next[code] = !0;
    else delete next[code];
    return next;
  });

  // 5. 子级的乐观更新与失败回滚统一回写到这里。
  //    入参是「拿当前块算出新块」的函数，回滚时就能只恢复自己那个字段
  const onBlockChange = (code) => (updater) => (
    setConfigs((cur) => ({ ...cur, [code]: updater(cur?.[code]) }))
  );

  // 6. 拉取失败：请求已结束却仍没拿到配置（失败提示由 safeRequest 统一弹出）。
  //    此时下发给整块置只读，避免用户对着空表单操作、把残缺配置整块写回
  const loadFailed = !configs && !loading;

  // 7. 渲染输出：行文案为静态配置可直接显示
  return (<List
    itemLayout='horizontal'>
    {FEATURES.map((item) => (
      <FeatureSwitch
        key={item.field ?? item.code}
        code={item.code}
        configs={configs?.[item.code]}
        field={item.field}
        loading={loading}
        loadFailed={loadFailed}
        pending={!!pendingCodes[item.code]}
        title={item.title}
        desc={item.desc}
        onBlockPending={onBlockPending(item.code)}
        onBlockChange={onBlockChange(item.code)}
      />
    ))}
  </List>);
};

export default FeatureView;
