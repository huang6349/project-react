import { withAuth } from '@/hocs';
import { SysContainer } from '@/components';

const IndexPage = withAuth(() => {
  return (<SysContainer />);
});

export default IndexPage;
