import { Meter as MeterPrimitive } from "@base-ui-components/react/meter";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Meter = ({
  children,
  className,
  classList,
  ...props
}: Meter.Props): JSX.Element => {
  return (
    <MeterPrimitive.Root
      className={(state) => {
        return cn(
          resolveClassName(className, state),
          resolveClassName(classList?.root, state),
        );
      }}
      {...props}
    >
      {children}
      <MeterPrimitive.Track
        className={(state) => {
          return cn(
            "h-1 overflow-hidden rounded bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200",
            resolveClassName(classList?.track, state),
          );
        }}
      >
        <MeterPrimitive.Indicator
          className={(state) => {
            return cn(
              "bg-primary transition-all duration-500",
              resolveClassName(classList?.indicator, state),
            );
          }}
        />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
};
export namespace Meter {
  export type ClassListKey = "root" | "track" | "indicator";
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof MeterPrimitive.Root>;
  export type State = MeterPrimitive.Root.State;
}

export const MeterLabel = ({
  className,
  ...props
}: MeterLabel.Props): JSX.Element => {
  return (
    <MeterPrimitive.Label
      className={(state) => {
        return cn(
          "font-medium text-foreground-dimmed text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace MeterLabel {
  export type Props = ComponentProps<typeof MeterPrimitive.Label>;
}

export const MeterValue = ({
  className,
  ...props
}: MeterValue.Props): JSX.Element => {
  return (
    <MeterPrimitive.Value
      className={(state) => {
        return cn(
          "font-medium text-foreground-dimmed text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace MeterValue {
  export type Props = ComponentProps<typeof MeterPrimitive.Value>;
}
