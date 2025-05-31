import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface ApiLogAttributes {
    api_log_id: number;
    api_url?: string | null;
    method?: string | null;
    request?: string | null;
    response?: string | null;
    created_datetime?: Date | null;
    updated_datetime?: Date | null;
    header?: string | null;
}

// For creation, api_log_id is optional because it auto-increments
interface ApiLogCreationAttributes extends Optional<ApiLogAttributes, 'api_log_id'> { }

class ApiLog extends Model<ApiLogAttributes, ApiLogCreationAttributes> implements ApiLogAttributes {
    public api_log_id!: number;
    public api_url?: string | null;
    public method?: string | null;
    public request?: string | null;
    public response?: string | null;
    public created_datetime?: Date | null;
    public updated_datetime?: Date | null;
    public header?: string | null;

    public static associate(models: any) {

    }
}

const ApiLogModel = (sequelize: Sequelize) => {
    ApiLog.init(
        {
            api_log_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            api_url: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            method: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            request: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            response: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            header: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'api_log',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    return ApiLog;
};

export default ApiLogModel;
