// @ts-check
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';
import fs from 'fs';

const minifier = terser({
  compress: true,
  mangle: {
    // mangle properties that starts with _
    properties: {
      regex: /^_/,
    },
  },
});

const outputs = [
  // esm
  {
    file: pkg.module,
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

];

export default (args) => {
  createLibCjs();
  return {
    input: './src/index.ts',
    // no need to build all in development - only build esm
    output: args.dev ? outputs[0] : outputs,
    plugins: [
      typescript(),
    ],
  };
};

const createLibCjs = () => {
  const code = `\
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./lib.cjs.dev.js');
} else {
  module.exports = require('./lib.cjs.prod.js');
};`;

  fs.mkdirSync('./dist', {recursive: true});

  fs.writeFile('./dist/lib.cjs.js', code, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
