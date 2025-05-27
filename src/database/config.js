const path = require('path');
const fs = require('fs');

// Read config.json to load DB config
const configPath = path.resolve(__dirname, '../config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
