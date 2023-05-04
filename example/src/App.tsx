import * as React from 'react';
import { Player } from '@remotion/native';

import { StyleSheet, View } from 'react-native';
import { MyComp } from './MyComp';

export default function App() {
  return (
    <View style={styles.container}>
      <Player
        width={300}
        height={300}
        durationInFrames={100}
        fps={30}
        inputProps={{}}
        component={MyComp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
