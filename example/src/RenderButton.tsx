import React from 'react';
import { useCallback } from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';
import { useRender } from '@remotion/native';
import {
  requestPermissionsAsync,
  saveToLibraryAsync,
} from 'expo-media-library';

export const RenderButton: React.FC = () => {
  const { render } = useRender();

  const onPress = useCallback(async () => {
    const url = await render();
    const response = await requestPermissionsAsync(true);
    if (response.granted) {
      await saveToLibraryAsync(url);
      Alert.alert('Saved to Gallery!');
    }
  }, [render]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Render</Text>
    </TouchableOpacity>
  );
};
