import type { EmptyObject } from "./empty-object";

export type DeepPartial<T extends EmptyObject> = {
  [K in keyof T]?: T[K] extends EmptyObject ? DeepPartial<T[K]> : T[K];
};
