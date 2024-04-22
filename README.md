# Leder Cards

This repository obtains and reformats cards for the Leder Spotlight application.

## Requirements

- Node 18.15.0+

## Get Started

1. Clone this repository
1. `npm install`

## Useful Commands

- `npm run build` - build everything
- `npm run build:card-data` - build the card data only
- `npm run build:card-symbols` - move the card symbol icons
- `npm run build:card-images` - move the card images
- `npm run build:i18n` - build the i18n files and ensure that they're formatted correctly
- `npm run validate:card-data` - validate the card data is formatted correctly

## Adding New Content

### Products

1. Create a new file matching the product name in `content/meta-data`
1. Create a new folder in `content/card-data` (the name should match the `productName` in the `meta-data` file)
1. Create a new folder in `content/card-images` (the name should match the `productName` in the `meta-data` file)
1. Create a new folder in `content/card-symbols` (the name should match the `productName` in the `meta-data` file)
1. Add a new 512x512 PNG in `content/card-symbols/products` (the name should match the `productName` in the `meta-data` file)

Follow the guide for adding a new locale

### Locale

1. Create a new folder in `content/card-data/{product}` for the locale (probably `en-US`)
   1. Add a `{subproduct}.yml` file here (or, as many separate files as desired - they all get concatenated together) and fill it with card data.
1. Create a new folder in `content/card-images/{product}` for the locale (probably `en-US`)
   1. Fill this folder with the images for the cards for the game.

## Publishing New Content

This is done automatically when a PR is merged to `master`, and isn't intended to be done manually.
