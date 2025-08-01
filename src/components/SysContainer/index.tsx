import type { PageContainerProps } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { SysBack } from '@/components';

const SysContainer = (props: PageContainerProps & {
  back?: boolean;
}) => {
  const {
    extra,
    back,
    ...containerProps
  } = props;

  return (<PageContainer
    {...containerProps}
    extra={[extra, back && <SysBack key='back' />]}
  />);
};

export default SysContainer;
