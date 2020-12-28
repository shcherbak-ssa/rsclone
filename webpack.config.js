const authConfig = require('./webpack/auth-config');
const appConfig = require('./webpack/app-config');

const webpackConfig = (env = {}) => {
  const isDev = env.isDev || false;

  if (env.isAuth) {
    return authConfig(isDev);
  }

  if (env.isApp) {
    return appConfig(isDev);
  }
};

module.exports = webpackConfig;
