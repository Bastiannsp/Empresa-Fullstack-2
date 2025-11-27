// karma.conf.js
var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',
    
    // Frameworks: Jasmine debe ir primero
    frameworks: ['jasmine', 'webpack'],

    // Archivos: Buscamos en tu carpeta src/test
    files: [
      { pattern: 'src/test/**/*.test.jsx', watched: false }
    ],

    preprocessors: {
      'src/test/**/*.test.jsx': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    // Dejamos que Karma cargue los plugins automáticamente
    // (Al quitar "type: module", esto suele funcionar mejor)
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher'
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};