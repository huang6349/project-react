import type { ButtonProps } from 'antd';
import { SysButton } from '@/components';

const SysLink = (props: ButtonProps & {
  invisible?: boolean | (() => boolean);
}) => (<SysButton
  className='h-auto p-0'
  type='link'
  {...props}
/>);

export default SysLink;
