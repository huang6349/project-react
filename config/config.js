import { defineConfig } from '@umijs/max';
import routes from './routes';
import proxy from './proxy';
import theme from './theme';
import utoopack from './utoopack';

export default defineConfig({
  // 工程配置
  npmClient: 'pnpm',
  hash: !0,
  // 构建
  utoopack,
  // 路由与代理
  proxy: proxy.dev,
  routes,
  // 运行时
  layout: {},
  antd: { theme },
  access: {},
  model: {},
  initialState: {},
  valtio: {},
});
