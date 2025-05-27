import path from 'path';
import fs from 'fs';

// Load .env variables if needed
import dotenv from 'dotenv';
dotenv.config();

type DbConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
};

type Config = {
  development: DbConfig;
  test: DbConfig;
  production: DbConfig;
};

const env = process.env.NODE_ENV || 'development';

// Option 1: Load from config.json
const configPath = path.resolve(__dirname, 'config.json');
const rawConfig = fs.readFileSync(configPath, 'utf-8');
const jsonConfig: any = JSON.parse(rawConfig);

// Option 2: Override config.json values with env variables if present
const envConfig: DbConfig = {
  username: process.env.DB_USER || jsonConfig[env].username,
  password: process.env.DB_PASSWORD || jsonConfig[env].password,
  database: process.env.DB_NAME || jsonConfig[env].database,
  host: process.env.DB_HOST || jsonConfig[env].host,
  dialect: 'postgres', // hardcoded or process.env.DB_DIALECT || jsonConfig[env].dialect,
};

export default envConfig;
