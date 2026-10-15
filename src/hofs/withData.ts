import { get } from 'lodash-es';

// 不传 key 返回整个 data；传 key 走 lodash get，支持 'a.b' 深度路径
// 传 key 时缺块补空对象：该分支都是给表单回填的，ProForm 拿返回值真假收 loading，给 undefined 会一直转圈；
// 不传 key 的保持原样——那边有当选项数组用的，补成对象会让 pro-field 的 data.map 直接炸
const withData = (fn: any, key?: string): any => (async (params: any) => {
  const {
    data: res,
  } = await fn?.(params) || {};
  return key ? get(res, key) ?? {} : res;
});

export default withData;
