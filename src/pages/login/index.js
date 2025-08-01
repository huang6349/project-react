import React from 'react';
import { withAntd } from '@/hocs';
import { withResponse } from '@/hofs';
import { SysFooter } from '@/components';
import { ProFormText } from '@ant-design/pro-components';
import { LoginForm } from '@ant-design/pro-components';
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import { useRequest } from 'alova/client';
import { useModel } from '@umijs/max';
import { history } from '@umijs/max';
import { safeToken } from '@/utils';
import service from './service';
import styles from './index.scss';

const IndexPage = withAntd(() => {

  const {
    refresh,
  } = useModel('@@initialState');

  const {
    loading,
    send: handleFinish,
  } = useRequest((data) => (
    service.authorize(data)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(async (data) => {
    const { id_token } = data ?? {};
    if (!id_token) return;
    await safeToken.set(id_token);
    await refresh();
    history.replace('/');
  }));

  return (<div className={styles['container']}>
    <div className={styles['content']}>
      <LoginForm
        contentStyle={{ width: 368 }}
        title='前端应用框架模版'
        subTitle='这是一个构建 REACT 项目的模板库'
        loading={loading}
        onFinish={handleFinish}>
        <ProFormText
          placeholder='登录帐号'
          name='username'
          fieldProps={{
            prefix: <UserOutlined />,
            size: 'large',
          }} />
        <ProFormText.Password
          placeholder='登录密码'
          name='password'
          fieldProps={{
            prefix: <LockOutlined />,
            size: 'large',
          }} />
      </LoginForm>
    </div>
    <SysFooter />
  </div>);
});

export default IndexPage;
