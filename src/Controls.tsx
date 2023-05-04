import React, { useCallback, useContext } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, View } from 'react-native';
import { Internals, useVideoConfig } from 'remotion';

const style = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const InnerControls: React.FC = () => {
  const { frame } = useContext(Internals.Timeline.TimelineContext);
  const { setFrame } = useContext(Internals.Timeline.SetTimelineContext);
  const { durationInFrames } = useVideoConfig();

  const onValueChange = useCallback(
    (val: number) => {
      setFrame(val);
    },
    [setFrame]
  );

  return (
    <View style={style.container}>
      <Slider
        step={1}
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
