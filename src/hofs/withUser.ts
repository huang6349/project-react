import { safeUser } from '@/utils';
import withData from './withData';

// withData 解包后交给 safeUser 写入 store
const withUser = (fn: any): any => (
  safeUser.wrap(withData(fn))
);

export default withUser;
