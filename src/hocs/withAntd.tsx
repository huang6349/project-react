import { withApp } from '@/hocs';
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

export let notification: NotificationInstance;
export let message: MessageInstance;
export let modal: Omit<ModalStaticFunctions, 'warn'>;

const withAntd = (Component: any) => withApp(() => {
  const staticFunction = App.useApp();
  notification = staticFunction.notification;
  message = staticFunction.message;
  modal = staticFunction.modal;
  return <Component />;
});

export default withAntd;
