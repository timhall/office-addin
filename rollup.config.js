const json = require('rollup-plugin-json');
const buble = require('rollup-plugin-buble');
const pkg = require('./package.json');

const banner = `/*!
 * ${pkg.name} - ${pkg.description}
 * v${pkg.version} - ${pkg.homepage} - @license: ${pkg.license}
 */`

module.exports = {
  entry: './index.js',
  dest: 'dist/office-addin.js',
  format: 'umd',
  moduleName: 'OfficeAddin',
  banner,
  plugins: [
    json(),
    buble()
  ]
};
