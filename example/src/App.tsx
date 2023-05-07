import * as React from 'react';
import { Controls, Player, RemotionContext } from '@remotion/native';

import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { MyComp } from './MyComp';
import { RenderButton } from './RenderButton';

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <RemotionContext
        width={300}
        height={300}
        durationInFrames={100}
        fps={30}
        inputProps={{}}
        component={MyComp}
      >
        <Player width={width} height={height} />
        <View style={styles.spacer} />
        <Controls />
        <View style={styles.spacer} />
        <RenderButton />
      </RemotionContext>
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
  spacer: {
    height: 20,
  },
});
