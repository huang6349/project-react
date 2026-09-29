import { safeTenant } from '@/utils';
import withData from './withData';

// withData 解包 {success,data} 后交给 safeTenant 写入 store
const withTenant = (fn: any): any => (
  safeTenant.wrap(withData(fn))
);

export default withTenant;
