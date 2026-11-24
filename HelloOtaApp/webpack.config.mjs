import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as Repack from '@callstack/repack';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default Repack.defineWebpackConfig({
  context: projectRoot,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions({ enablePackageExports: true }),
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          options: {},
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [new Repack.RepackPlugin()],
});
