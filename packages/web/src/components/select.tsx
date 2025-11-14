import { Select as SelectPrimitive } from "@base-ui-components/react/select";
import { CheckIcon, ChevronYIcon } from "@zenncore/icons";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Select: typeof SelectPrimitive.Root = SelectPrimitive.Root;
export namespace Select {
  export type Props<
    Value,
    Multiple extends boolean | undefined = false,
  > = ComponentProps<typeof SelectPrimitive.Root<Value, Multiple>>;
  export type State = SelectPrimitive.Root.State;
  export type Actions = SelectPrimitive.Root.Actions;
  export type ChangeEventDetails = SelectPrimitive.Root.ChangeEventDetails;
  export type ChangeEventReason = SelectPrimitive.Root.ChangeEventReason;
}

export const SelectTrigger = ({
  children,
  className,
  classList,
  ...props
}: SelectTrigger.Props): JSX.Element => {
  return (
    <SelectPrimitive.Trigger
      className={(state) => {
        return cn(
          "focus-visible:-outline-offset-1 flex h-10 min-w-36 select-none items-center justify-between gap-3 rounded-md border border-accent-foreground pr-3 pl-3.5 text-base text-gray-900 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-100 data-popup-open:bg-gray-100",
          resolveClassName(className, state),
          resolveClassName(classList?.trigger, state),
        );
      }}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        className={(state) => {
          return cn("flex", resolveClassName(classList?.icon?.root, state));
        }}
      >
        <ChevronYIcon
          className={cn("stroke-foreground", classList?.icon?.icon)}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};
export namespace SelectTrigger {
  export type ClassListKey = "trigger" | { icon: "root" | "icon" };
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof SelectPrimitive.Trigger>;
  export type State = SelectPrimitive.Trigger.State;
}

export const SelectValue: typeof SelectPrimitive.Value = SelectPrimitive.Value;
export namespace SelectValue {
  export type Props = ComponentProps<typeof SelectPrimitive.Value>;
  export type State = SelectPrimitive.Value.State;
}

export const SelectPositioner = ({
  container,
  sideOffset = 8,
  className,
  ...props
}: SelectPositioner.Props): JSX.Element => {
  return (
    <SelectPrimitive.Portal container={container}>
      {/* <SelectPrimitive.Backdrop /> */}
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        className={(state) => {
          return cn("outline-0", resolveClassName(className, state));
        }}
        {...props}
      />
    </SelectPrimitive.Portal>
  );
};
export namespace SelectPositioner {
  export type Props = ComponentProps<typeof SelectPrimitive.Positioner> &
    ComponentProps<typeof SelectPrimitive.Portal>;
  export type State = SelectPrimitive.Positioner.State;
}

export const SelectPopup = ({
  children,
  className,
  classList,
  ...props
}: SelectPopup.Props): JSX.Element => {
  return (
    <>
      <SelectPrimitive.ScrollUpArrow
        className={(state) => {
          return cn(
            "top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]",
            resolveClassName(classList?.arrow?.arrow, state),
            resolveClassName(classList?.arrow?.up, state),
          );
        }}
      />
      <SelectPrimitive.Popup
        className={(state) => {
          return cn(
            "group dark:-outline-offset-1 origin-[var(--transform-origin)] overflow-y-auto rounded-md bg-[canvas] py-1 text-gray-900 shadow-gray-200 shadow-lg outline-1 outline-gray-200 transition-[transform,scale,opacity] [max-height:var(--available-height)] data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none data-ending-style:scale-90 data-starting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:transition-none dark:shadow-none dark:outline-gray-300",
            resolveClassName(className, state),
            resolveClassName(classList?.root, state),
          );
        }}
        {...props}
      >
        {children}
      </SelectPrimitive.Popup>
      <SelectPrimitive.ScrollDownArrow
        className={(state) => {
          return cn(
            "bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]",
            resolveClassName(classList?.arrow?.arrow, state),
            resolveClassName(classList?.arrow?.down, state),
          );
        }}
      />
    </>
  );
};
export namespace SelectPopup {
  export type ClassListKey = "root" | { arrow: "arrow" | "up" | "down" };
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof SelectPrimitive.Popup>;
  export type State = SelectPrimitive.Popup.State;
}

export const SelectArrow: typeof SelectPrimitive.Arrow = SelectPrimitive.Arrow;
export namespace SelectArrow {
  export type Props = ComponentProps<typeof SelectPrimitive.Arrow>;
  export type State = SelectPrimitive.Arrow.State;
}

export const SelectItem = ({
  children,
  className,
  classList,
  ...props
}: SelectItem.Props): JSX.Element => {
  return (
    <SelectPrimitive.Item
      className={(state) => {
        return cn(
          "grid min-w-[var(--anchor-width)] cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-0 data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900 group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4",
          resolveClassName(className, state),
          resolveClassName(classList?.item, state),
        );
      }}
      {...props}
    >
      <SelectPrimitive.ItemIndicator
        className={(state) => {
          return cn(
            "col-start-1",
            resolveClassName(classList?.indicator?.root, state),
          );
        }}
      >
        <CheckIcon className={cn("size-3", classList?.indicator?.icon)} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText
        className={(state) => {
          return cn("col-start-2", resolveClassName(classList?.text, state));
        }}
      >
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};
export namespace SelectItem {
  export type ClassListKey = "item" | { indicator: "root" | "icon" } | "text";
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof SelectPrimitive.Item>;
  export type State = SelectPrimitive.Item.State;
}

export const SelectSeparator: typeof SelectPrimitive.Separator =
  SelectPrimitive.Separator;
export namespace SelectSeparator {
  export type Props = ComponentProps<typeof SelectPrimitive.Separator>;
  export type State = SelectPrimitive.Separator.State;
}

export const SelectGroup: typeof SelectPrimitive.Group = SelectPrimitive.Group;
export namespace SelectGroup {
  export type Props = ComponentProps<typeof SelectPrimitive.Group>;
  export type State = SelectPrimitive.Group.State;
}

export const SelectGroupLabel: typeof SelectPrimitive.GroupLabel =
  SelectPrimitive.GroupLabel;
export namespace SelectGroupLabel {
  export type Props = ComponentProps<typeof SelectPrimitive.GroupLabel>;
  export type State = SelectPrimitive.GroupLabel.State;
}
