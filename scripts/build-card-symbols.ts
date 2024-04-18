const path = require('path');
const fs = require('fs-extra');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');
fs.ensureDirSync('./dist/symbols');

const copyAllCardSymbols = async () => {
  const allCardSymbols = await readdir('./content/card-symbols');

  allCardSymbols.forEach((img) => {
    fs.copyFileSync(img, `./dist/symbols/${path.basename(img)}`);
  });

  console.log(`Got ${allCardSymbols.length} card symbols!`);
};

copyAllCardSymbols();
