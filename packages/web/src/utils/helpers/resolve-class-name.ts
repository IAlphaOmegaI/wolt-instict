import type { cn } from "@zenncore/utils";
import type { State } from "../types/component-state";

/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */
export const resolveClassName = <S = State>(
  className: string | ((state: S) => string) | undefined,
  state: S,
): string | undefined => {
  return typeof className === "function" ? className(state) : className;
};

type ClassName = Parameters<typeof cn>[number];

const isClassNameFunction = <T extends State>(
  fn: unknown,
  state: T,
): fn is (state: T) => string => {
  if (typeof fn !== "function") return false;

  if (fn.length !== 1) return false;

  try {
    const result = fn(state);
    return typeof result === "string";
  } catch {
    return false;
  }
};

export function createClassName<T extends State>(
  classNames: (string | ((state: T) => string))[],
  state: T,
): ClassName[];
export function createClassName(classNames: string[]): ClassName[];
export function createClassName<T extends State>(
  classNames: ClassName[],
  state?: T,
) {
  const resolvedClassNames = classNames.map((className) =>
    state && isClassNameFunction(className, state)
      ? className(state)
      : className,
  );

  return resolvedClassNames;
}
