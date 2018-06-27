const path = require('path');
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config');
const webpackMerge = require('webpack-merge');

const customConfig = {
  resolve: {
    alias: {
      '@app': path.resolve('src/app'),
      '@assets': path.resolve('src/assets'),
      '@pages': path.resolve('src/app/pages'),
      "@shared": path.resolve('src/app/shared'),
      "@enums": path.resolve('src/app/shared/enums'),
      "@models": path.resolve('src/app/shared/models'),
      "@services": path.resolve('src/app/shared/services')
    }
  }
};

module.exports = {
  dev: webpackMerge(dev, customConfig),
  prod: webpackMerge(prod, customConfig)
};
