import { FFmpegKit } from 'ffmpeg-kit-react-native';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import type { View } from 'react-native';
import { TemporaryDirectoryPath, moveFile, mkdir } from 'react-native-fs';
import { captureRef } from 'react-native-view-shot';
import { Internals, useVideoConfig } from 'remotion';

export type RemotionNativeContext = {
  containerRef: React.RefObject<View>;
  render: () => Promise<string>;
};

type UseRenderHook = {
  render: () => Promise<string>;
};

export const useRender = () => {
  const { render } = useContext(RemotionNativeContext);

  const value: UseRenderHook = useMemo(() => {
    return {
      render,
    };
  }, [render]);

  return value;
};

export const RemotionNativeContext = React.createContext<RemotionNativeContext>(
  {
    containerRef: { current: null },
    render: async () => {
      throw new Error('Not implemented');
    },
  }
);

export const RemotionNativeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const ref = useRef<View>(null);
  const { durationInFrames, fps } = useVideoConfig();
  const { setFrame } = useContext(Internals.Timeline.SetTimelineContext);

  const render = useCallback(async () => {
    setFrame(0);
    const frames: string[] = [];
    const renderId = Math.random().toString(36).substring(7);
    const dir = `${TemporaryDirectoryPath}${renderId}`;
    await mkdir(dir);

    for (let i = 0; i < durationInFrames; i++) {
      setFrame(i);
      const d = await captureRef(ref.current as View);
      await moveFile(d, `${dir}/image${String(i).padStart(6, '0')}.png`);
      frames.push(d);
    }

    const output = `${TemporaryDirectoryPath}${renderId}/out.mp4`;

    await new Promise<void>((resolve) => {
      FFmpegKit.executeAsync(
        [
          `-r ${fps}`,
          `-i ${dir}/image%06d.png`,
          `-c:v`,
          `libx264`,
          '-pix_fmt',
          `yuv420p`,
          output,
        ].join(' '),
        () => {
          resolve();
        },
        (l) => {
          console.log(l.getMessage());
        }
      );
    });

    return output;
  }, [durationInFrames, fps, setFrame]);

  const value: RemotionNativeContext = useMemo(() => {
    return {
      containerRef: ref,
      render,
    };
  }, [render]);

  return (
    <RemotionNativeContext.Provider value={value}>
      {children}
    </RemotionNativeContext.Provider>
  );
};
