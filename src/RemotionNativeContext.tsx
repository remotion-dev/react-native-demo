import { FFmpegKit } from 'ffmpeg-kit-react-native';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { Platform, View } from 'react-native';
import { TemporaryDirectoryPath, moveFile, mkdir } from 'react-native-fs';
import { captureRef } from 'react-native-view-shot';
import { Internals, useVideoConfig } from 'remotion';

export type RemotionNativeContext = {
  screenshotterRef: React.RefObject<View>;
  render: (options: RenderOptions) => Promise<string>;
};

type UseRenderHook = {
  render: (options: RenderOptions) => Promise<string>;
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
    screenshotterRef: { current: null },
    render: async () => {
      throw new Error('Not implemented');
    },
  }
);

export type RenderOptions = {
  onFrame: (url: string, frames: number) => void;
  onEncodingProgress: (frames: number) => void;
};

const parseFfmpegProgress = (input: string): number | undefined => {
  const match = input.match(/frame=(\s+)?([0-9]+)\s/);
  if (!match) {
    return undefined;
  }

  return Number(match[2]);
};

export const RemotionNativeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const ref = useRef<View>(null);
  const { durationInFrames, fps } = useVideoConfig();
  const { setFrame } = useContext(Internals.Timeline.SetTimelineContext);

  const render = useCallback(
    async (options: RenderOptions) => {
      setFrame(0);
      const frames: string[] = [];
      const renderId = Math.random().toString(36).substring(7);
      const dir = `${TemporaryDirectoryPath}${renderId}`;
      await mkdir(dir);

      for (let i = 0; i < durationInFrames; i++) {
        setFrame(i);
        const d = await captureRef(ref.current as View, {});
        const out = `${dir}/image${String(i).padStart(6, '0')}.png`;
        if (Platform.OS === 'android') {
          options.onFrame(d, i + 1);
          frames.push(d);
        } else {
          await moveFile(d, out);
          options.onFrame(out, i + 1);
          frames.push(out);
        }
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
            const progress = parseFfmpegProgress(l.getMessage() as string);
            if (progress !== undefined) {
              options.onEncodingProgress(progress);
            }
          }
        );
      });

      return output;
    },
    [durationInFrames, fps, setFrame]
  );

  const value: RemotionNativeContext = useMemo(() => {
    return {
      screenshotterRef: ref,
      render,
    };
  }, [render]);

  return (
    <RemotionNativeContext.Provider value={value}>
      {children}
    </RemotionNativeContext.Provider>
  );
};
