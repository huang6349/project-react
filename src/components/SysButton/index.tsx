import type { SysButtonProps } from './types';
import { useMemo } from 'react';
import { isFunction } from 'lodash-es';
import { Button } from 'antd';

const SysButton = (
  props: SysButtonProps,
) => {
  const {
    className,
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
    className={className}
    {...buttonProps}
  />);
};

SysButton.defaultProps = {
  invisible: !1,
};

export default SysButton;
