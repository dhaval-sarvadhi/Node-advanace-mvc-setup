
import { DataTypes, Model, Sequelize } from 'sequelize';

interface StateAttributes {
  id: string;
  name: string;
  country_id: number;
}

class State extends Model<StateAttributes> implements StateAttributes {
  public id!: string;
  public name!: string;
  public country_id!: number;
  static associate(models: any) {
    State.belongsTo(models.Country, {
      foreignKey: 'country_id',
      as: 'states',
    });

    State.hasMany(models.City, {
      foreignKey: 'state_id',
      as: 'cities'
    });
  };
};

const StateModel = (sequelize: Sequelize) => {
  State.init({
    id: {
      type: DataTypes.STRING,
      // autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    country_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id',
      }
    }
  }, {
    sequelize,
    tableName: 'states',
    timestamps: false,
    paranoid: false
  });

  return State;
};

export default StateModel;