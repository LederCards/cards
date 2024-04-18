const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');

const readAllMeta = async () => {
  const allMetaFiles = await readdir('./content/meta-data');
  const allMetas = allMetaFiles.map((f) => yaml.load(fs.readFileSync(f)));

  fs.writeJsonSync(`dist/meta.json`, allMetas);
  console.log(`Got ${allMetas.length} meta data files!`);
};

readAllMeta();
