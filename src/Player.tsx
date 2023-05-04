import React, { PropsWithChildren, useMemo } from 'react';
import { View } from 'react-native';
import type { LooseComponentType } from './core';
import { Internals, TimelineContextValue } from 'remotion';

type Props<T> = {
  component: LooseComponentType<T>;
  inputProps: T;
};

export function Player<T extends JSX.IntrinsicAttributes>({
  component: Comp,
  inputProps,
}: PropsWithChildren<Props<T>>) {
  const timelineContext: TimelineContextValue = useMemo(() => {
    return {
      audioAndVideoTags: { current: [] },
      frame: 0,
      imperativePlaying: { current: false },
      isPlaying: false,
      playbackRate: 1,
      playing: false,
      rootId: '0',
      setPlaybackRate: () => {},
    };
  }, []);

  return (
    <View>
      <Internals.Timeline.TimelineContext.Provider value={timelineContext}>
        <Comp {...inputProps} />
      </Internals.Timeline.TimelineContext.Provider>
    </View>
  );
}
