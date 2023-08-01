import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'AddressValidation',
      file: pkg.unpkg,
      format: 'umd',
      exports: 'named',
      intro: 'const global = window;',
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
    }
  ],
  plugins: [
    external(),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/tests/**',
      clean: true
    }),
    commonjs({
      include: ['node_modules/**']
    }),
    nodePolyfills(),
    terser()
  ]
}
