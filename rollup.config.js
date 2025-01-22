import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [
  resolve({}),
  commonjs(),
  typescript(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
];

export default [
  {
    input: 'src/gcclock-words.ts',
    output: {
      dir: 'dist',
      format: 'es',
      inlineDynamicImports: true,
    },
    plugins: [...plugins],
  },
];
