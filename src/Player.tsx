import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import type { LooseComponentType } from './core';

type Props<T> = {
  component: LooseComponentType<T>;
};

export function Player<T>({ children }: PropsWithChildren<Props<T>>) {
  return <View>{children}</View>;
}
