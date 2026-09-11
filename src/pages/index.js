import { withAuth } from '@/hocs';
import { useAccess } from '@umijs/max';
import { Navigate } from '@umijs/max';

const IndexPage = withAuth(() => {
  const access = useAccess();
  if (access?.$system) {
    return <Navigate to='/system' />;
  } else return null;
});

export default IndexPage;
