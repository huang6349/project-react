import { useState } from 'react';
import { Menu } from 'antd';
import { GridContent } from '@ant-design/pro-components';
import { keys } from 'lodash-es';
import { useRequest } from 'alova/client';
import { withAuth } from '@/hocs';
import { user } from '@/services';
import { UserPane } from './user';
import styles from './style.scss';

const IndexPage = withAuth(() => {
  const [selectKey, setSelectKey] = useState('user');
  const menuMap = {
    user: '成员管理',
  };

  // 获取当前用户的 tenantId
  const { data: userData } = useRequest(user);
  const tenantId = userData?.user?.tenantId;

  const items = keys(menuMap).map(key => ({
    key,
    label: menuMap[key],
  }));

  const renderChildren = () => {
    switch (selectKey) {
      case 'user':
        return <UserPane id={tenantId} />;
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
