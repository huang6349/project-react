import { proxy } from '@umijs/max';

export type STATE = Record<string, Record<string, any>>;

export default proxy<STATE>({});
