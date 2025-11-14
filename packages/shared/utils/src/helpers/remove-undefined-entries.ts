import type { EmptyObject } from "../types";

export const removeUndefinedEntries = <O extends EmptyObject>(
  obj: O,
): OmitUndefinedEntries<O> =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !!value) as [
      keyof O,
      Exclude<O[keyof O], undefined>,
    ][],
  ) as OmitUndefinedEntries<O>;

export type OmitUndefinedEntries<T extends EmptyObject> = {
  [K in keyof T as T[K] extends undefined | "" | null ? never : K]: T[K];
};
