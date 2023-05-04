import React, { Suspense, useContext, useMemo } from 'react';
import { Internals, useVideoConfig } from 'remotion';
import { View } from 'react-native';
import { RemotionNativeContext } from './RemotionNativeContext';

export const Player = () => {
  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <InnerPlayer />
    </Internals.CanUseRemotionHooks.Provider>
  );
};

function InnerPlayer() {
  const { defaultProps, width, height } = useVideoConfig();
  const manager = useContext(Internals.CompositionManager);
  const { containerRef } = useContext(RemotionNativeContext);

  const Comp = useMemo(() => {
    return manager.compositions[0]?.component!;
  }, [manager.compositions]);

  const style = useMemo(() => {
    return {
      height,
      width,
    };
  }, [height, width]);

  return (
    <View ref={containerRef} style={style}>
      <Suspense fallback={<View />}>
        <Comp {...(defaultProps as {})} />
      </Suspense>
    </View>
  );
}
