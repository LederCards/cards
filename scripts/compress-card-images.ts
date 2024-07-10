const fs = require('fs');
const imagemin = require('imagemin');
const webp = require('imagemin-webp');

const compressImages = async () => {
  const allDirs = fs.readdirSync('./dist/cards');

  const allPromises = allDirs
    .map((dir) => {
      const allLocales = fs.readdirSync(`./dist/cards/${dir}`);

      return allLocales.map((loc) =>
        imagemin([`./dist/cards/${dir}/${loc}/*.png`], {
          destination: `./dist/cards/${dir}/${loc}/`,
          plugins: [
            webp({
              quality: 90
            }),
          ],
        }),
      );
    })
    .flat();

  await Promise.all(allPromises);
  console.log('Compressed images!');
};

compressImages();
