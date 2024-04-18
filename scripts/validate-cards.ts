const fs = require('fs-extra');
const { omit } = require('lodash');

const allCards = fs.readJsonSync('./dist/cards.json');

allCards.forEach((card, index) => {
  if (!card.id) {
    console.error(`Card ${index} does not have an id.`);
    process.exit(1);
  }

  if (!card.name) {
    console.error(`Card ${card.id} does not have a name.`);
    process.exit(1);
  }

  if (!card.image) {
    console.error(`Card ${card.id} does not have an image.`);
    process.exit(1);
  }

  if (!card.product) {
    console.error(`Card ${card.id} does not have a product.`);
    process.exit(1);
  }

  if (!card.locale) {
    console.error(`Card ${card.id} does not have a locale.`);
    process.exit(1);
  }

  if (!card.tags || card.tags.length === 0) {
    console.error(`Card ${card.id} does not have any tags.`);
    process.exit(1);
  }

  const otherProps = omit(card, [
    'id',
    'name',
    'text',
    'image',
    'imageClass',
    'product',
    'locale',
    'tags',
    'meta',
  ]);

  if (otherProps.length > 0) {
    console.error(`Card ${card.id} has other props: ${otherProps.join(',')}`);
    process.exit(1);
  }
});

console.log('All cards are valid!');
