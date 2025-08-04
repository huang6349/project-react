import type { DescriptionsColumnType } from './types';
import type { DescriptionsProps } from './types';
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

  const patchColumn = ($cols: DescriptionsColumnType[]): any[] => (
    produce($cols, (cols) => {
      cols?.forEach((col) => {
        const {
          ellipsis,
        } = col;

        if (ellipsis) {
          col.ellipsis = !1;
        }
      });
    })
  );

  return (<ProCard
    className={styles['sys-descriptions']}
    title={title}
    bordered={bordered}>
    <ProDescriptions
      columns={patchColumn(columns)}
      {...descriptionsProps} />
  </ProCard>);
};

SysDescriptions.defaultProps = {
  bordered: !0,
};

export default SysDescriptions;
