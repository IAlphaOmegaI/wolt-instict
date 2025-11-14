import { Autocomplete as AutocompletePrimitive } from "@base-ui-components/react/autocomplete";
import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Autocomplete: typeof AutocompletePrimitive.Root =
  AutocompletePrimitive.Root;
export namespace Autocomplete {
  export type Props<Value> = ComponentProps<
    typeof AutocompletePrimitive.Root<Value>
  >;
  export type State = AutocompletePrimitive.Root.State;
  export type Actions = AutocompletePrimitive.Root.Actions;
  export type ChangeEventDetails =
    AutocompletePrimitive.Root.ChangeEventDetails;
  export type ChangeEventReason = AutocompletePrimitive.Root.ChangeEventReason;
}

export const AutocompleteInput = ({
  className,
  ...props
}: AutocompleteInput.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Input
      className={(state) => {
        return cn(
          "focus:-outline-offset-1 h-10 w-[16rem] rounded-md border border-gray-200 bg-[canvas] pl-3.5 font-normal text-base text-gray-900 focus:outline focus:outline-blue-800 md:w-[20rem]",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AutocompleteInput {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Input>;
  export type State = AutocompletePrimitive.Input.State;
}

export const AutocompleteTrigger = ({
  className,
  ...props
}: AutocompleteTrigger.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Trigger
      className={(state) => {
        return cn(
          "focus-visible:-outline-offset-1 rounded-md border border-gray-200 bg-[canvas] text-[1.25rem] text-gray-900 outline-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-blue-800 data-popup-open:bg-gray-100",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AutocompleteTrigger {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Trigger>;
  export type State = AutocompletePrimitive.Trigger.State;
}

export const AutocompleteIcon: typeof AutocompletePrimitive.Icon =
  AutocompletePrimitive.Icon;
export namespace AutocompleteIcon {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Icon>;
  export type State = AutocompletePrimitive.Icon.State;
}

export const AutocompleteClear: typeof AutocompletePrimitive.Clear =
  AutocompletePrimitive.Clear;
export namespace AutocompleteClear {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Clear>;
  export type State = AutocompletePrimitive.Clear.State;
}

export const AutocompleteValue: typeof AutocompletePrimitive.Value =
  AutocompletePrimitive.Value;
export namespace AutocompleteValue {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Value>;
}

export const AutocompletePositioner = ({
  container,
  keepMounted,
  sideOffset = 4,
  className,
  ...props
}: AutocompletePositioner.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Portal
      container={container}
      keepMounted={keepMounted}
    >
      {/* <AutocompletePrimitive.Backdrop /> */}
      <AutocompletePrimitive.Positioner
        sideOffset={sideOffset}
        className={(state) => {
          return cn("outline-none", resolveClassName(className, state));
        }}
        {...props}
      />
    </AutocompletePrimitive.Portal>
  );
};
export namespace AutocompletePositioner {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Positioner> &
    ComponentProps<typeof AutocompletePrimitive.Portal>;
  export type State = AutocompletePrimitive.Positioner.State;
}

export const AutocompletePopup = ({
  className,
  ...props
}: AutocompletePopup.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Popup
      className={(state) => {
        return cn(
          "dark:-outline-offset-1 max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)] scroll-pt-2 scroll-pb-2 overflow-y-auto overscroll-contain rounded-md bg-[canvas] py-2 text-gray-900 shadow-gray-200 shadow-lg outline-1 outline-gray-200 dark:shadow-none dark:outline-gray-300",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AutocompletePopup {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Popup>;
  export type State = AutocompletePrimitive.Popup.State;
}

export const AutocompleteArrow: typeof AutocompletePrimitive.Arrow =
  AutocompletePrimitive.Arrow;
export namespace AutocompleteArrow {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Arrow>;
  export type State = AutocompletePrimitive.Arrow.State;
}

export const AutocompleteStatus = ({
  className,
  ...props
}: AutocompleteStatus.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Status
      className={(state) => {
        return cn(
          "flex items-center gap-2 py-1 pr-8 pl-4 text-gray-600 text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AutocompleteStatus {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Status>;
  export type State = AutocompletePrimitive.Status.State;
}

export const AutocompleteEmpty = ({
  className,
  ...props
}: AutocompleteEmpty.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Empty
      className={(state) => {
        return cn(
          "px-4 py-2 text-[0.925rem] text-gray-600 leading-4 empty:m-0 empty:p-0",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AutocompleteEmpty {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Empty>;
  export type State = AutocompletePrimitive.Empty.State;
}

export const AutocompleteList: typeof AutocompletePrimitive.List =
  AutocompletePrimitive.List;
export namespace AutocompleteList {
  export type Props = ComponentProps<typeof AutocompletePrimitive.List>;
  export type State = AutocompletePrimitive.List.State;
}

export const AutocompleteRow: typeof AutocompletePrimitive.Row =
  AutocompletePrimitive.Row;
export namespace AutocompleteRow {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Row>;
  export type State = AutocompletePrimitive.Row.State;
}

export const AutocompleteItem = ({
  className,
  ...props
}: AutocompleteItem.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Item
      className={(state) => {
        return cn(
          "flex cursor-default select-none py-2 pr-8 pl-4 text-base leading-4 outline-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-2 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded data-highlighted:before:bg-gray-900",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AutocompleteItem {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Item>;
  export type State = AutocompletePrimitive.Item.State;
}

export const AutocompleteSeparator: typeof AutocompletePrimitive.Separator =
  AutocompletePrimitive.Separator;
export namespace AutocompleteSeparator {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Separator>;
  export type State = AutocompletePrimitive.Separator.State;
}

export const AutocompleteGroup = ({
  className,
  ...props
}: AutocompleteGroup.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.Group
      className={(state) => {
        return cn("block pb-2", resolveClassName(className, state));
      }}
      {...props}
    />
  );
};
export namespace AutocompleteGroup {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Group>;
  export type State = AutocompletePrimitive.Group.State;
}

export const AutocompleteGroupLabel = ({
  className,
  ...props
}: AutocompleteGroupLabel.Props): JSX.Element => {
  return (
    <AutocompletePrimitive.GroupLabel
      className={(state) => {
        return cn(
          "sticky top-0 z-[1] mt-0 mr-2 mb-0 ml-0 w-[calc(100%-0.5rem)] bg-[canvas] px-4 py-2 font-semibold text-xs uppercase tracking-wider",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AutocompleteGroupLabel {
  export type Props = ComponentProps<typeof AutocompletePrimitive.GroupLabel>;
  export type State = AutocompletePrimitive.GroupLabel.State;
}

export const AutocompleteCollection: typeof AutocompletePrimitive.Collection =
  AutocompletePrimitive.Collection;
export namespace AutocompleteCollection {
  export type Props = ComponentProps<typeof AutocompletePrimitive.Collection>;
}

// export const { useFilter } = AutocompletePrimitive;
