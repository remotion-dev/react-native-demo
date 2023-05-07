import React from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { useRender } from '@remotion/native';
import {
  requestPermissionsAsync,
  saveToLibraryAsync,
} from 'expo-media-library';

export type RenderState =
  | {
      type: 'preview';
    }
  | {
      type: 'rendering';
      lastFrame: string;
    };

export const RenderButton: React.FC<{
  setState: React.Dispatch<React.SetStateAction<RenderState>>;
}> = ({ setState }) => {
  const { render } = useRender();

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
    setState({
      type: 'preview',
    });
  }, [render, setState]);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={'black'}
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.label}>Render video</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
