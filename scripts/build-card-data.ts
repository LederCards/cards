const path = require('path');
const fs = require('fs-extra');
const { compress } = require('compress-json');
const { capitalize } = require('lodash');
const yaml = require('js-yaml');
const readdir = require('recursive-readdir');

fs.ensureDirSync('./dist');

const formatCard = (card) => {
  if (
    !fs.existsSync(
      `./content/card-images/${card.game}/${card.locale}/${card.image}.png`,
    )
  ) {
    card.locale = 'en-US';
  }

  const baseImageName = card.image;
  card.image = `https://ledercardcdn.seiyria.com/cards/${card.game}/${
    card.locale
  }/${encodeURIComponent(baseImageName)}.webp`;

  return card;
};

const readAllCards = async () => {
  const allCardFiles = await readdir('./content/card-data');
  const allCards = allCardFiles
    .map((f) => {
      const cards = yaml.load(fs.readFileSync(f));

      const [, , game, locale] = f.split(path.sep);
      const product = path.basename(f, '.yml');

      cards.forEach((c) => {
        c.game = game;
        c.product = product;
        c.locale = locale;
      });

      return cards;
    })
    .flat()
    .map((c) => formatCard(c));

  const formattedCards = allCards;

  fs.writeJsonSync('dist/cards.json', formattedCards);
  fs.writeJsonSync('dist/cards.min.json', compress(formattedCards));

  console.log(`Got ${formattedCards.length} cards!`);
};

readAllCards();
