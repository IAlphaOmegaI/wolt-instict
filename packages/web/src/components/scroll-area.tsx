import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const ScrollArea = ({
  children,
  className,
  classList,
  ...props
}: ScrollArea.Props): JSX.Element => {
  return (
    <ScrollAreaPrimitive.Root
      className={(state) => {
        return cn(
          resolveClassName(className, state),
          resolveClassName(classList?.root, state),
        );
      }}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={(state) => {
          return cn(
            "-outline-offset-1 size-full overscroll-contain",
            resolveClassName(classList?.viewport, state),
          );
        }}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar classList={classList?.scrollBar} />
      {/* TODO: add classList for corner */}
      <ScrollAreaPrimitive.Corner className="size-8 bg-primary" />
    </ScrollAreaPrimitive.Root>
  );
};
export namespace ScrollArea {
  export type ClassListKey =
    | "root"
    | "viewport"
    | { scrollBar: ScrollBar.ClassListKey };
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof ScrollAreaPrimitive.Root>;
  export type State = ScrollAreaPrimitive.Root.State;
}

export const ScrollBar = ({
  className,
  classList,
  ...props
}: ScrollBar.Props): JSX.Element => {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={(state) => {
        return cn(
          "m-2 flex w-1 justify-center rounded bg-gray-200 opacity-0 transition-opacity delay-300 data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-75 data-scrolling:duration-75",
          resolveClassName(className, state),
          resolveClassName(classList?.root, state),
        );
      }}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={(state) => {
          return cn(
            "w-full rounded bg-gray-500",
            resolveClassName(classList?.thumb, state),
          );
        }}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
};
export namespace ScrollBar {
  export type ClassListKey = "root" | "thumb";
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>;
  export type State = ScrollAreaPrimitive.Scrollbar.State;
}
