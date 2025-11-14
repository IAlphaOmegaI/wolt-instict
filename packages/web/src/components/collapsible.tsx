import { Collapsible as CollapsiblePrimitive } from "@base-ui-components/react/collapsible";
import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Collapsible = ({
  className,
  ...props
}: Collapsible.Props): JSX.Element => {
  return (
    <CollapsiblePrimitive.Root
      className={(state) => {
        return cn(
          "flex w-56 flex-col justify-center",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace Collapsible {
  export type Props = ComponentProps<typeof CollapsiblePrimitive.Root>;
}

export const CollapsibleTrigger = ({
  className,
  ...props
}: CollapsibleTrigger.Props): JSX.Element => {
  return (
    <CollapsiblePrimitive.Trigger
      className={(state) => {
        return cn(
          "flex w-56 items-center gap-2",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace CollapsibleTrigger {
  export type Props = ComponentProps<typeof CollapsiblePrimitive.Trigger>;
}

export const CollapsiblePanel = ({
  className,
  ...props
}: CollapsiblePanel.Props): JSX.Element => {
  return (
    <CollapsiblePrimitive.Panel
      className={(state) => {
        return cn(
          "flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden bg-accent transition-all ease-out data-ending-style:h-0 data-starting-style:h-0",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace CollapsiblePanel {
  export type Props = ComponentProps<typeof CollapsiblePrimitive.Panel>;
  export type State = CollapsiblePrimitive.Panel.State;
}
