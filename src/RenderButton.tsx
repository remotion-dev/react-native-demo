import React, { useCallback, useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RemotionNativeContext } from './RemotionNativeContext';
import { Internals } from 'remotion';

const InnerRenderButton: React.FC = () => {
  const { render } = useContext(RemotionNativeContext);

  const onPress = useCallback(async () => {
    const output = await render();
    console.log('DONE', output);
  }, [render]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Render</Text>
    </TouchableOpacity>
  );
};

export const RenderButton: React.FC = () => {
  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <InnerRenderButton />
    </Internals.CanUseRemotionHooks.Provider>
  );
};
