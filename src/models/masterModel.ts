
import { DataTypes, Model, Sequelize } from 'sequelize';
// import { getImageFromS3 } from '../helpers/s3-handler';

interface MasterAttributes {
  id: number;
  name: string;
  code: string;
  sequence?: number;
  keyword: string;
  description: string;
  image: string;
  is_active: boolean;
  is_display: boolean;
  is_default: boolean;
  created_by: number;
  updated_by: number;
  deleted_by: number;
}

class Master extends Model<MasterAttributes> implements MasterAttributes {
  public id!: number;
  public name!: string;
  public code!: string;
  public sequence?: number;
  public keyword!: string;
  public description!: string;
  public image!: string;
  public is_active!: boolean;
  public is_display!: boolean;
  public is_default!: boolean;
  public created_by!: number;
  public updated_by!: number;
  public deleted_by!: number;

  static associate(models: any) {
    Master.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'createdByUser',
    });

    Master.belongsTo(models.User, {
      foreignKey: 'updated_by',
      as: 'updatedByUser',
    });

    Master.belongsTo(models.User, {
      foreignKey: 'deleted_by',
      as: 'deletedByUser',
    });

    Master.hasMany(models.SubMaster, {
      foreignKey: 'master_id', // The foreign key in the SubMaster table
      sourceKey: 'id', // The primary key in the Master table
      as: 'subMasters', // This alias will be used in includes
    });
  };

};

const MasterModel = (sequelize: Sequelize) => {
  Master.init({
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
      comment: 'Previously mandatory, the sequence field is now optional to allow flexibility for cases where it may not be needed in master table'
    },
    keyword: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_display: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'masters',
    timestamps: true,
    paranoid: true
  });

  // Master.addHook('afterFind', async (results: any) => {
  //   if (Array.isArray(results)) {
  //     await Promise.all(results.map(async (instance: Master) => {
  //       if (instance.image) {
  //         instance.image = await getImageFromS3(instance.image);
  //       }
  //     }));
  //   } else if (results?.image) {
  //     results.image = await getImageFromS3(results.image);
  //   }
  // });

  return Master;
};

export default MasterModel;