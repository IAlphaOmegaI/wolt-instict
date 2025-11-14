"use client";

import { Field as FieldPrimitive } from "@base-ui-components/react/field";
import { Form as FormPrimitive } from "@base-ui-components/react/form";
import { cn } from "@zenncore/utils";
import { type ComponentProps, createContext, type JSX, use } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from "react-hook-form";
import { resolveClassName } from "../utils/helpers/resolve-class-name";

type FieldError = FieldErrors[keyof FieldErrors];

const getErrorMessage = (value: FieldError): string | undefined => {
  if (typeof value?.message === "string") return value.message;

  if (typeof value === "object") {
    for (const key in value) {
      const message = getErrorMessage(
        value[key as keyof typeof value] as FieldError,
      );
      if (message) return message;
    }
  }
};

const getFormErrors = (errors: FieldErrors) => {
  const hasErrors = Object.keys(errors).length > 0;

  const formErrors = hasErrors
    ? Object.entries<FieldError>(errors).reduce(
        (accumulator, [key, fieldError]) => {
          const message = getErrorMessage(fieldError);

          if (message) accumulator[key] = message;

          return accumulator;
        },
        {} as NonNullable<Form.Props<FieldValues>["errors"]>,
      )
    : undefined;

  return formErrors;
};

type FieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name?: TName;
};

const FieldContext = createContext<FieldContextValue>({});

export const Form = <T extends FieldValues>({
  form,
  className,
  ...props
}: Form.Props<T>): JSX.Element => {
  return (
    <FormProvider {...form}>
      <FormPrimitive
        errors={getFormErrors(form.formState.errors)}
        className={(state) => {
          return cn("w-full space-y-4", resolveClassName(className, state));
        }}
        {...props}
      />
    </FormProvider>
  );
};
export namespace Form {
  export type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
  } & ComponentProps<typeof FormPrimitive>;
  export type State = FormPrimitive.State;
}

export const FieldController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>): JSX.Element => {
  return (
    <FieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FieldContext>
  );
};

export const Field = ({ className, ...props }: Field.Props): JSX.Element => {
  const { name } = use(FieldContext);

  return (
    <FieldPrimitive.Root
      name={name}
      className={(state) => {
        return cn("flex flex-col gap-2", resolveClassName(className, state));
      }}
      {...props}
    />
  );
};
export namespace Field {
  export type Props = ComponentProps<typeof FieldPrimitive.Root>;
  export type State = FieldPrimitive.Root.State;
}

export const FieldLabel = ({
  className,
  ...props
}: FieldLabel.Props): JSX.Element => {
  return (
    <FieldPrimitive.Label
      className={(state) => {
        return cn(
          "font-medium text-gray-900 text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace FieldLabel {
  export type Props = ComponentProps<typeof FieldPrimitive.Label>;
  export type State = FieldPrimitive.Label.State;
}

export const FieldControl = ({
  className,
  ...props
}: FieldControl.Props): JSX.Element => {
  return (
    <FieldPrimitive.Control
      className={(state) => {
        return cn(
          "focus:-outline-offset-1 h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-blue-800",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace FieldControl {
  export type Props = ComponentProps<typeof FieldPrimitive.Control>;
  export type State = FieldPrimitive.Control.State;
  export type ChangeEventDetails = FieldPrimitive.Control.ChangeEventDetails;
  export type ChangeEventReason = FieldPrimitive.Control.ChangeEventReason;
}

export const FieldDescription = ({
  className,
  ...props
}: FieldDescription.Props): JSX.Element => {
  return (
    <FieldPrimitive.Description
      className={(state) => {
        return cn(
          "text-foreground-dimmed text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace FieldDescription {
  export type Props = ComponentProps<typeof FieldPrimitive.Description>;
  export type State = FieldPrimitive.Description.State;
}

export const FieldError = ({
  className,
  children,
  ...props
}: FieldError.Props): JSX.Element => {
  return (
    <FieldPrimitive.Error
      className={(state) => {
        return cn(
          "font-medium text-error text-sm",
          resolveClassName(className, state),
        );
      }}
      {...props}
    />
  );
};
export namespace FieldError {
  export type Props = ComponentProps<typeof FieldPrimitive.Error>;
  export type State = FieldPrimitive.Error.State;
}

export const FieldValidity: typeof FieldPrimitive.Validity =
  FieldPrimitive.Validity;
export namespace FieldValidity {
  export type Props = ComponentProps<typeof FieldPrimitive.Validity>;
  export type State = FieldPrimitive.Validity.State;
}
