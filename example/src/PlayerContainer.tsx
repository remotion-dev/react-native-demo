import React, { useState } from 'react';
import { useCallback } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Player } from '@remotion/native';

type Size = {
  width: number;
  height: number;
};

export const PlayerContainer: React.FC = () => {
  const [layout, setLayout] = useState<Size | null>(null);

  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  return (
    <View onLayout={onLayoutChange} style={styles.container}>
      {layout === null ? null : (
        <Player width={layout.width} height={layout.height} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
