import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json' assert { type: 'json' };

export default defineConfig({
  input: 'src/index.tsx',
  output: {
    sourcemap: true,
    dir: 'dist',
    format: 'esm',
    name: packageJson.name
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      modules: true,
      use: [
        ['sass', {
          includePaths: [
            './src/**/*', // Adjust this to your SCSS paths
            './src/*/', // Adjust this to your SCSS paths
            './src/', // Adjust this to your SCSS paths
          ],
        }],
      ],
    }),
  ]
});
