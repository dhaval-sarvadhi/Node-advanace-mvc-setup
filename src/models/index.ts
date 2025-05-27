import { Sequelize } from 'sequelize';
import UserModel from './UserModel';
import LeadModel from './LeadModel';

export function initModels(sequelize: Sequelize) {
  UserModel.initialize(sequelize);
  LeadModel.initialize(sequelize);

  // Setup associations if any, e.g.
  // UserModel.hasMany(LeadModel, { foreignKey: 'userId' });
  // LeadModel.belongsTo(UserModel, { foreignKey: 'userId' });
}
