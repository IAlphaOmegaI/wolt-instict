"use client";

import { type Context, createContext, use } from "react";

type ContextualizeParams<T> = {
  name: string;
  defaultValue?: T;
};

export const contextualize = <T>({
  name,
  defaultValue,
}: ContextualizeParams<T>): [Context<T | undefined>, () => T] => {
  const context = createContext<T | undefined>(defaultValue);

  const useContextConsumer = () => {
    const value = use(context);

    if (value === undefined) {
      throw new Error(
        `zenncore: ${name}Context is missing. ${name} components must be placed within a ${name}Provider.`,
      );
    }

    return value;
  };

  return [context, useContextConsumer] as const;
};
