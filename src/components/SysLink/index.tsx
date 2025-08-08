import type { ButtonProps } from 'antd';
import { Button } from 'antd';

const SysLink = (
  props: ButtonProps,
) => (<Button
  className='h-auto p-0'
  type='link'
  {...props}
/>);

export default SysLink;
