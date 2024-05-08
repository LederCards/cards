const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');
fs.ensureDirSync('./dist/faq');

const readAllFAQ = async () => {
  const allFAQFiles = await readdir('./content/faq');

  const allFAQData = {};

  allFAQFiles.forEach((f) => {
    const [, , game] = f.split(path.sep);
    const locale = path.basename(f, '.yml');
    const faqs = yaml.load(fs.readFileSync(f));

    allFAQData[game] ??= {};
    allFAQData[game][locale] = faqs;
  });

  fs.writeJsonSync(`dist/faq.json`, allFAQData),
    console.log(`Got ${allFAQFiles.length} FAQ files!`);
};

readAllFAQ();
