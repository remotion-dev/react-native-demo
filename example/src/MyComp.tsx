import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
  useCurrentFrame,
  Sequence,
  useVideoConfig,
  interpolateColors,
} from 'remotion';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  inner: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MyComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const style: ViewStyle = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: interpolateColors(
        frame,
        [0, durationInFrames],
        ['orange', 'green']
      ),
      justifyContent: 'center',
      alignItems: 'center',
    };
  }, [durationInFrames, frame]);

  return (
    <View style={style}>
      <Sequence layout="none" from={10} durationInFrames={Infinity}>
        <Inner />
      </Sequence>
    </View>
  );
};

export const Inner: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <View style={styles.inner}>
      <Text>{frame}</Text>
    </View>
  );
};
