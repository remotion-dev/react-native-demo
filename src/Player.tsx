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

  const { scale, xCorrection, yCorrection, centerX, centerY } =
    calculateCanvasTransformation({
      canvasSize: { width: props.width, height: props.height },
      compositionHeight: height,
      compositionWidth: width,
    });

  console.log(scale, xCorrection, yCorrection, props.width, props.height);

  const style: ViewProps['style'] = useMemo(() => {
    return {
      height,
      width,
      marginLeft: xCorrection,
      marginTop: yCorrection,
      transform: [
        {
          scale,
        },
      ],
    };
  }, [height, scale, width, xCorrection, yCorrection]);

  const outer = useMemo(() => {
    return {
      left: centerX,
      top: centerY,
    };
  }, [centerX, centerY]);

  return (
    <View style={outer}>
      <View ref={containerRef} style={style}>
        <Suspense fallback={<View />}>
          <Comp {...(defaultProps as {})} />
        </Suspense>
      </View>
    </View>
  );
}
