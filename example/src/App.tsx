import * as React from 'react';
import { Controls, RemotionContext } from '@remotion/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { MyComp } from './MyComp';
import { RenderButton } from './RenderButton';
import { PlayerContainer } from './PlayerContainer';

type State =
  | {
      state: 'preview';
    }
  | {
      type: 'rendering';
      lastFrame: string | null;
    };

function Main() {
  const [state, setState] = React.useState<State>({ state: 'preview' });

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
          <PlayerContainer />
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
  box: {
    width: 60,
    height: 60,
  },
  spacer: {
    height: 20,
  },
});
