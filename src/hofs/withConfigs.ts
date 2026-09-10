import { safeConfigs } from '@/utils';
import withData from './withData';

// withData 解包后写入配置 store，并返回声明形态
const withConfigs = (fn: any): any => {
  const load = withData(fn);
  return (params: any) => load(params).then((data: any) => (
    safeConfigs.set(data)
  ));
};

export default withConfigs;
