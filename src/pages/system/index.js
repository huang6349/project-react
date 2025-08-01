import { withAuth } from '@/hocs';
import { useAccess } from '@umijs/max';
import { Navigate } from '@umijs/max';

const IndexPage = withAuth(() => {
  const access = useAccess();
  if (access?.$system$tenant) {
    return <Navigate to='/system/tenant' />;
  } else if (access?.$system$user) {
    return <Navigate to='/system/user' />;
  } else if (access?.$system$role) {
    return <Navigate to='/system/role' />;
  } else if (access?.$system$perm) {
    return <Navigate to='/system/perm' />;
  } else return null;
});

export default IndexPage;
