import React, { useMemo } from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TouchableHighlight,
  ViewProps,
} from 'react-native';
import { useRender } from '@remotion/native';
import {
  requestPermissionsAsync,
  saveToLibraryAsync,
} from 'expo-media-library';
import { useVideoConfig } from 'remotion';

export type RenderState =
  | {
      type: 'preview';
    }
  | {
      type: 'rendering';
      lastFrameUrl: string;
      renderedFrames: number;
      encodedFrames: number;
    };

export const RenderButton: React.FC<{
  state: RenderState;
  setState: React.Dispatch<React.SetStateAction<RenderState>>;
}> = ({ setState, state }) => {
  const { render } = useRender();
  const { durationInFrames } = useVideoConfig();

  const onPress = React.useCallback(async () => {
    const url = await render({
      onFrame: (frame, renderedFrames) => {
        setState({
          type: 'rendering',
          lastFrameUrl: frame,
          encodedFrames: 0,
          renderedFrames,
        });
      },
      onEncodingProgress: (encodedFrames) => {
        setState((prevState) => {
          if (prevState.type !== 'rendering') {
            throw new TypeError('rendering');
          }

          return {
            ...prevState,
            encodedFrames,
          };
        });
      },
    });

    const response = await requestPermissionsAsync(true);

    if (response.granted) {
      await saveToLibraryAsync(url);
      Alert.alert('Saved to Gallery!');
    }

    setState({
      type: 'preview',
    });
  }, [render, setState]);

  const label = useMemo(() => {
    if (state.type === 'rendering') {
      if (state.encodedFrames > 0) {
        return `Encoding ${state.encodedFrames}/${durationInFrames}`;
      }
      return `Rendering ${state.renderedFrames}/${durationInFrames}`;
    }

    return 'Render video';
  }, [durationInFrames, state]);

  const disabled = state.type !== 'preview';

  const style: ViewProps['style'] = useMemo(() => {
    return {
      backgroundColor: disabled ? 'rgba(255, 255, 255, 0.5)' : '#eee',
      padding: 16,
      borderRadius: 8,
    };
  }, [disabled]);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={'black'}
        style={style}
        disabled={state.type !== 'preview'}
        onPress={onPress}
      >
        <Text style={styles.label}>{label}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
