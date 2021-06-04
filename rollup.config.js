// @ts-check
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

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
    plugins: [
      terser(),
    ],
  },

];

export default (args) => {
  return {
    input: './src/index.ts',
    // only build esm during library development
    output: args.dev ? outputs[0] : outputs,
    plugins: [
      typescript(),
    ],
  };
};
