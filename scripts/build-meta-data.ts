const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');

const readAllMeta = async () => {
  const allMetaFiles = await readdir('./content/meta-data');
  const allMetas = allMetaFiles.map((f) => yaml.load(fs.readFileSync(f)));

  const allLocaleFiles = await readdir('./content/i18n');
  const allLocales = allLocaleFiles.map((f) => path.basename(f, '.yml'));

  const json = { products: allMetas, locales: allLocales };

  fs.writeJsonSync(`dist/meta.json`, json);
  console.log(`Got ${allMetas.length} meta data files!`);
};

readAllMeta();
