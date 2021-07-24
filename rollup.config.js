// @ts-check
import typescript from 'rollup-plugin-ts';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';
import fs from 'fs'

const minifier = terser({
  compress: true,
  // mangle these property names 'foo' and 'bar'
  // mangle: {
  //   properties: {
  //     regex: /^(foo|bar)$/,
  //   },
  // },
});

const outputs = [
  // esm
  {
    file: 'dist/lib.esm.js',
    format: 'esm',
  },
  // cjs.dev
  {
    file: 'dist/lib.cjs.dev.js',
    format: 'cjs',
  },
  // cjs.prod
  {
    file: 'dist/lib.cjs.prod.js',
    format: 'cjs',
    plugins: [minifier],
  },
  // umd
  {
    file: 'dist/lib.umd.js',
    name: pkg.name,
    format: 'umd',
  },
];

export default (args) => {
  createCjsFile()
  return {
    input: './src/index.ts',
    // only build esm in development
    output: args.dev ? outputs[0] : outputs,
    plugins: [
      typescript(),
    ],
  };
};

const createCjsFile = () => {
  const code = `\
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./lib.cjs.dev.js');
} else {
  module.exports = require('./lib.cjs.prod.js');
};`

  fs.mkdirSync('./dist', { recursive: true })

  fs.writeFile('./dist/lib.cjs.js', code, (err) => {
    if (err) console.error(err)
  })
}