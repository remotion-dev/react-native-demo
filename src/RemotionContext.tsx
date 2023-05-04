import React from 'react';
import { CompositionManagerProvider } from './CompositionManager';
import type { LooseComponentType } from './core';

type Props<T> = {
  component: LooseComponentType<T>;
  inputProps: T;
  durationInFrames: number;
  fps: number;
  height: number;
  width: number;
  children: React.ReactNode;
};

export function RemotionContext<T extends JSX.IntrinsicAttributes>({
  children,
  component,
  durationInFrames,
  fps,
  height,
  width,
  inputProps,
}: Props<T>) {
  return (
    <CompositionManagerProvider
      component={component as LooseComponentType<unknown>}
      durationInFrames={durationInFrames}
      fps={fps}
      height={height}
      width={width}
      defaultProps={inputProps}
    >
      {children}
    </CompositionManagerProvider>
  );
}
