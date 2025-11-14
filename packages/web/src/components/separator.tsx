import { Separator as SeparatorPrimitive } from "@base-ui-components/react/separator";
import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Separator = ({
  className,
  ...props
}: Separator.Props): JSX.Element => {
  return (
    <SeparatorPrimitive
      className={(state) => cn("shrink-0", resolveClassName(className, state))}
      {...props}
    />
  );
};
export namespace Separator {
  export type Props = ComponentProps<typeof SeparatorPrimitive>;
  export type State = SeparatorPrimitive.State;
}
