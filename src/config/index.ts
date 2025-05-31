import * as dotenv from 'dotenv';
dotenv.config();

import { config } from './config';

type ConfigEnvironments = 'development' | 'local' | 'production';
const env = (process.env.NODE_ENV as ConfigEnvironments) || 'local';

if (!config[env]) {
    throw new Error(`Config for environment "${env}" not found.`);
}

export const environment = config[env];
