import { Navigate } from '@umijs/max';
import { withAuth } from '@/hocs';

const IndexPage = withAuth(() => (
  <Navigate to='/account/settings' />
));

export default IndexPage;
