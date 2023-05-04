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
  const { durationInFrames } = useVideoConfig();

  const actualFrame = useMemo(() => {
    return Math.min(durationInFrames - 1, userPreferredFrame);
  }, [durationInFrames, userPreferredFrame]);

  const timelineContext: TimelineContextValue = useMemo(() => {
    return {
      audioAndVideoTags: { current: [] },
      frame: actualFrame,
      imperativePlaying: { current: false },
      isPlaying: false,
      playbackRate: 1,
      playing: false,
      rootId: '0',
      setPlaybackRate: () => {},
    };
  }, [actualFrame]);

  const setTmelineContext: SetTimelineContextValue = useMemo(() => {
    return {
      setFrame,
      setImperativePlaying: () => {
        throw new Error('Not implemented');
      },
      setPlaying: () => {},
    };
  }, []);

  return (
    <Internals.Timeline.TimelineContext.Provider value={timelineContext}>
      <Internals.Timeline.SetTimelineContext.Provider value={setTmelineContext}>
        {children}
      </Internals.Timeline.SetTimelineContext.Provider>
    </Internals.Timeline.TimelineContext.Provider>
  );
};
