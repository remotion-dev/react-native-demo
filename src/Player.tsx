import React, { Suspense, useContext, useMemo } from 'react';
import { Internals, useVideoConfig } from 'remotion';
import { View } from 'react-native';

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
    <View style={style}>
      <Suspense fallback={<View />}>
        <Comp {...(defaultProps as {})} />
      </Suspense>
    </View>
  );
}
