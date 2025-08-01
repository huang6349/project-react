const prod = {};

const dev = {
  '/api': {
    target: 'http://127.0.0.1:8088/',
    pathRewrite: { '^/api': '' },
    secure: !1,
    changeOrigin: !0,
  },
};

export default {
  prod,
  dev,
};
