const fs = require('fs-extra');

fs.ensureDirSync('./dist');

const combineEverything = async () => {
  const cards = await fs.readJsonSync('./dist/cards.json');
  const faq = await fs.readJsonSync('./dist/faq.json');
  const errata = await fs.readJsonSync('./dist/errata.json');
  const changelog = await fs.readJsonSync('./dist/changelog.json');
  const meta = await fs.readJsonSync('./dist/meta.json');

  await fs.writeJsonSync('./dist/everything.json', {
    cards,
    faq,
    errata,
    changelog,
    meta,
  });

  console.log(`Combined JSON for SSG usage!`);
};

combineEverything();
