const fs = require('fs-extra');
const md5 = require('md5-file');

fs.writeJsonSync('dist/version.json', {
  cards: md5.sync('dist/cards.json'),
  meta: md5.sync('dist/meta.json'),
});
