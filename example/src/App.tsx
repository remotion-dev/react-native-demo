import * as React from 'react';
import { Controls, RemotionContext, useRender } from '@remotion/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Alert, StyleSheet, View } from 'react-native';
import { MyComp } from './MyComp';
import { RenderButton } from './RenderButton';
import { PlayerContainer } from './PlayerContainer';
import {
  requestPermissionsAsync,
  saveToLibraryAsync,
} from 'expo-media-library';

type State =
  | {
      state: 'preview';
    }
  | {
      type: 'rendering';
      lastFrame: string | null;
    };

function Main() {
  const { render } = useRender();
  const [state, setState] = React.useState<State>({ state: 'preview' });

  const onPress = React.useCallback(async () => {
    const url = await render({
      onFrame: (frame) => {
        setState({
          type: 'rendering',
          lastFrame: frame,
        });
      },
    });

    const response = await requestPermissionsAsync(true);
    if (response.granted) {
      await saveToLibraryAsync(url);
      Alert.alert('Saved to Gallery!');
    }
  }, [render]);

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
          <RenderButton onPress={onPress} />
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
