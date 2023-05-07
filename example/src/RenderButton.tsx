import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const RenderButton: React.FC<{
  onPress: () => void;
}> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Render</Text>
    </TouchableOpacity>
  );
};
