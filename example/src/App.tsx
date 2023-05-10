import * as React from 'react';
import { Controls, RemotionContext } from '@remotion/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Switch, View } from 'react-native';
import { MyComp } from './MyComp';
import { RenderButton, RenderState } from './RenderButton';
import { PlayerContainer } from './PlayerContainer';
import { StatusBar } from 'expo-status-bar';

function Main() {
  const [state, setState] = React.useState<RenderState>({ type: 'preview' });
  const [portrait, setPortrait] = React.useState(false);

  const togglePortrait = React.useCallback(() => {
    setPortrait((p) => !p);
  }, []);

  return (
    <View style={styles.flex}>
      <RemotionContext
        width={1080}
        height={portrait ? 1080 : 1920}
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
                fadeDuration={0}
                source={{ uri: state.lastFrameUrl }}
                resizeMode="contain"
                style={styles.fullSize}
              />
            </View>
          )}
          <View style={styles.spacer} />
          <Switch value={portrait} onChange={togglePortrait} />
          <View style={styles.spacer} />
          <Controls />
          <RenderButton state={state} setState={setState} />
        </View>
      </RemotionContext>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar style="light" />
        <Main />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  app: {
    backgroundColor: '#222',
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
