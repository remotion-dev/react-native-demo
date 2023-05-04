import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCurrentFrame, Sequence, useVideoConfig } from 'remotion';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export const MyComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  console.log(frame, height, width);

  return (
    <View style={styles.container}>
      <Sequence layout="none" from={10} durationInFrames={Infinity}>
        <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
      </Sequence>
    </View>
  );
};
