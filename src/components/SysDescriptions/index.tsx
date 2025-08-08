import type { DescriptionsProps } from './types';
import { useMemo } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { filterDescriptionsCols } from './filterCols';
import styles from './index.scss';

const SysDescriptions = (props: DescriptionsProps) => {
  const {
    bordered,
    title,
    columns,
    ...descriptionsProps
  } = props;

  const $cols = useMemo(() => (
    filterDescriptionsCols(columns)
  ), [columns]);

  return (<ProCard
    className={styles['sys-descriptions']}
    title={title}
    bordered={bordered}>
    <ProDescriptions
      {...descriptionsProps}
      columns={$cols} />
  </ProCard>);
};

SysDescriptions.defaultProps = {
  bordered: !0,
};

export default SysDescriptions;
