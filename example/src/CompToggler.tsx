import React from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';

export type Comp = 'horse' | 'runner';

export const CompToggler: React.FC<{
  onChange: (newAspect: Comp) => void;
  current: Comp;
}> = ({ onChange, current }) => {
  const onHorse = React.useCallback(() => {
    onChange('horse');
  }, [onChange]);

  const onRunner = React.useCallback(() => {
    onChange('runner');
  }, [onChange]);

  return (
    <View>
      <View style={styles.row}>
        <TouchableHighlight
          onPress={onHorse}
          style={current === 'horse' ? activeButton : styles.button}
        >
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../assets/horse.png')}
          />
        </TouchableHighlight>
        <View style={styles.divider} />
        <TouchableHighlight
          onPress={onRunner}
          style={current === 'runner' ? activeButton : styles.button}
        >
          <Image
            style={styles.squareIcon}
            resizeMode="contain"
            source={require('../assets/runner.png')}
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
