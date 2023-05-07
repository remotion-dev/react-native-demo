import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
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
    <TouchableOpacity onPress={onPress}>
      <Text>Render</Text>
    </TouchableOpacity>
  );
};
