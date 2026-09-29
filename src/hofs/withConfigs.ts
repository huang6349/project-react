import { safeConfigs } from '@/utils';
import withData from './withData';

// withData 解包后交给 safeConfigs 写入 store
const withConfigs = (fn: any): any => (
  safeConfigs.wrap(withData(fn))
);

export default withConfigs;
