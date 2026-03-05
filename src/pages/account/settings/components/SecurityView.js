import { useRef } from 'react';
import { ProForm } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-components';
import { useRequest } from 'alova/client';
import { withResponse } from '@/hofs';
import { message } from '@/components';
import service from '../service';

const SecurityView = () => {
  const formRef = useRef();

  const {
    send: update,
  } = useRequest((data) => (
    service.update(data)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => (
    message.success('修改密码成功，新密码将在下次登录时生效')
  )));

  const handleFinish = (values) => (
    update(values)
  );

  return (<ProForm
    className='mt-4'
    formRef={formRef}
    onFinish={handleFinish}>
    <ProForm.Group>
      <ProFormText.Password
        width='md'
        placeholder='请输入密码'
        name='oldPassword'
        label='旧的密码' />
    </ProForm.Group>
    <ProForm.Group>
      <ProFormText.Password
        width='md'
        placeholder='请输入密码'
        name='newPassword'
        label='新的密码'
        rules={[{ required: !0 }]} />
    </ProForm.Group>
    <ProForm.Group>
      <ProFormText.Password
        width='md'
        placeholder='请输入密码'
        name='confirm'
        label='确认密码'
        rules={[{ required: !0 }]} />
    </ProForm.Group>
  </ProForm>);
};

export default SecurityView;
