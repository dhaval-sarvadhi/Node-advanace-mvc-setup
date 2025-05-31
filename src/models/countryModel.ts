import { DataTypes, Model, Sequelize } from 'sequelize';

interface CountryAttributes {
  id: string;
  name: string;
  iso3: string;
  iso2: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  latitude: number;
  longitude: number;
  timezones: string;
  createdAt: Date;
  updatedAt: Date;
  flag: string
}

class Country extends Model<CountryAttributes> implements CountryAttributes {
  public id!: string;
  public name!: string;
  public iso3!: string;
  public iso2!: string;
  public phonecode!: string;
  public capital!: string;
  public currency!: string;
  public currency_name!: string;
  public currency_symbol!: string;
  public latitude!: number;
  public longitude!: number;
  public timezones!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public flag!: string;

  static associate(models: any) {
    Country.hasMany(models.State, {
      foreignKey: 'country_id',
      as: 'states',
    });
    Country.hasMany(models.User, { foreignKey: 'mobile_country_id' });
  };

};

const CountryModel = (sequelize: Sequelize) => {
  Country.init({
    id: {
      type: DataTypes.STRING,
      // autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    iso3: {
      type: DataTypes.CHAR(3),
      allowNull: true,
    },
    iso2: {
      type: DataTypes.CHAR(2),
      unique: true,
    },
    phonecode: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    currency: {
      type: DataTypes.CHAR(3),
      allowNull: true,
    },
    currency_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    currency_symbol: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    timezones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    flag: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'countries',
    timestamps: true,
    paranoid: false,
  });

  return Country;
};

export default CountryModel;