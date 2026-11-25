import type { ProRenderFieldPropsType } from '@ant-design/pro-components';
import { SysDictTag } from '@/components';

export const dictTag: ProRenderFieldPropsType = ({
  render: (text) => (<SysDictTag
    label={text?.label}
    style={text?.style}
  />),
});
