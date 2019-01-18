import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'index',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      builtins()
    ]
  },

  {
    input: 'src/index.js',
    external: [
      'base-x',
      'bech32',
      'bops',
      'hash.js/lib/hash/sha/256'
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
