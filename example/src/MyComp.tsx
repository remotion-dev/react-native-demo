import {
  evolvePath,
  extendViewBox,
  getBoundingBox,
  resetPath,
  scalePath,
} from '@remotion/paths';
import React, { useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SAMPLE_RUN } from './run';

import { useFonts, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

export const MyComp: React.FC = () => {
  const [loadedFonts] = useFonts({
    DMSans_500Medium,
  });

  const frame = useCurrentFrame();
  const { width, durationInFrames } = useVideoConfig();

  const style: ViewStyle = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: '#0133CC',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }, []);

  const progress = interpolate(frame, [0, durationInFrames * 0.8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const path = useMemo(() => {
    const coordinates = SAMPLE_RUN.map((point, i) => {
      const { ln, lt } = point;
      const instruction: string = i === 0 ? 'M' : 'L';
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

  const container: ViewStyle = useMemo(() => {
    return { ...StyleSheet.absoluteFillObject, flex: 1, opacity };
  }, [opacity]);

  const svgStyle: ViewStyle = useMemo(() => {
    return {
      width: trackWidth,
      height: (boundingBox.y2 / boundingBox.x2) * trackWidth,
    };
  }, [boundingBox.x2, boundingBox.y2, trackWidth]);

  const label: TextStyle = useMemo(() => {
    return {
      fontFamily: loadedFonts ? 'DMSans_500Medium' : undefined,
      fontSize: 120,
      color: 'white',
      textAlign: 'right',
    };
  }, [loadedFonts]);

  const viewBox = extendViewBox(
    `0 0 ${boundingBox.x2} ${boundingBox.y2}`,
    1.02
  );

  const imageSource = useMemo(() => {
    return {
      uri: 'https://jonny.io/avatar.png',
    };
  }, []);

  return (
    <View style={style}>
      <View style={container}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image
              source={imageSource}
              fadeDuration={0}
              style={styles.avatar}
            />
            <View style={styles.spacer} />
            <Text style={styles.runner}>Jonny Burger</Text>
          </View>
        </View>
        <View style={styles.center}>
          <Svg style={svgStyle} viewBox={viewBox}>
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
        <View style={styles.container}>
          <Text style={label}>{distance.toFixed(2)}km</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 30,
  },
  runner: {
    fontSize: 50,
    color: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
