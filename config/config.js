import { defineConfig } from '@umijs/max';
import routes from './routes';
import proxy from './proxy';
import theme from './theme';
import extraBabelPlugins from './extraBabelPlugins';

export default defineConfig({
  npmClient: 'pnpm',
  hash: !0,
  mako: !1,
  mfsu: !0,
  proxy: proxy.dev,
  routes,
  extraBabelPlugins,
  layout: {},
  antd: { theme },
  access: {},
  model: {},
  initialState: {},
  valtio: {},
});
