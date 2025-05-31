import { Sequelize } from 'sequelize';
import { environment } from './index';
import { Logger } from '../core/Logger';

const { db_name, db_user, db_password, db_host, db_driver } = environment;

console.log({
  environment
});

export const sequelize = new Sequelize({
  database: db_name,
  username: db_user,
  password: db_password,
  host: db_host,
  dialect: db_driver as 'postgres',
  logging: false,
});

const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    Logger.info('👍 Connection has been established successfully.');
  } catch (err) {
    Logger.error('✗ Unable to connect to the database:', err);
  }
};

testConnection();