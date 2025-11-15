type Booleanish =
  | boolean
  | string
  | number
  | null
  | undefined
  | Array<boolean | string | number | null | undefined>;

export const build = <Input extends Booleanish>(
  condition: Input,
  prompt?: string | ((input: string, raw: Input) => string)
) => {
  const passes = Boolean(condition);
  if (!passes) return "";

  const transform = (input: NonNullable<Input>) => {
    if (Array.isArray(input)) return input.join(", ");
    return input.toString();
  };

  const output = transform(condition as NonNullable<Input>);

  if (!prompt) return output;

  if (typeof prompt === "string") return prompt;
  return prompt(output, condition);
};
