import React, { Suspense, useContext, useMemo } from 'react';
import { Internals, useVideoConfig } from 'remotion';
import { View, ViewProps } from 'react-native';
import { RemotionNativeContext } from './RemotionNativeContext';
import { calculateCanvasTransformation } from './calculate-scale';

type Props = {
  width: number;
  height: number;
};

export const Player: React.FC<Props> = (props) => {
  return (
    <Internals.CanUseRemotionHooks.Provider value>
      <InnerPlayer {...props} />
    </Internals.CanUseRemotionHooks.Provider>
  );
};

function InnerPlayer(props: Props) {
  const { defaultProps, width, height } = useVideoConfig();
  const manager = useContext(Internals.CompositionManager);
  const { containerRef } = useContext(RemotionNativeContext);

  const Comp = useMemo(() => {
    return manager.compositions[0]?.component!;
  }, [manager.compositions]);

  const { scale, xCorrection, yCorrection } = calculateCanvasTransformation({
    canvasSize: { width: props.width, height: props.height },
    compositionHeight: height,
    compositionWidth: width,
  });

  const style: ViewProps['style'] = useMemo(() => {
    return {
      height,
      width,
      marginLeft: xCorrection,
      marginTop: yCorrection,
      position: 'absolute',
      transform: [
        {
          scale,
        },
      ],
    };
  }, [height, scale, width, xCorrection, yCorrection]);

  return (
    <View ref={containerRef} style={style}>
      <Suspense fallback={<View />}>
        <Comp {...(defaultProps as {})} />
      </Suspense>
    </View>
  );
}
