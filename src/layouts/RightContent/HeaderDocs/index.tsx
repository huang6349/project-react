import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import HeaderAction from '../HeaderAction';
import { modal } from '@/components';

const handleDocs = () => {
  modal?.info({
    title: '系统提示',
    content: '使用文档暂不支持',
  });
};

const HeaderDocs = () => (
  <Tooltip title='使用文档'>
    <HeaderAction onClick={handleDocs}>
      <QuestionCircleOutlined />
    </HeaderAction>
  </Tooltip>
);

export default HeaderDocs;
