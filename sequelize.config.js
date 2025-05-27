const config = require('./src/config/config.json');

const env = process.env.NODE_ENV || 'local';

module.exports = {
  development: config[env],
  test: config[env],
  production: config[env],
};
