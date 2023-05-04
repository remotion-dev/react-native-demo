import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import type { LooseComponentType } from './core';

type Props<T> = {
  component: LooseComponentType<T>;
  inputProps: T;
};

export function Player<T extends JSX.IntrinsicAttributes>({
  component: Comp,
  inputProps,
}: PropsWithChildren<Props<T>>) {
  return (
    <View>
      <Comp {...inputProps} />
    </View>
  );
}
