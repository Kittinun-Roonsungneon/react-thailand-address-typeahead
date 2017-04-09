const babelJest = require('babel-jest');
const jestPreset = require('babel-preset-jest');

module.exports = babelJest.createTransformer({
  plugins: [
    'transform-flow-strip-types',
  ],
  presets: [jestPreset],
});
