import type { DescriptionsProps } from './types';
import { ProDescriptions } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import styles from './index.scss';

const SysDescriptions = (props: DescriptionsProps) => {
  const {
    bordered,
    title,
    columns,
    ...descriptionsProps
  } = props;

  return (<ProCard
    className={styles['sys-descriptions']}
    title={title}
    bordered={bordered}>
    <ProDescriptions
      {...descriptionsProps}
      columns={columns} />
  </ProCard>);
};

SysDescriptions.defaultProps = {
  bordered: !0,
};

export default SysDescriptions;
