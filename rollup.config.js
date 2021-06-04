// @ts-check
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

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
    file: 'dist/index.cjs.dev.js',
    format: 'cjs',
  },
  // cjs.prod
  {
    file: 'dist/index.cjs.prod.js',
    format: 'cjs',
    plugins: [minifier],
  },

];

export default (args) => {
  return {
    input: './src/index.ts',
    // no need to build all in development - only build esm
    output: args.dev ? outputs[0] : outputs,
    plugins: [
      typescript(),
    ],
  };
};
