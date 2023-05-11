import React from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';

export type AspectRatio = 'portrait' | 'square' | 'wide';

export const AspectRatioToggler: React.FC<{
  onChange: (newAspect: AspectRatio) => void;
  current: AspectRatio;
}> = ({ onChange, current }) => {
  const onWide = React.useCallback(() => {
    onChange('wide');
  }, [onChange]);

  const onSquare = React.useCallback(() => {
    onChange('square');
  }, [onChange]);

  const onPortrait = React.useCallback(() => {
    onChange('portrait');
  }, [onChange]);

  return (
    <View>
      <View style={styles.row}>
        <TouchableHighlight
          onPress={onWide}
          style={current === 'wide' ? activeButton : styles.button}
        >
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../assets/wide.png')}
          />
        </TouchableHighlight>
        <View style={styles.divider} />
        <TouchableHighlight
          onPress={onSquare}
          style={current === 'square' ? activeButton : styles.button}
        >
          <Image
            style={styles.squareIcon}
            resizeMode="contain"
            source={require('../assets/square.png')}
          />
        </TouchableHighlight>
        <View style={styles.divider} />
        <TouchableHighlight
          onPress={onPortrait}
          style={current === 'portrait' ? activeButton : styles.button}
        >
          <Image
            style={styles.portraitIcon}
            resizeMode="contain"
            source={require('../assets/portrait.png')}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginLeft: 20,
  },
  divider: {
    borderLeftColor: '#666',
    borderLeftWidth: 1,
  },
  button: {
    width: 50,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  squareIcon: {
    width: 24,
    height: 24,
  },
  portraitIcon: {
    width: 26,
    height: 26,
  },
});

const activeButton = {
  ...styles.button,
  backgroundColor: '#555',
};
