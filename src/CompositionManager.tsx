import React, { useMemo } from 'react';
import { CompositionManagerContext, Internals } from 'remotion';
import type { LooseComponentType } from './core';

export const CompositionManagerProvider: React.FC<{
  component: LooseComponentType<unknown>;
  durationInFrames: number;
  fps: number;
  height: number;
  width: number;
}> = ({ component, durationInFrames, fps, height, width, children }) => {
  const compManager: CompositionManagerContext = useMemo(() => {
    return {
      assets: [],
      compositions: [
        {
          component: React.lazy(() => Promise.resolve({ default: component })),
          durationInFrames,
          folderName: null,
          fps,
          height,
          id: '0',
          nonce: 0,
          parentFolderName: null,
          schema: null,
          width,
          defaultProps: {},
        },
      ],
      currentComposition: '0',
      currentCompositionMetadata: {
        durationInFrames,
        fps,
        height,
        width,
        defaultProps: {},
      },
      folders: [],
      registerAsset: () => {
        throw new Error('not implemented for native');
      },
      registerComposition: () => {
        throw new Error('not implemented for native');
      },
      registerFolder: () => {
        throw new Error('not implemented for native');
      },
      registerSequence: () => {
        // Not doing anything, on the web this would show on the left sidebar
      },
      sequences: [],
      setCurrentComposition: () => {
        throw new Error('not implemented for native');
      },
      setCurrentCompositionMetadata: () => {
        throw new Error('not implemented for native');
      },
      unregisterAsset: () => {
        throw new Error('not implemented for native');
      },
      unregisterComposition: () => {
        throw new Error('not implemented for native');
      },
      unregisterFolder: () => {
        throw new Error('not implemented for native');
      },
      unregisterSequence: () => {
        // Not doing anything, on the web this would show on the left sidebar
      },
    };
  }, [component, durationInFrames, fps, height, width]);

  return (
    <Internals.CompositionManager.Provider value={compManager}>
      {children}
    </Internals.CompositionManager.Provider>
  );
};
