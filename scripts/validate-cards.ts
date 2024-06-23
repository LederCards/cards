const path = require('node:path');
const fs = require('fs-extra');
const { omit } = require('lodash');

const allCards = fs.readJsonSync('./dist/cards.json');

const allIdsByLocale = {};

allCards.forEach((card, index) => {
  if (!card.id) {
    console.error(`Card ${index} does not have an id.`);
    process.exit(1);
  }

  if (!card.locale) {
    console.error(`Card ${card.id} does not have a locale.`);
    process.exit(1);
  }

  allIdsByLocale[card.locale] = allIdsByLocale[card.locale] || {};

  if (allIdsByLocale[card.locale][card.id]) {
    console.error(`Card ${card.id} has a duplicate id.`);
    process.exit(1);
  }

  allIdsByLocale[card.locale][card.id] = true;

  if (!card.name) {
    console.error(`Card ${card.id} does not have a name.`);
    process.exit(1);
  }

  if (!card.image) {
    console.error(`Card ${card.id} does not have an image.`);
    process.exit(1);
  }

  const fixedImage = decodeURIComponent(path.basename(card.image, '.webp'));
  const imagePath = `${process.cwd()}/content/card-images/${card.game}/${
    card.locale
  }/${fixedImage}.png`;
  if (!fs.existsSync(imagePath)) {
    console.error(
      `Card ${card.id} references an invalid image "${imagePath}".`,
    );
    process.exit(1);
  }

  if (!card.game) {
    console.error(`Card ${card.id} does not have a game.`);
    process.exit(1);
  }

  if (!card.tags || card.tags.length === 0) {
    console.error(`Card ${card.id} does not have any tags.`);
    process.exit(1);
  }

  if (card.flipSide) {
    const flipSide = allCards.find((c) => c.id === card.flipSide);
    if (!flipSide) {
      console.error(`Card ${card.id} has invalid flipSide ${card.flipSide}`);
      process.exit(1);
    }
  }

  const otherProps = omit(card, [
    'id',
    'name',
    'text',
    'image',
    'imageClass',
    'game',
    'product',
    'locale',
    'tags',
    'meta',
    'flipSide',
  ]);

  if (Object.keys(otherProps).length > 0) {
    console.error(
      `Card ${card.id} has other props: ${Object.keys(otherProps).join(',')}`,
    );
    process.exit(1);
  }
});

console.log('All cards are valid!');
