import React, { useCallback, useContext } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
});

const InnerControls: React.FC = () => {
  const { frame, playing } = useContext(Internals.Timeline.TimelineContext);
  const { setFrame, setPlaying } = useContext(
    Internals.Timeline.SetTimelineContext
  );
  const { durationInFrames } = useVideoConfig();

  const onValueChange = useCallback(
    (val: number) => {
      setFrame(val);
    },
    [setFrame]
  );

  const togglePlaying = useCallback(() => {
    setPlaying((p) => !p);
  }, [setPlaying]);

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={togglePlaying}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </TouchableOpacity>
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
