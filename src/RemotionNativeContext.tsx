import React, { useMemo, useRef } from 'react';
import type { View } from 'react-native';

export type RemotionNativeContext = {
  containerRef: React.RefObject<View>;
};

export const RemotionNativeContext = React.createContext<RemotionNativeContext>(
  {
    containerRef: { current: null },
  }
);

export const RemotionNativeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const ref = useRef<View>(null);

  const value: RemotionNativeContext = useMemo(() => {
    return {
      containerRef: ref,
    };
  }, []);

  return (
    <RemotionNativeContext.Provider value={value}>
      {children}
    </RemotionNativeContext.Provider>
  );
};
