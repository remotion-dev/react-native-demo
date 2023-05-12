/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { interpolate, useCurrentFrame } from 'remotion';

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Pictures: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <View style={styles.center}>
      <View style={styles.center}>
        <Image
          source={require('../assets/cracow1.jpg')}
          resizeMode="contain"
          style={{
            width: 800,
            marginTop: -400,
            marginLeft: interpolate(frame, [0, 100], [0, 400]),
          }}
        />
      </View>
      <View style={styles.center}>
        <Image
          source={require('../assets/cracow2.jpg')}
          resizeMode="contain"
          style={{
            height: 800,
            marginLeft: 300,
            marginTop: interpolate(frame, [0, 100], [900, 700]),
          }}
        />
      </View>
    </View>
  );
};
