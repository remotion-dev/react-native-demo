import type { StandardLonghandProperties } from 'csstype';
import type { VideoConfig } from 'remotion';

const calculateScale = ({
  canvasSize,
  compositionHeight,
  compositionWidth,
}: {
  compositionWidth: number;
  compositionHeight: number;
  canvasSize: Size;
}) => {
  const heightRatio = canvasSize.height / compositionHeight;
  const widthRatio = canvasSize.width / compositionWidth;

  const ratio = Math.min(heightRatio, widthRatio);

  return ratio;
};

type Layout = {
  centerX: number;
  centerY: number;
  xCorrection: number;
  yCorrection: number;
  scale: number;
};

export const calculateCanvasTransformation = ({
  compositionWidth,
  compositionHeight,
  canvasSize,
}: {
  compositionWidth: number;
  compositionHeight: number;
  canvasSize: Size;
}): Layout => {
  const scale = calculateScale({
    canvasSize,
    compositionHeight,
    compositionWidth,
  });

  const correction = 0 - (1 - scale) / 2;
  const xCorrection = correction * compositionWidth;
  const yCorrection = correction * compositionHeight;
  const width = compositionWidth * scale;
  const height = compositionHeight * scale;
  const centerX = canvasSize.width / 2 - width / 2;
  const centerY = canvasSize.height / 2 - height / 2;
  return {
    centerX,
    centerY,
    xCorrection,
    yCorrection,
    scale,
  };
};

export const calculateOuterStyle = ({
  config,
  style,
  canvasSize,
}: {
  config: VideoConfig | null;
  style: React.CSSProperties | undefined;
  canvasSize: Size | null;
}): React.CSSProperties => {
  if (!config) {
    return {};
  }

  return {
    position: 'relative',
    overflow: 'hidden',
    ...calculatePlayerSize({
      compositionHeight: config.height,
      compositionWidth: config.width,
      currentSize: canvasSize,
      height: style?.height as StandardLonghandProperties['width'],
      width: style?.width as StandardLonghandProperties['height'],
    }),
    ...style,
  };
};

const calculatePlayerSize = ({
  currentSize,
  width,
  height,
  compositionWidth,
  compositionHeight,
}: {
  currentSize: Size | null;
  width: StandardLonghandProperties['width'] | undefined;
  height: StandardLonghandProperties['height'] | undefined;
  compositionWidth: number;
  compositionHeight: number;
}): React.CSSProperties => {
  if (width !== undefined && height === undefined) {
    return {
      aspectRatio: [compositionWidth, compositionHeight].join('/'),
    };
  }

  // Opposite: If has height specified, evaluate the height and specify a default width.
  if (height !== undefined && width === undefined) {
    return {
      // Aspect ratio CSS prop will work
      aspectRatio: [compositionWidth, compositionHeight].join('/'),
    };
  }

  if (!currentSize) {
    return {
      width: compositionWidth,
      height: compositionHeight,
    };
  }

  return {
    width: compositionWidth,
    height: compositionHeight,
  };
};

type Size = {
  width: number;
  height: number;
};
