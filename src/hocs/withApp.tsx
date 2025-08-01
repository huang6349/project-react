import { App } from 'antd';

const withApp = (Component: any) => (() => (<App>
  <Component />
</App>));

export default withApp;
