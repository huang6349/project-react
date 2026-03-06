import type { ContainerProps } from './types';
import { PageContainer } from '@ant-design/pro-components';
import { SysBack } from '@/components';
import clsx from 'clsx';

const SysContainer = (
  props: ContainerProps,
) => {
  const {
    className: cls,
    extra,
    back,
    ...containerProps
  } = props;

  return (<PageContainer
    className={clsx('sys-container', cls)}
    extra={[extra, back && <SysBack key='back' />]}
    {...containerProps}
  />);
};

export default SysContainer;
