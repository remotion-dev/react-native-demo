import React, { useMemo } from 'react';
import { Internals, TimelineContextValue } from 'remotion';

export const TimelineProvider: React.FC = ({ children }) => {
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
    <Internals.Timeline.TimelineContext.Provider value={timelineContext}>
      {children}
    </Internals.Timeline.TimelineContext.Provider>
  );
};
