import { eq } from 'lodash-es';

const withResponse = (fn?: any, ignore = !1): any => {
  return (({ data }: any = {}) => {
    const {
      success,
      data: res,
    } = data || {};
    if (eq(success, !0) ||
      eq(ignore, !0)
    ) fn?.(res || {});
  });
};

export default withResponse;
