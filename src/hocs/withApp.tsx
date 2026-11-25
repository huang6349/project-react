import { SysProvider } from '@/components';
import { App } from 'antd';

const withApp = (Component: any) => (() => (<App>
  <SysProvider>
    <Component />
  </SysProvider>
</App>));

export default withApp;
