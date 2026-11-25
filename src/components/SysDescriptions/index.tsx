import type { SysDescriptionsProps } from './types';
import { useMemo } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { filterDescriptionsCols } from './filterCols';
import clsx from 'clsx';
import './index.scss';

const SysDescriptions = (
  props: SysDescriptionsProps,
) => {
  const {
    className: cls,
    bordered,
    title,
    columns,
    ...descriptionsProps
  } = props;

  const $cols = useMemo(() => (
    filterDescriptionsCols(columns)
  ), [columns]);

  return (<ProCard
    className={clsx('sys-descriptions', cls)}
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
