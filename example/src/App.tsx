import * as React from 'react';
import { Controls, Player, RemotionContext } from '@remotion/native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { MyComp } from './MyComp';
import { RenderButton } from './RenderButton';

function Main() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  console.log(insets);
  return (
    <SafeAreaView style={styles.container}>
      <RemotionContext
        width={300}
        height={300}
        durationInFrames={100}
        fps={30}
        inputProps={{}}
        component={MyComp}
      >
        <View style={{ flex: 1 }}>
          <Player width={width} height={height} />
          <View style={styles.spacer} />
          <Controls />
          <View style={styles.spacer} />
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
    marginVertical: 20,
  },
  spacer: {
    height: 20,
  },
});
