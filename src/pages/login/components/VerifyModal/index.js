import { Modal } from 'antd';
import VerifySlide from './VerifySlide';
import styles from './index.scss';

const VerifyModal = (props) => {
  const {
    title,
    open,
    refreshText,
    tips,
    onCancel,
    onHide,
  } = props;

  return (<Modal
    className={styles['verify-modal']}
    centered={!0}
    destroyOnClose={!0}
    footer={null}
    mask={!0}
    maskClosable={!1}
    width={310 + 32}
    title={title}
    open={open}
    onCancel={(e) => {
      onCancel?.(e);
      onHide?.(!1);
    }}>
    <VerifySlide
      refreshText={refreshText}
      tips={tips}
      onHide={onHide} />
  </Modal>);
};

VerifyModal.defaultProps = {};

export default VerifyModal;
