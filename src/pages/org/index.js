import { withAuth } from '@/hocs';
import { useAccess } from '@umijs/max';
import { Navigate } from '@umijs/max';

const IndexPage = withAuth(() => {
  const access = useAccess();
  if (access?.$org$member) {
    return <Navigate to='/org/member' />;
  } else return null;
});

export default IndexPage;
