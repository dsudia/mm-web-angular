const path = require('path');
const fs = require('fs')
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);

module.exports = {
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
    modules: [
      './node_modules'
    ],
    symlinks: true
  },
  resolveLoader: {
    modules: [
      './node_modules'
    ]
  },
  entry: {
    main: [
      './server/index.ts'
    ]
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options:
          {
            configFileName: 'tsconfig-server.json'
          }
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new NamedModulesPlugin({})
  ],
  target: 'node',
  node: {
    __dirname: true,
    process: true
  },
  externals: [
    'sqlite3',
    'mariasql',
    'mssql',
    'mysql',
    'mysql2',
    'oracle',
    'oracledb',
    'pg-query-stream',
    'strong-oracle',
    'pg-native'
  ]
  // output: {
  //   filename: 'dist/bundle.js'
  // },
  // resolve: {
  //   extensions: ['.ts', '.js']
  // },
  // resolveLoader: {
  //   modules: [
  //     './node_modules',
  //   ]
  // },
  // entry: './server/index.ts',
  // module: {
  //   rules: [
  //     {
  //       test: /\.ts$/,
  //       loader: 'ts-loader',
  //       options:
  //         {
  //           configFileName: 'tsconfig-server.json'
  //         }
  //     }
  //   ]
  // },
  // target: 'node',
}
