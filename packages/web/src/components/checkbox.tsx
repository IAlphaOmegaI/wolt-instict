import { Checkbox as CheckBoxPrimitive } from "@base-ui-components/react/checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui-components/react/checkbox-group";
import { CheckIcon } from "@zenncore/icons";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Checkbox = ({
  className,
  classList,
  ...props
}: Checkbox.Props): JSX.Element => {
  return (
    <CheckBoxPrimitive.Root
      className={(state) => {
        return cn(
          "flex size-5 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-primary-dimmed focus-visible:outline-offset-2 data-unchecked:border data-unchecked:border-gray-300 data-checked:bg-primary",
          resolveClassName(className, state),
          resolveClassName(classList?.root, state),
        );
      }}
      {...props}
    >
      <CheckBoxPrimitive.Indicator
        className={(state) => {
          return cn(
            "flex text-gray-50 data-unchecked:hidden",
            resolveClassName(classList?.indicator?.root, state),
          );
        }}
      >
        <CheckIcon
          className={cn("size-4 stroke-white", classList?.indicator?.icon)}
        />
      </CheckBoxPrimitive.Indicator>
    </CheckBoxPrimitive.Root>
  );
};
export namespace Checkbox {
  export type ClassListKey = "root" | { indicator: "root" | "icon" };
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof CheckBoxPrimitive.Root>;
  export type State = CheckBoxPrimitive.Root.State;
}

export const CheckboxGroup = ({
  className,
  ...props
}: CheckboxGroup.Props): JSX.Element => {
  return (
    <CheckboxGroupPrimitive
      className={(state) => {
        return cn("flex flex-col gap-1", resolveClassName(className, state));
      }}
      {...props}
    />
  );
};
export namespace CheckboxGroup {
  export type Props = ComponentProps<typeof CheckboxGroupPrimitive>;
  export type State = CheckboxGroupPrimitive.State;
}
