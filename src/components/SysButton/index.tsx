import type { ButtonProps } from './types';
import { useMemo } from 'react';
import { isFunction } from 'lodash-es';
import { Button } from 'antd';
import clsx from 'clsx';

const SysButton = (
  props: ButtonProps,
) => {
  const {
    className: cls,
    invisible,
    ...buttonProps
  } = props;

  const hidden = useMemo(() => {
    if (isFunction(invisible)) {
      return invisible();
    } else return invisible;
  }, [invisible]);

  if (hidden) {
    return null;
  } else return (<Button
    className={clsx('sys-button', cls)}
    {...buttonProps}
  />);
};

SysButton.defaultProps = {
  invisible: !1,
};

export default SysButton;
