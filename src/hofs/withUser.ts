import { safeUser } from '@/utils';
import withData from './withData';

// withData 解包后写入用户 store，并返回声明形态
const withUser = (fn: any): any => {
  const load = withData(fn);
  return async (params: any) => (
    safeUser.set(await load(params))
  );
};

export default withUser;
