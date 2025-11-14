import { Toolbar as ToolbarPrimitive } from "@base-ui-components/react/toolbar";
import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Toolbar = ({
  className,
  ...props
}: Toolbar.Props): JSX.Element => {
  return (
    <ToolbarPrimitive.Root
      className={(state) => {
        return cn(
          props.orientation === "vertical" ? "space-y-2" : "space-x-2",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace Toolbar {
  export type Props = ComponentProps<typeof ToolbarPrimitive.Root>;
  export type State = ToolbarPrimitive.Root.State;
  export type ItemMetadata = ToolbarPrimitive.Root.ItemMetadata;
  export type Orientation = ToolbarPrimitive.Root.Orientation;
}

export const ToolbarButton = ({
  className,
  ...props
}: ToolbarButton.Props): JSX.Element => {
  return (
    <ToolbarPrimitive.Button
      className={(state) => {
        return cn(
          "focus-visible:-outline-offset-1 flex h-8 select-none items-center justify-center rounded-sm px-[0.75rem] font-[inherit] font-medium text-gray-600 text-sm hover:bg-gray-100 focus-visible:bg-none focus-visible:outline focus-visible:outline-blue-800 active:bg-gray-200 data-pressed:bg-gray-100 data-pressed:text-gray-900",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace ToolbarButton {
  export type Props = ComponentProps<typeof ToolbarPrimitive.Button>;
  export type State = ToolbarPrimitive.Button.State;
}

export const ToolbarLink: typeof ToolbarPrimitive.Link = ToolbarPrimitive.Link;
export namespace ToolbarLink {
  export type Props = ComponentProps<typeof ToolbarPrimitive.Link>;
  export type State = ToolbarPrimitive.Link.State;
}

export const ToolbarSeparator: typeof ToolbarPrimitive.Separator =
  ToolbarPrimitive.Separator;
export namespace ToolbarSeparator {
  export type Props = ComponentProps<typeof ToolbarPrimitive.Separator>;
}

export const ToolbarGroup: typeof ToolbarPrimitive.Group =
  ToolbarPrimitive.Group;
export namespace ToolbarGroup {
  export type Props = ComponentProps<typeof ToolbarPrimitive.Group>;
}

export const ToolbarInput: typeof ToolbarPrimitive.Input =
  ToolbarPrimitive.Input;
export namespace ToolbarInput {
  export type Props = ComponentProps<typeof ToolbarPrimitive.Input>;
  export type State = ToolbarPrimitive.Input.State;
}
