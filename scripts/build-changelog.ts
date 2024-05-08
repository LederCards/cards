const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');

const readAllChangelogs = async () => {
  const allChangelogFiles = await readdir('./content/changelog');

  const allChangelogData = {};

  allChangelogFiles.forEach((f) => {
    const [, , game] = f.split(path.sep);
    const locale = path.basename(f, '.yml');
    const changelogs = yaml.load(fs.readFileSync(f));

    allChangelogData[game] ??= {};
    allChangelogData[game][locale] = changelogs;
  });

  fs.writeJsonSync(`dist/changelog.json`, allChangelogData);
  console.log(`Got ${allChangelogFiles.length} changelog files!`);
};

readAllChangelogs();
