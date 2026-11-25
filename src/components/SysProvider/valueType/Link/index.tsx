import type { ProRenderFieldPropsType } from '@ant-design/pro-components';
import type { LinkTextProps } from './types';
import { Typography } from 'antd';
import { useAccess } from '@umijs/max';
import { history } from '@umijs/max';

const LinkText = (
  props: LinkTextProps,
) => {
  const {
    text,
    fieldProps,
  } = props;
  const accessList = useAccess();
  const {
    access,
    href,
  } = fieldProps ?? {};

  if (!access || !accessList?.[access]) {
    return <>{text}</>;
  } else return (<Typography.Link
    onClick={() => {
      if (href) {
        history.push(href);
      }
    }}>
    {text}
  </Typography.Link>);
};

export const link: ProRenderFieldPropsType = ({
  render: (text, props) => (<LinkText
    text={text}
    fieldProps={props?.fieldProps}
  />),
});
