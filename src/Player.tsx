import React, { PropsWithChildren } from 'react';
import type { LooseComponentType } from './core';
import { Internals } from 'remotion';
import { TimelineProvider } from './TimelineProvider';
import { CompositionManagerProvider } from './CompositionManager';

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
          <Comp {...inputProps} />
        </TimelineProvider>
      </CompositionManagerProvider>
    </Internals.CanUseRemotionHooks.Provider>
  );
}
