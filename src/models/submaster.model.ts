
import { DataTypes, Model, Sequelize } from 'sequelize';
// import { getImageFromS3 } from '../helpers/s3-handler';

interface SubMasterAttributes {
  id: number;
  master_id: number;
  name: string;
  code: string;
  sequence: number;
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

class SubMaster extends Model<SubMasterAttributes> implements SubMasterAttributes {
  public id!: number;
  public master_id!: number;
  public name!: string;
  public code!: string;
  public sequence!: number;
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
    SubMaster.belongsTo(models.Master, {
      as: 'master',
      foreignKey: 'master_id',
    });

    // SubMaster.hasMany(models.StockListColumnSettings, {
    //   as: 'columns',
    //   foreignKey: 'list_type'
    // });
    // SubMaster.hasMany(models.Document, { foreignKey: 'document_type', as: 'documents' });
    SubMaster.hasMany(models.User, { foreignKey: 'business_associate_type', constraints: false });
  };
};

const SubMasterModel = (sequelize: Sequelize) => {
  SubMaster.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      // defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masters',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    sequence: {
      type: DataTypes.INTEGER,
      // unique: true
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
    tableName: 'submasters',
    timestamps: true,
    paranoid: true
  });

  // SubMaster.addHook('afterFind', async (results: any, req: any) => {
  //   try {
  //     // Check if results is an array (multiple instances) or a single instance
  //     const instances = Array.isArray(results) ? results : [results];

  //     await Promise.all(
  //       instances.map(async (instance: SubMaster) => {
  //         // If the image exists and appendS3Path is true, fetch it from S3
  //         if (req?.appendS3Path !== false && instance?.image) {
  //           try {
  //             instance.image = await getImageFromS3(instance.image);
  //           } catch (error) {
  //             console.error(`Error fetching image ${instance.image}:`, error);
  //           }
  //         }
  //       })
  //     );
  //   } catch (error) {
  //     console.error('Error in afterFind hook for SubMaster:', error);
  //   }
  // });

  return SubMaster;
};

export default SubMasterModel;