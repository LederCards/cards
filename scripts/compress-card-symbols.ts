const fs = require('fs');
const imagemin = require('imagemin');
const webp = require('imagemin-webp');

const compressSymbols = async () => {
  await imagemin([`./dist/symbols/*.png`], {
    destination: `./dist/symbols/`,
    plugins: [
      webp({
        lossless: true,
      }),
    ],
  });

  console.log('Compressed symbols!');
};

compressSymbols();
