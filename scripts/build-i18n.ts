const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');
fs.ensureDirSync('./dist/i18n');

const readAlli18n = async () => {
  const alli18nFiles = await readdir('./content/i18n');
  const alli18ns = alli18nFiles.map((f) => ({
    locale: path.basename(f, '.yml'),
    data: yaml.load(fs.readFileSync(f)),
  }));

  alli18ns.forEach((d) =>
    fs.writeJsonSync(`dist/i18n/${d.locale}.json`, d.data),
  );

  console.log(`Got ${alli18ns.length} locales!`);
};

readAlli18n();
