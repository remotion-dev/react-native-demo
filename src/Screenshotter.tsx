import React, { useContext, useMemo } from 'react';
import { Dimensions, View, ViewProps } from 'react-native';
import { Internals, useVideoConfig } from 'remotion';
import { RemotionNativeContext } from './RemotionNativeContext';

// TODO: Only mount while rendering
export const Screenshotter: React.FC = () => {
  const { defaultProps, width, height } = useVideoConfig();
  const manager = useContext(Internals.CompositionManager);
  const { screenshotterRef } = useContext(RemotionNativeContext);

  const Comp = useMemo(() => {
    return manager.compositions[0]?.component!;
  }, [manager.compositions]);

  const outer: ViewProps['style'] = useMemo(() => {
    return {
      height: height / Dimensions.get('window').scale,
      width: width / Dimensions.get('window').scale,
    };
  }, [height, width]);

  const style: ViewProps['style'] = useMemo(() => {
    const scale = 1 / Dimensions.get('window').scale;
    const actualWidth = width * scale;
    const actualHeight = height * scale;
    const xCorrection = (actualWidth - width) / 2;
    const yCorrection = (actualHeight - height) / 2;

    return {
      height,
      width,
      transform: [{ scale }],
      marginLeft: xCorrection,
      marginTop: yCorrection,
      position: 'absolute',
    };
  }, [height, width]);

  return (
    <View ref={screenshotterRef} style={outer}>
      <View style={style}>
        <Comp {...(defaultProps as {})} />
      </View>
    </View>
  );
};
