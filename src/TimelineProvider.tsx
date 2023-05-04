import React, { useMemo, useState } from 'react';
import {
  Internals,
  SetTimelineContextValue,
  TimelineContextValue,
  useVideoConfig,
} from 'remotion';

export const TimelineProvider: React.FC = ({ children }) => {
  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <InnerTimelineProvider>{children}</InnerTimelineProvider>
    </Internals.CanUseRemotionHooks.Provider>
  );
};

const InnerTimelineProvider: React.FC = ({ children }) => {
  const [userPreferredFrame, setFrame] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const { durationInFrames } = useVideoConfig();

  const actualFrame = useMemo(() => {
    return Math.min(durationInFrames - 1, userPreferredFrame);
  }, [durationInFrames, userPreferredFrame]);

  const timelineContext: TimelineContextValue = useMemo(() => {
    return {
      audioAndVideoTags: { current: [] },
      frame: actualFrame,
      imperativePlaying: { current: false },
      playbackRate: 1,
      playing: isPlaying,
      rootId: '0',
      setPlaybackRate: () => {},
    };
  }, [actualFrame, isPlaying]);

  const setTimelineContext: SetTimelineContextValue = useMemo(() => {
    return {
      setFrame,
      setImperativePlaying: () => {
        throw new Error('Not implemented');
      },
      setPlaying,
    };
  }, []);

  return (
    <Internals.Timeline.TimelineContext.Provider value={timelineContext}>
      <Internals.Timeline.SetTimelineContext.Provider
        value={setTimelineContext}
      >
        {children}
      </Internals.Timeline.SetTimelineContext.Provider>
    </Internals.Timeline.TimelineContext.Provider>
  );
};
