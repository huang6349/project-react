import { get } from 'lodash-es';

// 不传 key 返回整个 data；传 key 走 lodash get，支持 'a.b' 深度路径
const withData = (fn: any, key?: string): any => (async (params: any) => {
  const {
    data: res,
  } = await fn?.(params) || {};
  return key ? get(res, key) : res;
});

export default withData;
