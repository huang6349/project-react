import { withResponse } from '@/hofs';
import { useState, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import { Button } from 'antd';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import ReloadOutlined from '@ant-design/icons/ReloadOutlined';
import Draggable from 'react-draggable';
import { message } from '@/hocs';
import { safeEq } from '@/utils';
import { delay } from '@/utils';
import { get } from 'lodash-es';
import { useRequest } from 'alova/client';
import service from './service';
import { aesEncrypt } from './utils';
import { uuid } from './utils';
import styles from './index.scss';

const BLOCK_WIDTH = 45;

const VerifySlide = (props) => {
  const {
    refreshText,
    tips,
    onHide,
  } = props;

  const [clientUid] = useLocalStorage('slider', `slider-${uuid()}`);
  const [originalImageBase64, setOriginalImageBase64] = useState();
  const [jigsawImageBase64, setJigsawImageBase64] = useState();
  const [isVerifying, setIsVerifying] = useState(!1);
  const [token, setToken] = useState();
  const [icon, setIcon] = useState('right');
  const [blockX, setBlockX] = useState(0);

  const rawPointJsonRef = useRef(null);
  const secretKeyRef = useRef(null);
  const barRef = useRef(null);
  const barAreaWidth = 310;

  const {
    loading,
    send: genCaptcha,
  } = useRequest(() => (
    service.genCaptcha({ clientUid })
  ), {
    immediate: !0,
  }).onSuccess(withResponse((data) => {
    const originalImageBase64 = get(data, 'repData.originalImageBase64');
    const jigsawImageBase64 = get(data, 'repData.jigsawImageBase64');
    const token = get(data, 'repData.token');
    const secretKey = get(data, 'repData.secretKey');
    setOriginalImageBase64(originalImageBase64);
    setJigsawImageBase64(jigsawImageBase64);
    setToken(token);
    setIcon('right');
    setBlockX(0);
    secretKeyRef.current = secretKey;
  }));

  const {
    send: checkCaptcha,
  } = useRequest((data) => (
    service.checkCaptcha(data)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(async (res) => {
    const result = get(res, 'repData.result');
    const token = get(res, 'repData.token');
    if (result) {
      setIcon('check');
      message.success('验证成功');
      await delay(500);
      const payload = `${token}---${rawPointJsonRef.current}`;
      const verifyToken = secretKeyRef.current
        ? aesEncrypt(payload, secretKeyRef.current)
        : payload;
      onHide?.(!0, verifyToken);
    } else {
      setIcon('fail');
      message.error('验证失败');
      await delay(500);
      await genCaptcha();
    }
  })).onComplete(() => {
    setIsVerifying(!1);
  });

  const handleDrag = (_e, data) => {
    const maxWidth = barAreaWidth - BLOCK_WIDTH;
    const newX = Math.max(0, Math.min(data.x, maxWidth));
    setBlockX(newX);
  };

  const handleStop = () => {
    if (isVerifying || !token) return;
    setIsVerifying(!0);
    setIcon('loading');
    const leftBarWidth = blockX + BLOCK_WIDTH;
    const x = leftBarWidth - BLOCK_WIDTH;
    const rawPointJson = JSON.stringify({ x, y: 5.0 });
    rawPointJsonRef.current = rawPointJson;
    const pointJson = secretKeyRef.current
      ? aesEncrypt(rawPointJson, secretKeyRef.current)
      : rawPointJson;
    checkCaptcha({
      pointJson,
      token,
      ts: Date.now(),
    });
  };

  return (<div className={styles['verifybox']}>
    <div className={styles['verify-img-out']}>
      <div className={styles['verify-img-panel']}>
        {originalImageBase64 && <img
          className={styles['verify-img']}
          src={`data:image/png;base64,${originalImageBase64}`}
          alt='captcha'
        />}
      </div>
    </div>
    <div className={styles['verify-bar-area']} ref={barRef}>
      {/* 已滑动区域背景色 */}
      <div className={styles['verify-left-bar']}>
        <div style={{ width: `${blockX}px` }} />
      </div>
      <div className={styles['verify-msg']}>
        {tips}
      </div>
      <Draggable
        axis='x'
        bounds='parent'
        position={{ x: blockX, y: 0 }}
        onDrag={handleDrag}
        onStop={handleStop}>
        <div className={styles['verify-move-block']}>
          {safeEq(icon, 'right') && <DoubleRightOutlined />}
          {safeEq(icon, 'loading') && <LoadingOutlined />}
          {safeEq(icon, 'check') && <CheckCircleOutlined className='text-emerald-500' />}
          {safeEq(icon, 'fail') && <CloseCircleOutlined className='text-rose-500' />}
          <div className={styles['verify-sub-block']}>
            {jigsawImageBase64 && <img
              className={styles['verify-img']}
              src={`data:image/png;base64,${jigsawImageBase64}`}
              alt='block'
            />}
          </div>
        </div>
      </Draggable>
    </div>
    <div className={styles['verify-very-bottom']}>
      <Button
        className={styles['verify-refresh']}
        type='link'
        icon={<ReloadOutlined spin={loading} />}
        onClick={genCaptcha}>
        {refreshText}
      </Button>
    </div>
  </div>);
};

VerifySlide.defaultProps = {
  refreshText: '刷新',
  tips: '请拖动滑块完成拼图',
};

export default VerifySlide;
