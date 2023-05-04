import React, { useCallback, useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { RemotionNativeContext } from './RemotionNativeContext';
import { Internals, useVideoConfig } from 'remotion';
import { captureRef } from 'react-native-view-shot';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

const InnerRenderButton: React.FC = () => {
  const { containerRef } = useContext(RemotionNativeContext);
  const { setFrame } = useContext(Internals.Timeline.SetTimelineContext);
  const { durationInFrames, fps } = useVideoConfig();

  const onPress = useCallback(async () => {
    setFrame(0);
    const frames = [];

    for (let i = 0; i < durationInFrames; i++) {
      setFrame(i);
      const d = await captureRef(containerRef.current as View);
      frames.push(d);
    }

    await FFmpegKit.executeAsync(
      `-framerate ${fps} ${frames
        .map((f) => `-i ${f}`)
        .join(' ')} -c:v libx264 -pix_fmt yuv420p out.mp4`,
      () => undefined,
      (l) => {
        console.log(l.getMessage());
      }
    );
    console.log('done!');
  }, [setFrame, fps, durationInFrames, containerRef]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Render</Text>
    </TouchableOpacity>
  );
};

export const RenderButton: React.FC = () => {
  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <InnerRenderButton />
    </Internals.CanUseRemotionHooks.Provider>
  );
};
