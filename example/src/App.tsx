import * as React from 'react';
import { Controls, RemotionContext } from '@remotion/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, View } from 'react-native';
import { MyComp } from './MyComp';
import { RenderButton, RenderState } from './RenderButton';
import { PlayerContainer } from './PlayerContainer';

function Main() {
  const [state, setState] = React.useState<RenderState>({ type: 'preview' });

  return (
    <SafeAreaView style={styles.flex}>
      <RemotionContext
        width={1080}
        height={1080}
        durationInFrames={100}
        fps={30}
        inputProps={{}}
        component={MyComp}
      >
        <View style={styles.flex}>
          {state.type === 'preview' ? (
            <PlayerContainer />
          ) : (
            <View style={styles.flex}>
              <Image
                source={{ uri: state.lastFrame }}
                resizeMode="contain"
                style={styles.fullSize}
              />
            </View>
          )}
          <View style={styles.spacer} />
          <Controls />
          <RenderButton setState={setState} />
        </View>
      </RemotionContext>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.flex}>
        <Main />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  spacer: {
    height: 20,
  },
  preview: {},
});
