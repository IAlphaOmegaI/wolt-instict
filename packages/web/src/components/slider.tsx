import { Slider as SliderPrimitive } from "@base-ui-components/react/slider";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Slider = ({
  inputRef,
  className,
  classList,
  onThumbBlur,
  ...props
}: Slider.Props): JSX.Element => {
  const thumbCount = Array.isArray(props.value)
    ? props.value.length
    : Array.isArray(props.defaultValue)
      ? props.defaultValue.length
      : 1;

  return (
    <SliderPrimitive.Root
      className={(state) => {
        return cn(
          resolveClassName(className, state),
          resolveClassName(classList?.root, state),
        );
      }}
      {...props}
    >
      <SliderPrimitive.Control
        className={(state) => {
          return cn(
            "flex touch-none select-none items-center py-3",
            resolveClassName(classList?.control, state),
          );
        }}
      >
        <SliderPrimitive.Track
          className={(state) => {
            return cn(
              "h-2 w-full select-none rounded bg-background-rich shadow-[inset_0_0_0_1px] shadow-background-dimmed",
              resolveClassName(classList?.track, state),
            );
          }}
        >
          <SliderPrimitive.Indicator
            className={(state) => {
              return cn(
                "select-none rounded bg-primary",
                resolveClassName(classList?.indicator, state),
              );
            }}
          />
          {Array.from({ length: thumbCount }).map((_, index) => (
            <SliderPrimitive.Thumb
              // biome-ignore lint/suspicious/noArrayIndexKey: false positive
              key={index}
              index={index}
              inputRef={index === 0 ? inputRef : undefined}
              className={(state) => {
                return cn(
                  "h-[calc(var(--spacing)*6-2px)] w-8 select-none rounded-full bg-background-rich outline-1 outline-accent-foreground focus-visible:outline-2 focus-visible:outline-primary",
                  resolveClassName(classList?.thumb, state),
                );
              }}
              onBlur={onThumbBlur}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
};

export namespace Slider {
  export type ClassListKey =
    | "root"
    | "control"
    | "track"
    | "indicator"
    | "thumb";
  export type Props = {
    classList?: ClassList<ClassListKey>;
    inputRef?: SliderPrimitive.Thumb.Props["inputRef"];
    onThumbBlur?: SliderPrimitive.Thumb.Props["onBlur"];
  } & ComponentProps<typeof SliderPrimitive.Root>;
  export type State = SliderPrimitive.Root.State;
}
