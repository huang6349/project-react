import localforage from 'localforage';
import {
  TOKEN_NAME,
} from '@/constants';

const safeToken = {
  /* 获取令牌 */
  get: () => (
    localforage.getItem<string>(TOKEN_NAME)
  ),
  /* 设置令牌 */
  set: (token: string) => (
    localforage.setItem<string>(TOKEN_NAME, token)
  ),
  /* 删除令牌 */
  remove: () => (
    localforage.removeItem(TOKEN_NAME)
  ),
};

export default safeToken;
