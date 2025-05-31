/* eslint-disable no-await-in-loop */
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Logger } from '../core/Logger';

const modelsDir = __dirname;
const db: { [key: string]: any } = {};

export const initializeModels = async () => {
    const files = fs.readdirSync(modelsDir);

    for (const file of files) {
        const isValidFile = file.endsWith('.ts') && file !== path.basename(__filename);
        if (isValidFile) {
            try {
                const model = (
                    await import(path.join(modelsDir, file))).default(sequelize, DataTypes);
                db[model.name] = model;
                Logger.silly(`Loaded model: ${model.name}`);
            } catch (error) {
                Logger.error(`Failed to load model from file: ${file}`, error);
            }
        }
    }

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db['sequelize'] = sequelize;
    db['Sequelize'] = Sequelize;

    return sequelize.sync({
        force: false,
        alter: false,
    }).then(() => {
        Logger.info('Database synchronized successfully');
    }).catch(error => {
        Logger.error('Error synchronizing database:', error);
        throw error;
    });
};

export default db;
