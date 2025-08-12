import type { ButtonProps } from 'antd';
import { useMemo } from 'react';
import { Button } from 'antd';
import { isFunction } from 'lodash-es';
import { clsx } from 'clsx';

const SysButton = (props: ButtonProps & {
  invisible?: boolean | (() => boolean);
}) => {
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

  return (<Button
    className={clsx(className, { hidden })}
    {...buttonProps}
  />);
};

SysButton.defaultProps = {
  invisible: !1,
};

export default SysButton;
