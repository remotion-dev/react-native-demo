import {
  evolvePath,
  extendViewBox,
  getBoundingBox,
  resetPath,
  scalePath,
} from '@remotion/paths';
import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SAMPLE_RUN } from './run';

import { useFonts, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

export const MyComp: React.FC = () => {
  const [loadedFonts] = useFonts({
    DMSans_500Medium,
  });
  const { width } = useVideoConfig();
  const style: ViewStyle = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: '#0133CC',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }, []);

  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = interpolate(frame, [0, durationInFrames * 0.8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const path = useMemo(() => {
    const coordinates = SAMPLE_RUN.map((point, i) => {
      const { ln, lt } = point;
      const instruction = i === 0 ? 'M' : 'L';
      return `${instruction} ${ln} ${lt}`;
    }).join(' ');

    return resetPath(scalePath(resetPath(coordinates), 3000, 3000));
  }, []);

  const boundingBox = getBoundingBox(path);
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, path);

  const padding = 30;
  const trackWidth = width - padding * 2;
  const distance = progress * 5.4;
  const opacity = interpolate(frame, [0, 10], [0, 1]);

  return (
    <View style={style}>
      <View style={{ ...StyleSheet.absoluteFillObject, flex: 1, opacity }}>
        <View
          style={{
            padding: 40,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri: 'https://jonny.io/avatar.png',
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
            <View style={{ width: 30 }} />
            <Text
              style={{
                color: 'white',
                fontSize: 50,
              }}
            >
              Jonny Burger
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Svg
            style={{
              width: trackWidth,
              height: (boundingBox.y2 / boundingBox.x2) * trackWidth,
            }}
            viewBox={extendViewBox(
              `0 0 ${boundingBox.x2} ${boundingBox.y2}`,
              1.02
            )}
          >
            <Path
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              d={path}
              stroke="white"
              strokeWidth={0.7}
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <View
          style={{
            padding: 40,
          }}
        >
          <Text
            style={{
              fontFamily: loadedFonts ? 'DMSans_500Medium' : undefined,
              fontSize: 120,
              color: 'white',
              textAlign: 'right',
            }}
          >
            {distance.toFixed(2)}km
          </Text>
        </View>
      </View>
    </View>
  );
};
