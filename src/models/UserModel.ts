import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    UserModel.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          unique: true,
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: 'users',
        sequelize,
        timestamps: true,
      }
    );
  }
}
