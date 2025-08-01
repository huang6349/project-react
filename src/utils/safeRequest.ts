import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import ReactHook from 'alova/react';
import { notification } from '@/components';
import { message } from '@/components';
import { delay } from '@/utils';
import { safeToken } from '@/utils';
import { eq } from 'lodash-es';
import { TOKEN_NAME } from '@/constants';

const safeRequest = createAlova({
  requestAdapter: axiosRequestAdapter(),
  statesHook: ReactHook,
  shareRequest: !1,
  cacheFor: null,
  timeout: 5000,
  async beforeRequest(method) {
    method.config.headers[TOKEN_NAME] = await safeToken.get();
  },
  responded: {
    async onSuccess(response) {
      try {
        const {
          headers,
          // @ts-ignore
          data: res,
        } = response;
        await delay(350);
        const token = headers?.[TOKEN_NAME];
        token && await safeToken.set(token);
        const is = eq(res?.code, 401);
        is && await safeToken.remove();
        if (eq(res?.success, !1))
          errorThrower(res);
        const contentType = headers?.['content-type'];
        if (contentType?.includes('application/octet-stream'))
          downloadFile(headers, res);
        return res;
      } catch (error) {
        const {
          // @ts-ignore
          data: res,
        } = response;
        await errorHandler(error);
        return res;
      }
    },
    onError() {
      const errorMessage = '请求没有得到响应，请检查网络设置';
      message?.error(errorMessage);
    },
  },
});

const downloadFile = (headers: any, data: Blob) => {
  const contentDisposition = headers?.['content-disposition'];
  if (contentDisposition?.includes('filename=')) {
    // 提取文件名
    const filename = contentDisposition
      .split('filename=')[1]
      .split(';')[0]
      .replace(/['"]/g, '');
    if (!filename) return;
    // 创建下载链接
    const elink = document.createElement('a');
    elink.download = decodeURIComponent(filename); // 解码文件名
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(data);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放 URL 对象
    document.body.removeChild(elink);
  }
};

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

const errorHandler = async (error: any) => {
  if (eq(error.name, 'BizError')) {
    if (error.info) {
      const {
        errorMessage,
        errorCode,
        showType,
      } = error.info;
      switch (showType) {
        case ErrorShowType.SILENT:
          break;
        case ErrorShowType.WARN_MESSAGE:
          message?.warning(errorMessage);
          break;
        case ErrorShowType.ERROR_MESSAGE:
          message?.error(errorMessage);
          break;
        case ErrorShowType.REDIRECT:
          break;
        case ErrorShowType.NOTIFICATION:
          notification?.error({
            description: errorMessage,
            message: errorCode,
          });
          break;
        default:
          message?.error(errorMessage);
      }
    }
  } else {
    const errorMessage = '请求没有得到响应，请检查网络设置';
    message?.error(errorMessage);
  }
};

const errorThrower = (res: any) => {
  const {
    success,
    data,
    message: errorMessage,
    code: errorCode,
    showType,
  } = res;
  if (eq(success, !0)) return;
  const error: any = new Error(errorMessage);
  error.name = 'BizError';
  error.info = {
    data,
    errorMessage,
    errorCode,
    showType,
  };
  throw error;
};

export default safeRequest;
