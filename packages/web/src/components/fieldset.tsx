import { Fieldset as FieldsetPrimitive } from "@base-ui-components/react/fieldset";
import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Fieldset = ({
  className,
  ...props
}: Fieldset.Props): JSX.Element => {
  return (
    <FieldsetPrimitive.Root
      className={(state) => cn("space-y-2", resolveClassName(className, state))}
      {...props}
    />
  );
};
export namespace Fieldset {
  export type Props = ComponentProps<typeof FieldsetPrimitive.Root>;
  export type State = FieldsetPrimitive.Root.State;
}

export const FieldsetLegend = ({
  className,
  ...props
}: FieldsetLegend.Props): JSX.Element => {
  return (
    <FieldsetPrimitive.Legend
      className={(state) => {
        return cn(
          "border-gray-200 border-b pb-3 font-medium text-gray-900 text-lg",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace FieldsetLegend {
  export type Props = ComponentProps<typeof FieldsetPrimitive.Legend>;
  export type State = FieldsetPrimitive.Legend.State;
}
