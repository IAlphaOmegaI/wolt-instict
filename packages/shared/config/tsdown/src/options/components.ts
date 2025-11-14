import fs from "node:fs";
import path from "node:path";
import type { TsdownOptions } from "../config.ts";

export const getComponentsOptions = (utilsPath = "./src"): TsdownOptions => {
  //TODO: add output path param

  //TODO: it should also work with component folders that have an index.tsx file
  const componentFiles = fs
    .readdirSync(`${utilsPath}/components`)
    .filter((file) => file.endsWith(".tsx") && file !== "index.tsx")
    .map((file) => `${utilsPath}/components/${file}`);

  const componentEntries = componentFiles.reduce<Record<string, string>>(
    (accumulator, file) => {
      const componentName = path.basename(file, ".tsx");
      accumulator[`components/${componentName}/index`] = file;
      return accumulator;
    },
    {},
  );

  return {
    entry: componentEntries,
    preserveDirectives: true,
  } satisfies TsdownOptions;
};
