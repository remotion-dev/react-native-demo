import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'red',
  },
});

export const MyComp: React.FC = () => {
  return <View style={styles.container} />;
};
