import * as React from 'react';
import { Controls, RemotionContext } from '@remotion/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { MyComp } from './MyComp';
import { RenderButton } from './RenderButton';
import { PlayerContainer } from './PlayerContainer';

function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <RemotionContext
        width={1080}
        height={1080}
        durationInFrames={100}
        fps={30}
        inputProps={{}}
        component={MyComp}
      >
        <View style={{ flex: 1 }}>
          <PlayerContainer />
          <View style={styles.spacer} />
          <Controls />
          <RenderButton />
        </View>
      </RemotionContext>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
  },
  spacer: {
    height: 20,
  },
});
