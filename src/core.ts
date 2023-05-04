import type { ComponentType } from 'react';

export type LooseComponentType<T> =
  | ComponentType<T>
  | ((props: T) => React.ReactNode);
