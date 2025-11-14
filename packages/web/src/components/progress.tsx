import { Progress as ProgressPrimitive } from "@base-ui-components/react/progress";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Progress = ({
  children,
  className,
  classList,
  ...props
}: Progress.Props): JSX.Element => {
  return (
    <ProgressPrimitive.Root
      className={(state) => {
        return cn(
          resolveClassName(className, state),
          resolveClassName(classList?.root, state),
        );
      }}
      {...props}
    >
      {children}
      <ProgressPrimitive.Track
        className={(state) => {
          return cn(
            "h-1 overflow-hidden rounded bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200",
            resolveClassName(classList?.track, state),
          );
        }}
      >
        <ProgressPrimitive.Indicator
          className={(state) => {
            return cn(
              "bg-primary transition-all duration-500",
              resolveClassName(classList?.indicator, state),
            );
          }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
};
export namespace Progress {
  export type ClassListKey = "root" | "track" | "indicator";
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof ProgressPrimitive.Root>;
  export type State = ProgressPrimitive.Root.State;
}

export const ProgressLabel = ({
  className,
  ...props
}: ProgressLabel.Props): JSX.Element => {
  return (
    <ProgressPrimitive.Label
      className={(state) => {
        return cn(
          "font-medium text-gray-900 text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace ProgressLabel {
  export type Props = ComponentProps<typeof ProgressPrimitive.Label>;
}

export const ProgressValue = ({
  className,
  ...props
}: ProgressValue.Props): JSX.Element => {
  return (
    <ProgressPrimitive.Value
      className={(state) => {
        return cn(
          "font-medium text-gray-900 text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace ProgressValue {
  export type Props = ComponentProps<typeof ProgressPrimitive.Value>;
}
