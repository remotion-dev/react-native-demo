import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCurrentFrame, Sequence } from 'remotion';

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'red',
  },
});

export const MyComp: React.FC = () => {
  const frame = useCurrentFrame();

  console.log(frame);
  return (
    <View style={styles.container}>
      <Sequence layout="none" from={10} durationInFrames={Infinity}>
        <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
      </Sequence>
    </View>
  );
};
