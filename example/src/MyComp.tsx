import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCurrentFrame } from 'remotion';

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'red',
  },
});

export const MyComp: React.FC = () => {
  const frame = useCurrentFrame();
  return <View style={styles.container} />;
};
