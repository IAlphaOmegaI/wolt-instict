import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion";
import { ChevronDownIcon } from "@zenncore/icons";
import { type ClassList, cn } from "@zenncore/utils";
import type { ComponentProps, JSX } from "react";
import {
  createClassName,
  resolveClassName,
} from "../utils/helpers/resolve-class-name";

export const Accordion = ({
  className,
  ...props
}: Accordion.Props): JSX.Element => {
  return (
    <AccordionPrimitive.Root
      className={(state) => {
        // const ui: (state: AccordionPrimitive.Root.State) => string = () => "";
        const hello = createClassName(
          [
            "",
            true && "",
            // ui,
            // () => {},
            // {
            //   hello: true,
            // },
          ],
          // { hello: "" },
        );

        console.log(hello);

        return cn(
          "flex flex-col justify-center text-foreground-dimmed",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace Accordion {
  export type Props = ComponentProps<typeof AccordionPrimitive.Root>;
  export type State = AccordionPrimitive.Root.State;
}

export const AccordionItem = ({
  className,
  ...props
}: AccordionItem.Props): JSX.Element => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={(state) => {
        return cn(
          "border-accent-dimmed border-b",
          resolveClassName(className, state),
        );
      }}
    />
  );
};
export namespace AccordionItem {
  export type Props = ComponentProps<typeof AccordionPrimitive.Item>;
  export type State = AccordionPrimitive.Item.State;
}

export const AccordionTrigger = ({
  className,
  children,
  classList,
  ...props
}: AccordionTrigger.Props): JSX.Element => {
  return (
    <AccordionPrimitive.Header
      className={(state) => cn("m-0", resolveClassName(classList?.root, state))}
    >
      <AccordionPrimitive.Trigger
        className={(state) => {
          return cn(
            "group box-border flex w-full cursor-pointer items-baseline justify-between gap-4 border-0 px-0 py-2 text-left font-medium text-base text-foreground leading-6 outline-0 focus-visible:outline-1",
            resolveClassName(className, state),
            resolveClassName(classList?.trigger?.root, state),
          );
        }}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={cn(
            "mr-2 size-3 transition-all ease-out group-data-panel-open:rotate-90",
            classList?.trigger?.icon,
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};
export namespace AccordionTrigger {
  export type ClassListKey = "root" | { trigger: "root" | "icon" };
  export type Props = {
    classList?: ClassList<ClassListKey>;
  } & ComponentProps<typeof AccordionPrimitive.Trigger>;
}

export const AccordionPanel = ({
  className,
  ...props
}: AccordionPanel.Props): JSX.Element => {
  return (
    <AccordionPrimitive.Panel
      className={(state) => {
        return cn(
          "h-[var(--accordion-panel-height)] overflow-hidden text-base text-foreground-dimmed transition-[height] ease-out data-ending-style:h-0 data-starting-style:h-0",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace AccordionPanel {
  export type Props = ComponentProps<typeof AccordionPrimitive.Panel>;
  export type State = AccordionPrimitive.Panel.State;
}
