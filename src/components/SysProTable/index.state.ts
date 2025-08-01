import { proxy } from '@umijs/max';
import { default as tl } from '../SysProTList/index.state';
import { default as tt } from '../SysTabs/index.state';

export type STATE = Record<string, Record<string, any>>;

export default proxy<STATE>({
  tl: tl,
  tt: tt,
});
