import React, { useCallback, useContext } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Internals, useVideoConfig } from 'remotion';
import { PauseIcon, PlayIcon } from './PlayIcon';

const style = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  spacer: {
    width: 10,
  },
  label: {
    color: 'white',
  },
});

const InnerControls: React.FC = () => {
  const { frame, playing } = useContext(Internals.Timeline.TimelineContext);
  const { setFrame, setPlaying } = useContext(
    Internals.Timeline.SetTimelineContext
  );
  const { durationInFrames, fps } = useVideoConfig();

  const onValueChange = useCallback(
    (val: number) => {
      setFrame(val);
    },
    [setFrame]
  );

  const togglePlaying = useCallback(() => {
    setPlaying((p) => !p);
  }, [setPlaying]);

  const renderTime = useCallback(() => {
    const seconds = frame / fps;
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds - minutes * 60;
    return `${minutes}:${String(secondsRemaining.toFixed(0)).padStart(2, '0')}`;
  }, [fps, frame]);

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={togglePlaying}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </TouchableOpacity>
      <View style={style.spacer} />
      <Text style={style.label}>{renderTime()}</Text>
      <View style={style.spacer} />
      <Slider
        thumbTintColor="white"
        step={1}
        minimumTrackTintColor="rgba(255, 255, 255, 0.8)"
        value={frame}
        minimumValue={0}
        maximumValue={durationInFrames - 1}
        style={style.content}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export const Controls: React.FC = () => {
  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <InnerControls />
    </Internals.CanUseRemotionHooks.Provider>
  );
};
