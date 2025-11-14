import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { Pressable } from "react-native";

export const Button = ({ className, ...props }: Button.Props): JSX.Element => {
  return (
    <Pressable
      className={cn(
        "flex-row justify-center rounded-2xl bg-primary py-[12px] transition-transform active:scale-95",
        className,
      )}
      {...props}
    />
  );
};
export namespace Button {
  export type Props = ComponentProps<typeof Pressable>;
}
