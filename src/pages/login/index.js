import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons';
import { SafetyOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { LoginForm } from '@ant-design/pro-components';
import { withAntd } from '@/hocs';
import { withResponse } from '@/hofs';
import { SysFooter } from '@/components';
import { VerifyModal } from './components';
import { useRequest } from 'alova/client';
import { useModel } from '@umijs/max';
import { history } from '@umijs/max';
import { safeToken } from '@/utils';
import { safeEq } from '@/utils';
import service from './service';
import styles from './index.scss';

const IndexPage = withAntd(() => {
  // State & Hooks
  const {
    refresh,
  } = useModel('@@initialState');

  const [captchaVisible, setCaptchaVisible] = useState(!1);
  const [isVerified, setIsVerified] = useState(!1);
  const [verifyToken, setVerifyToken] = useState(null);

  // 数据交互
  const {
    loading,
    send: authorize,
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
  })).onSuccess(({ data }) => {
    const {
      success,
    } = data ?? {};
    if (safeEq(success, !0)) return;
    // 要求重新验证验证码
    setCaptchaVisible(!1);
    setIsVerified(!1);
    setVerifyToken(null);
  });

  // 事件处理
  const handleFinish = useCallback((data) => (
    safeEq(isVerified, !1)
      ? setCaptchaVisible(!0)
      : authorize({ verifyToken, ...data })
  ), [isVerified, verifyToken]);

  // 计算属性
  const searchConfig = useMemo(() => ({
    submitText: safeEq(isVerified, !1) ? '请先完成安全验证' : '登录',
  }), [isVerified]);

  const submitButtonProps = useMemo(() => ({
    icon: safeEq(isVerified, !1) && <SafetyOutlined />,
  }), [isVerified]);

  const submitter = useMemo(() => ({
    submitButtonProps,
    searchConfig,
  }), [
    submitButtonProps,
    searchConfig,
  ]);

  // 渲染输出
  return (<div className={styles['container']}>
    <div className={styles['content']}>
      <LoginForm
        contentStyle={{ width: 368 }}
        title='前端应用框架模版'
        subTitle='这是一个构建 REACT 项目的模板库'
        loading={loading}
        submitter={submitter}
        onFinish={handleFinish}>
        <ProFormText
          placeholder='登录帐号'
          name='username'
          disabled={safeEq(isVerified, !1)}
          fieldProps={{
            prefix: <UserOutlined />,
            size: 'large',
          }} />
        <ProFormText.Password
          placeholder='登录密码'
          name='password'
          disabled={safeEq(isVerified, !1)}
          fieldProps={{
            prefix: <LockOutlined />,
            size: 'large',
          }} />
      </LoginForm>
    </div>
    <VerifyModal
      open={captchaVisible}
      title='安全验证'
      tips='请拖动滑块完成拼图'
      refreshText='刷新'
      onHide={(isVerified, verifyToken) => {
        setCaptchaVisible(!1);
        setIsVerified(isVerified ?? !1);
        setVerifyToken(verifyToken);
      }} />
    <SysFooter />
  </div>);
});

export default IndexPage;
