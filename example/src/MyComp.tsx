import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Sequence, useVideoConfig } from 'remotion';

export const MyComp: React.FC = () => {
  const style: ViewStyle = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: '#0133CC',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }, []);

  const { height, width } = useVideoConfig();

  return (
    <View style={style}>
      <Sequence layout="none" from={10} durationInFrames={Infinity}>
        <Svg viewBox={`0 0 ${width} ${height}`}>
          <Path d={`M 0 0 L 100 100`} stroke="white" strokeWidth={10} />
        </Svg>
      </Sequence>
    </View>
  );
};
