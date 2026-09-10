import { Navigate } from '@umijs/max';
import { withAuth } from '@/hocs';

const IndexPage = withAuth(() => (
  <Navigate to='/configs/settings' />
));

export default IndexPage;
