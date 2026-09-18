import { withResponse } from '@/hofs';
import { useState } from 'react';
import { FeatureSwitch } from './';
import { List } from 'antd';
import { isUndefined } from 'lodash-es';
import { omit } from 'lodash-es';
import { set } from 'lodash-es';
import { useRequest } from 'alova/client';
import service from '../service';

// 开关清单：新增开关在此追加一项，列表随之自动对齐。
// path 为取值路径，缺省 ['enabled']；同 code 的开关共用一块 configs，必须同源，否则提交时互相覆盖。
// 用数组而非 'a.b' 字符串：lodash 遇到对象里已有的同名扁平键会把它当字面量键，数组没这层歧义
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

// 列表 key：同 code 的多个开关靠 path 区分。
// 用 || 而非 ??：path 是空数组时 join 出空串，那不算有效 key
const keyOf = (item) => item.path?.join('.') || item.code;

// 旧实现把多段 field 写成了顶层带点的扁平键，读入时按 path 搬进嵌套位置；
// 不搬则开关读不到值、会错误回显为「关」，两种形状还会一起写回后端。后端完成迁移后可撤
const normalize = (data) => {
  const next = { ...(data ?? {}) };
  FEATURES.forEach(({ code, path }) => {
    if ((path?.length ?? 0) < 2) return;   // 单段路径没有扁平键可搬
    const flat = path.join('.');
    const value = next[code]?.[flat];      // 可选链顺带挡掉块不是对象的情况
    if (isUndefined(value)) return;
    next[code] = set(omit(next[code], flat), path, value);
  });
  return next;
};

const FeatureView = () => {
  // 1. 配置快照，null 表示尚未成功加载；同 code 的开关共用这一块，各持副本会互相覆盖
  const [configs, setConfigs] = useState(null);

  // 2. 各块是否有提交在途：整块覆盖提交不能并发，在途时同块其余开关一并 loading，
  //    按 code 记录，跨块的同时提交互不干扰
  const [pendingCodes, setPendingCodes] = useState({});

  // 3. 进页面拉一次系统配置。不走 useConfigs()：全局那份将来会混用户配置，与编辑态数据源会分叉
  const {
    loading,
  } = useRequest(() => (
    service.configs()
  )).onSuccess(withResponse((data) => (
    setConfigs(normalize(data))
  )));

  // 4. 子级提交前后上报本块在途状态
  const onBlockPending = (code) => (pending) => setPendingCodes((cur) => {
    const next = { ...cur };
    if (pending) next[code] = !0;
    else delete next[code];
    return next;
  });

  // 5. 乐观更新与失败回滚都回写到这里；入参是「拿当前块算新块」的函数，
  //    回滚时才能只恢复自己那个字段
  const onBlockChange = (code) => (updater) => (
    setConfigs((cur) => ({ ...cur, [code]: updater(cur?.[code]) }))
  );

  // 6. 请求已结束却仍没拿到配置即为拉取失败，下发整块只读，
  //    避免用户对着空表单操作把残缺配置写回；失败提示由 safeRequest 统一弹出
  const loadFailed = !configs && !loading;

  // 7. 渲染输出：行文案是静态的，可直接显示
  return (<List
    itemLayout='horizontal'>
    {FEATURES.map((item) => (
      <FeatureSwitch
        key={keyOf(item)}
        code={item.code}
        configs={configs?.[item.code]}
        path={item.path}
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
