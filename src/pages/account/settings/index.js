import { useState } from 'react';
import { Menu } from 'antd';
import { GridContent } from '@ant-design/pro-components';
import { keys } from 'lodash-es';
import { withAuth } from '@/hocs';
import { SecurityView } from './components';
import styles from './style.scss';

const IndexPage = withAuth(() => {
  const [selectKey, setSelectKey] = useState('security');
  const menuMap = {
    security: '修改密码',
  };

  const items = keys(menuMap).map(key => ({
    key,
    label: menuMap[key],
  }));

  const renderChildren = () => {
    switch (selectKey) {
      case 'security':
        return <SecurityView />;
      default:
        return null;
    }
  };

  return (<GridContent>
    <div className={styles.main}>
      <div className={styles['left-menu']}>
        <Menu
          mode='inline'
          selectedKeys={[selectKey]}
          items={items}
          onClick={({ key }) => {
            setSelectKey(key);
          }} />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          {menuMap[selectKey]}
        </div>
        {renderChildren()}
      </div>
    </div>
  </GridContent>);
});

export default IndexPage;
