import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error('useAuth must be used inside an AuthContext');
  }

  return contextValue;
}
