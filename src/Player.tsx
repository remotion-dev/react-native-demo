import React, { PropsWithChildren, useMemo } from 'react';
import type { LooseComponentType } from './core';
import { Internals } from 'remotion';
import { TimelineProvider } from './TimelineProvider';
import { CompositionManagerProvider } from './CompositionManager';
import { View } from 'react-native';

type Props<T> = {
  component: LooseComponentType<T>;
  inputProps: T;
  durationInFrames: number;
  fps: number;
  height: number;
  width: number;
};

export function Player<T extends JSX.IntrinsicAttributes>({
  component: Comp,
  inputProps,
  durationInFrames,
  fps,
  height,
  width,
}: PropsWithChildren<Props<T>>) {
  const style = useMemo(() => {
    return {
      height,
      width,
    };
  }, [height, width]);

  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <CompositionManagerProvider
        component={Comp as LooseComponentType<unknown>}
        durationInFrames={durationInFrames}
        fps={fps}
        height={height}
        width={width}
      >
        <TimelineProvider>
          <View style={style}>
            <Comp {...inputProps} />
          </View>
        </TimelineProvider>
      </CompositionManagerProvider>
    </Internals.CanUseRemotionHooks.Provider>
  );
}
