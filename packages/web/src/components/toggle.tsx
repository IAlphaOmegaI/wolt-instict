import { Toggle as TogglePrimitive } from "@base-ui-components/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui-components/react/toggle-group";
import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Toggle = ({ className, ...props }: Toggle.Props): JSX.Element => {
  return (
    <TogglePrimitive
      className={(state) => {
        return cn(
          "focus-visible:-outline-offset-1 flex size-8 select-none items-center justify-center rounded-sm hover:bg-gray-100 focus-visible:bg-none focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-200 data-pressed:bg-red-500",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace Toggle {
  export type Props = ComponentProps<typeof TogglePrimitive>;
  export type State = TogglePrimitive.State;
}

export const ToggleGroup = ({
  className,
  ...props
}: ToggleGroup.Props): JSX.Element => {
  return (
    <ToggleGroupPrimitive
      className={(state) => {
        return cn(
          "flex rounded-md border border-gray-200 bg-gray-50 p-0.5",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace ToggleGroup {
  export type Props = ComponentProps<typeof ToggleGroupPrimitive>;
  export type State = ToggleGroupPrimitive.State;
}
