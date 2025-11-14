import fs from "node:fs";
import path from "node:path";
import type { TsdownOptions } from "../config.js";

export const getUtilsOptions = (utilsPath = "./src"): TsdownOptions[] => {
  //TODO: add output path param (example: helpers/index => utils/helpers/index)

  const getHelpersOptions = () => {
    const doesHelpersIndexExist = fs.existsSync(
      `${utilsPath}/helpers/index.ts`,
    );

    if (!doesHelpersIndexExist) return null;

    return {
      entry: {
        "helpers/index": `${utilsPath}/helpers/index.ts`,
      },
    } satisfies TsdownOptions;
  };

  const helpersOptions = getHelpersOptions();

  const getHooksOptions = () => {
    const doesHooksIndexExist = fs.existsSync(`${utilsPath}/hooks/index.ts`);

    if (!doesHooksIndexExist) return null;

    const hooksFiles = fs
      .readdirSync(`${utilsPath}/hooks`)
      .filter((fileName) => fileName !== "index.ts");

    const hooksEntries = hooksFiles.reduce<Record<string, string>>(
      (accumulator, hookFile) => {
        const fileName = path
          .basename(hookFile, ".ts")
          .replace(/\.(ts|tsx)$/, "");
        accumulator[`hooks/${fileName}/index`] =
          `${utilsPath}/hooks/${hookFile}`;
        return accumulator;
      },
      {},
    );

    return {
      entry: {
        "hooks/index": `${utilsPath}/hooks/index.ts`,
        ...hooksEntries, //remove hookEntries to generate hooks as files not as folders
      },
      preserveDirectives: true,
    } satisfies TsdownOptions;
  };

  const hooksOptions = getHooksOptions();

  const getTypesOptions = (): TsdownOptions | null => {
    const doesTypesIndexExist = fs.existsSync(`${utilsPath}/types/index.ts`);

    if (!doesTypesIndexExist) return null;

    return {
      entry: {
        "types/index": `${utilsPath}/types/index.ts`,
      },
      minify: false, //not relevant for types
      sourcemap: false, // not relevant if not minified
      dts: {
        emitDtsOnly: true,
      },
    } satisfies TsdownOptions;
  };

  const typesOptions = getTypesOptions();

  return [helpersOptions, hooksOptions, typesOptions].filter(
    (options) => options !== null, // filter(Boolean) type predication not working
  );
};
