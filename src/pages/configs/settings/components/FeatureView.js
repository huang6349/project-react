import { withResponse } from '@/hofs';
import { useState } from 'react';
import { FeatureSwitch } from './';
import { List } from 'antd';
import { useRequest } from 'alova/client';
import service from '../service';

// 开关配置项清单：新增开关在此追加一项，列表随之自动对齐
const FEATURES = [{
  code: 'ai',
  title: '智能助手',
  description: '启用后可使用 AI 智能助手功能',
}];

const FeatureView = () => {
  // 1. 内部状态：全量配置快照
  const [configs, setConfigs] = useState({});

  // 2. 查询请求：进入页面拉取最新配置
  const {
    loading,
  } = useRequest(() => (
    service.configs()
  )).onSuccess(withResponse((data) => (
    setConfigs(data ?? {})
  )));

  // 3. 渲染输出：行文案为静态配置可直接显示，加载期由 Switch 呈现 loading 态
  return (<List
    itemLayout='horizontal'>
    {FEATURES.map((item) => (
      <FeatureSwitch
        key={item.code}
        code={item.code}
        configs={configs?.[item.code]}
        loading={loading}
        title={item.title}
        description={item.description}
      />
    ))}
  </List>);
};

export default FeatureView;
