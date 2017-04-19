import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const config = {
  entry: 'src/index.ts',
  format: 'iife',
  dest: 'dist/game.js',
  moduleName: 'tudi',

  plugins: [
    typescript({ typescript: require('typescript')} ),
    resolve({ module: true, jsnext: true, main: true }),
    commonjs({
      namedExports: {
        '../tudi/node_modules/pixi.js/lib/index.js': ['autoDetectRenderer', 'Container'],
        '../tudi/node_modules/pixi.js/lib/polyfill/Math.sign.js': ['default'],
      }
    }),
    builtins(),
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(serve('.'), livereload())
}

export default config;
