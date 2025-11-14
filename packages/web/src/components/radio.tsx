import { Radio as RadioPrimitive } from "@base-ui-components/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui-components/react/radio-group";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Radio = ({
  className,
  classList,
  ...props
}: Radio.Props): JSX.Element => {
  return (
    <RadioPrimitive.Root
      className={(state) => {
        return cn(
          "flex size-5 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:outline-offset-2 data-unchecked:border data-unchecked:border-gray-300 data-checked:bg-primary",
          resolveClassName(className, state),
          resolveClassName(classList?.root, state),
        );
      }}
      {...props}
    >
      <RadioPrimitive.Indicator
        className={(state) => {
          return cn(
            "flex before:size-2 before:rounded-full before:bg-gray-50 data-unchecked:hidden",
            resolveClassName(classList?.indicator, state),
          );
        }}
      />
    </RadioPrimitive.Root>
  );
};
export namespace Radio {
  export type ClassListKey = "root" | "indicator";
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof RadioPrimitive.Root>;
  export type State = RadioPrimitive.Root.State;
}

export const RadioGroup = ({
  className,
  ...props
}: RadioGroup.Props): JSX.Element => {
  return (
    <RadioGroupPrimitive
      className={(state) => cn("space-y-2", resolveClassName(className, state))}
      {...props}
    />
  );
};
export namespace RadioGroup {
  export type Props = ComponentProps<typeof RadioGroupPrimitive>;
  export type State = RadioGroupPrimitive.State;
}
