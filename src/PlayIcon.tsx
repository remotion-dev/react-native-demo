import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 30,
    tintColor: 'white',
    height: 30,
  },
});

export const PlayIcon: React.FC = () => {
  return (
    <Image
      fadeDuration={0}
      resizeMode="contain"
      style={styles.container}
      source={require('./play.png')}
    />
  );
};

export const PauseIcon: React.FC = () => {
  return (
    <Image
      fadeDuration={0}
      resizeMode="contain"
      style={styles.container}
      source={require('./pause.png')}
    />
  );
};
