import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface LeadAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LeadCreationAttributes extends Optional<LeadAttributes, 'id'> {}

export default class LeadModel extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    LeadModel.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          unique: true,
        },
        phone: {
          type: new DataTypes.STRING(20),
          allowNull: true,
        },
      },
      {
        tableName: 'leads',
        sequelize,
        timestamps: true,
      }
    );
  }
}
