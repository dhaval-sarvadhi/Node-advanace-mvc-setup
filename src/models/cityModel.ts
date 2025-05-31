import { DataTypes, Model, Sequelize } from 'sequelize';
// import State from './state.model';

interface CityAttributes {
  id: string;
  name: string;
  state_id: string;
}

class City extends Model<CityAttributes> implements CityAttributes {
  public id!: string;
  public name!: string;
  public state_id!: string;

  static associate(models: any) {
    City.belongsTo(models.State, { foreignKey: 'state_id', as: 'state' });
  }
}

const CityModel = (sequelize: Sequelize) => {
  City.init({
    id: {
      type: DataTypes.STRING,
      // autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    state_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'states',
        key: 'id',
      }
    }
  }, {
    sequelize,
    tableName: 'cities',
    timestamps: false,
    paranoid: false,
  });

  return City;
};

export default CityModel;