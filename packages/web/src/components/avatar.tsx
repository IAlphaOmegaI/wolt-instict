import { Avatar as AvatarPrimitive } from "@base-ui-components/react/avatar";
import { cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

export const Avatar = ({ className, ...props }: Avatar.Props): JSX.Element => {
  return (
    <AvatarPrimitive.Root
      className={(state) => {
        return cn(
          "inline-flex size-12 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle font-medium text-base text-black",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace Avatar {
  export type Props = ComponentProps<typeof AvatarPrimitive.Root>;
  export type State = AvatarPrimitive.Root.State;
}

export const AvatarImage = ({
  className,
  ...props
}: AvatarImage.Props): JSX.Element => {
  return (
    <AvatarPrimitive.Image
      width="48"
      height="48"
      className={(state) => {
        return cn("size-full object-cover", resolveClassName(className, state));
      }}
      {...props}
    />
  );
};
export namespace AvatarImage {
  export type Props = ComponentProps<typeof AvatarPrimitive.Image>;
}

export const AvatarFallback = ({
  className,
  ...props
}: AvatarFallback.Props): JSX.Element => {
  return (
    <AvatarPrimitive.Fallback
      className={(state) => {
        return cn(
          "flex size-full items-center justify-center text-base",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AvatarFallback {
  export type Props = ComponentProps<typeof AvatarPrimitive.Fallback>;
}
