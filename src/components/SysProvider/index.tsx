import type { SysProviderProps } from './types';
import { useContext } from 'react';
import { ProProvider } from '@ant-design/pro-components';
import { valueTypeMap } from './valueType';

const SysProvider = (
  props: SysProviderProps,
) => {
  const {
    children,
  } = props;
  const values = useContext(ProProvider);

  return (<ProProvider.Provider
    value={{
      ...values,
      valueTypeMap,
    }}>
    {children}
  </ProProvider.Provider>);
};

export default SysProvider;
