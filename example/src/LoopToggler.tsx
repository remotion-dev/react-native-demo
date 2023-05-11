import React, { useMemo } from 'react';
import { Image, ImageStyle, TouchableHighlight } from 'react-native';

export const LoopToggler: React.FC<{
  loop: boolean;
  setLoop: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ loop, setLoop }) => {
  const onPress = React.useCallback(() => {
    setLoop((prev) => !prev);
  }, [setLoop]);

  const style: ImageStyle = useMemo(() => {
    return {
      width: 24,
      height: 24,
      opacity: loop ? 1 : 0.5,
    };
  }, [loop]);

  return (
    <TouchableHighlight onPress={onPress}>
      <Image style={style} source={require('../assets/loop.png')} />
    </TouchableHighlight>
  );
};
