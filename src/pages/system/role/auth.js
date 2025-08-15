import { withAuth } from '@/hocs';
import { SysDescriptions } from '@/components';
import { SysTabs } from '@/components';
import { SysContainer } from '@/components';
import { PermForm } from './components';
import { useQueries } from '@/hooks';
import service from './service';
import columns from './columns';

const IndexPage = withAuth(() => {
  const queries = useQueries();

  return (<SysContainer back={!0}>
    <SysDescriptions
      title='基本信息'
      params={{ id: queries?.id }}
      request={service.fnById()}
      columns={columns()} />
    <SysTabs
      className='mt-4'
      tabs={tabs} />
  </SysContainer>);
});

const tabs = {
  destroyInactiveTabPane: !0,
  items: [{
    label: '权限信息',
    key: 'qxxx',
    children: <PermForm />,
  }],
};

export default IndexPage;
