import { Image as ImagePrimitive } from "expo-image";
import { cssInterop } from "nativewind";
import type { ComponentPropsWithRef, JSX } from "react";

//TODO: disable global interop
cssInterop(ImagePrimitive, { className: "style" });

export const Image = (props: Image.Props): JSX.Element => {
  return <ImagePrimitive {...props} />;
};
export namespace Image {
  export type Props = ComponentPropsWithRef<typeof ImagePrimitive>;
}
