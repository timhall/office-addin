const json = require('rollup-plugin-json');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
const pkg = require('./package.json');

const banner = `/*!
 * ${pkg.name} - ${pkg.description}
 * v${pkg.version} - ${pkg.homepage} - @license: ${pkg.license}
 */`

module.exports = {
  entry: 'src/index.js',
  dest: 'dist/office-addin.js',
  format: 'iife',
  banner,
  plugins: [
    json(),
    buble(),
    uglify()
  ]
};
