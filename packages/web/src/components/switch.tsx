import { Switch as SwitchPrimitive } from "@base-ui-components/react/switch";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Switch = ({
  className,
  classList,
  ...props
}: Switch.Props): JSX.Element => {
  return (
    <SwitchPrimitive.Root
      defaultChecked
      className={(state) => {
        return cn(
          "-outline-offset-1 relative flex h-6 w-14 rounded-full bg-background-dimmed p-px shadow-[inset_0_1.5px_2px] shadow-accent-foreground outline-1 outline-accent-foreground transition-[box-shadow,background] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full before:outline-primary before:outline-offset-2 focus-visible:before:inset-0 focus-visible:before:outline-2 active:bg-background-dimmed data-checked:bg-primary data-checked:active:bg-primary-rich",
          resolveClassName(className, state),
          classList?.root,
        );
      }}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={(state) => {
          return cn(
            "h-full w-8 rounded-full bg-background-rich shadow-[0_0_1px_1px,0_1px_1px,1px_2px_4px_-1px] shadow-accent-foreground transition-transform duration-150 data-checked:translate-x-6 dark:shadow-black/25",
            resolveClassName(classList?.thumb, state),
          );
        }}
      />
    </SwitchPrimitive.Root>
  );
};

export namespace Switch {
  export type ClassListKey = "root" | "thumb";
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof SwitchPrimitive.Root>;
  export type State = SwitchPrimitive.Root.State;
}
