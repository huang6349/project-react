import { withAuth } from '@/hocs';
import { SysDescriptions } from '@/components';
import { SysContainer } from '@/components';
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
  </SysContainer>);
});

export default IndexPage;
