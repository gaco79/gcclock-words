import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: ['src/gcclock-words.ts'],
  output: {
    dir: './dist',
    format: 'es',
  },
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
};
