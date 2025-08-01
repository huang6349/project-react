import { withAntd } from '@/hocs';
import { useAsyncEffect } from '@/hooks';
import { history } from '@umijs/max';
import { isEmpty } from 'lodash-es';
import { eq } from 'lodash-es';
import { safeToken } from '@/utils';

const withAuth = (Component: any) => withAntd(() => {
  useAsyncEffect(async () => {
    const satoken = await safeToken.get();
    if (eq(isEmpty(satoken), !1)) return;
    const { replace } = history;
    await safeToken.remove();
    replace('/login');
  }, []);
  return <Component />;
});

export default withAuth;
