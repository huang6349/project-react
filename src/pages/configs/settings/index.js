import { useState } from 'react';
import { Menu } from 'antd';
import { GridContent } from '@ant-design/pro-components';
import { keys } from 'lodash-es';
import { withAuth } from '@/hocs';
import { FeatureView } from './components';
import { BasicView } from './components';
import styles from './style.scss';

const IndexPage = withAuth(() => {
  const [selectKey, setSelectKey] = useState('feature');
  const menuMap = {
    feature: '功能设置',
    basic: '基本设置',
  };

  const items = keys(menuMap).map(key => ({
    key,
    label: menuMap[key],
  }));

  const renderChildren = () => {
    switch (selectKey) {
      case 'feature':
        return <FeatureView />;
      case 'basic':
        return <BasicView />;
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
