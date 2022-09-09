// @ts-ignore
const path = require('path');

// appreantly relative path doesnt work needs more investigation :)

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    preferRelative: true,
    alias: { '@app': path.resolve(__dirname, 'src') },
  };
  return config;
};
