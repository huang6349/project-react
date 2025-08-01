import type { ProDescriptionsProps } from '@ant-design/pro-components';
import type { ProCardProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import styles from './index.scss';

const SysDescriptions = (props: ProDescriptionsProps & {
  bordered?: ProCardProps['bordered'];
  title?: ProCardProps['title'];
}) => {
  const {
    bordered,
    title,
    ...descriptionsProps
  } = props;

  return (<ProCard
    className={styles['sys-descriptions']}
    title={title}
    bordered={bordered}>
    <ProDescriptions {...descriptionsProps} />
  </ProCard>);
};

SysDescriptions.defaultProps = {
  bordered: !0,
};

export default SysDescriptions;
