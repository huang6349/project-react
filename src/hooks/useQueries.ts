import { useMemo } from 'react';
import { useLocation } from '@umijs/max';
import qs from 'query-string';

const useQueries = () => {
  const location = useLocation();

  return useMemo(() => (
    qs.parse(location?.search)
  ), [location]);
};

export default useQueries;
