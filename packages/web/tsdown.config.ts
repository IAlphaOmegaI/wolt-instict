import {
  createTsdownConfig,
  type TsdownConfig,
  type TsdownOptions,
} from "@zenncore/tsdown-config";
import {
  getComponentsOptions,
  getUtilsOptions,
} from "@zenncore/tsdown-config/options";

//TODO: for other utils folders other than helpers|hooks|types
// const utilsFolders = fs
//   .readdirSync("./src/utils", { withFileTypes: true })
//   .filter((dirent) => dirent.isDirectory())
//   .map((dirent) => dirent.name)
//   .filter((folderName) => {
//     const indexPath = `./src/utils/${folderName}/index.ts`;
//     return fs.existsSync(indexPath);
//   });

// const utilsEntries = utilsFolders.reduce<Record<string, string>>(
//   (accumulator, folderName) => {
//     accumulator[`${folderName}/index`] = `./src/utils/${folderName}/index.ts`;
//     return accumulator;
//   },
//   {},
// );

const webComponentsOptions = {
  ...getComponentsOptions(),
  platform: "browser",
} satisfies TsdownOptions;

const options = [
  webComponentsOptions,
  ...getUtilsOptions("./src/utils"),
] satisfies TsdownConfig;

export default createTsdownConfig(
  options.filter(({ entry }) => entry && Object.keys(entry).length > 0),
);
