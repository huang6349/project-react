import { withData } from '@/hofs';
import { safeRequest } from '@/utils';

export const queryDict = (category) => category ? (
  withData(() => dict(category))
) : null;

export const dict = (category) => category ? (
  safeRequest.Get(`/api/dict/${category}/_items`)
) : null;
