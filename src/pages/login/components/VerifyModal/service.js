import { safeRequest } from '@/utils';

export const checkCaptcha = (data) => (
  safeRequest.Post(`/api/captcha/_check`, data)
);

export const genCaptcha = (data) => (
  safeRequest.Post(`/api/captcha/_gen`, data)
);

export default ({
  checkCaptcha,
  genCaptcha,
});
