import type { DescriptionsColumnType } from './types';
import type { DescriptionsProps } from './types';
import { useMemo } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { produce } from 'immer';
import styles from './index.scss';

const SysDescriptions = (props: DescriptionsProps) => {
  const {
    bordered,
    title,
    columns,
    ...descriptionsProps
  } = props;

  const $cols = useMemo(() => {
    const patch = ($cols: DescriptionsColumnType[]): any[] => (
      produce($cols, (cols) => {
        cols?.forEach((col) => {
          col.ellipsis = !1;
          col.copyable = !1;
        });
      })
    );
    return patch(columns);
  }, [columns]);

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
