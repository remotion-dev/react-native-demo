import { useContext, useEffect, useRef } from 'react';
import { Internals } from 'remotion';

export const calculateNextFrame = ({
  time,
  currentFrame: startFrame,
  playbackSpeed,
  fps,
  actualLastFrame,
  actualFirstFrame,
  framesAdvanced,
  shouldLoop,
}: {
  time: number;
  currentFrame: number;
  playbackSpeed: number;
  fps: number;
  actualFirstFrame: number;
  actualLastFrame: number;
  framesAdvanced: number;
  shouldLoop: boolean;
}): { nextFrame: number; framesToAdvance: number; hasEnded: boolean } => {
  const op = playbackSpeed < 0 ? Math.ceil : Math.floor;
  const framesToAdvance =
    op((time * playbackSpeed) / (1000 / fps)) - framesAdvanced;

  const nextFrame = framesToAdvance + startFrame;
  const isCurrentFrameOutside =
    startFrame > actualLastFrame || startFrame < actualFirstFrame;
  const isNextFrameOutside =
    nextFrame > actualLastFrame || nextFrame < actualFirstFrame;

  const hasEnded = !shouldLoop && isNextFrameOutside && !isCurrentFrameOutside;
  if (playbackSpeed > 0) {
    // Play forwards
    if (isNextFrameOutside) {
      return {
        nextFrame: actualFirstFrame,
        framesToAdvance,
        hasEnded,
      };
    }

    return { nextFrame, framesToAdvance, hasEnded };
  }

  // Reverse playback
  if (isNextFrameOutside) {
    return { nextFrame: actualLastFrame, framesToAdvance, hasEnded };
  }

  return { nextFrame, framesToAdvance, hasEnded };
};

export const usePlayback = ({
  loop,
  playbackRate,
  moveToBeginningWhenEnded,
  inFrame,
  outFrame,
}: {
  loop: boolean;
  playbackRate: number;
  moveToBeginningWhenEnded: boolean;
  inFrame: number | null;
  outFrame: number | null;
}) => {
  const frame = Internals.Timeline.useTimelinePosition();
  const config = Internals.useUnsafeVideoConfig();
  const { playing } = useContext(Internals.Timeline.TimelineContext);
  const { setFrame, setPlaying } = useContext(
    Internals.Timeline.SetTimelineContext
  );

  const frameRef = useRef(frame);
  frameRef.current = frame;

  useEffect(() => {
    if (!config) {
      return;
    }

    if (!playing) {
      return;
    }

    let hasBeenStopped = false;
    let reqAnimFrameCall:
      | {
          type: 'raf';
          id: number;
        }
      | {
          type: 'timeout';
          id: NodeJS.Timeout;
        }
      | null = null;
    const startedTime = performance.now();
    let framesAdvanced = 0;

    const cancelQueuedFrame = () => {
      if (reqAnimFrameCall !== null) {
        if (reqAnimFrameCall.type === 'raf') {
          cancelAnimationFrame(reqAnimFrameCall.id);
        } else {
          clearTimeout(reqAnimFrameCall.id);
        }
      }
    };

    const stop = () => {
      hasBeenStopped = true;
      cancelQueuedFrame();
    };

    const callback = () => {
      const time = performance.now() - startedTime;
      const actualLastFrame = outFrame ?? config.durationInFrames - 1;
      const actualFirstFrame = inFrame ?? 0;

      const { nextFrame, framesToAdvance, hasEnded } = calculateNextFrame({
        time,
        currentFrame: frameRef.current,
        playbackSpeed: playbackRate,
        fps: config.fps,
        actualFirstFrame,
        actualLastFrame,
        framesAdvanced,
        shouldLoop: loop,
      });
      framesAdvanced += framesToAdvance;

      if (
        nextFrame !== frameRef.current &&
        (!hasEnded || moveToBeginningWhenEnded)
      ) {
        setFrame(nextFrame);
      }

      if (hasEnded) {
        stop();
        setPlaying(false);
        return;
      }

      if (!hasBeenStopped) {
        queueNextFrame();
      }
    };

    const queueNextFrame = () => {
      reqAnimFrameCall = { type: 'raf', id: requestAnimationFrame(callback) };
    };

    queueNextFrame();

    return () => {
      stop();
    };
  }, [
    config,
    loop,
    playing,
    setFrame,
    playbackRate,
    inFrame,
    outFrame,
    moveToBeginningWhenEnded,
    setPlaying,
  ]);
};
