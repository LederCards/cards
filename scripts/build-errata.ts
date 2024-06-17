const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');

const readAllErrata = async () => {
  const allErrataFiles = await readdir('./content/errata');

  const allErrataData = {};

  allErrataFiles.forEach((f) => {
    const [, , game] = f.split(path.sep);
    const locale = path.basename(f, '.yml');
    const faqs = yaml.load(fs.readFileSync(f));

    allErrataData[game] ??= {};
    allErrataData[game][locale] = faqs;
  });

  fs.writeJsonSync(`dist/errata.json`, allErrataData);
  console.log(`Got ${allErrataFiles.length} errata files!`);
};

readAllErrata();
