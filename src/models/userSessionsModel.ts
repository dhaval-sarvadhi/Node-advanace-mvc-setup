import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface UserSessionAttributes {
    id: number;
    user_id: number;
    device_info?: string;
    ip_address?: string;
    token?: string;
    is_active: boolean;
    logged_in_at: Date;
    logged_out_at?: Date | null;
}

interface UserSessionCreationAttributes extends Optional<UserSessionAttributes, 'id'> { }

class UserSession extends Model<UserSessionAttributes, UserSessionCreationAttributes>
    implements UserSessionAttributes {
    public id!: number;
    public user_id!: number;
    public device_info?: string;
    public ip_address?: string;
    public token?: string;
    public is_active!: boolean;
    public logged_in_at!: Date;
    public logged_out_at?: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(models: any) {
        UserSession.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE',
        });
    }
}

const UserSessionModel = (sequelize: Sequelize) => {
    UserSession.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            device_info: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ip_address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            logged_in_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            logged_out_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'user_sessions',
            modelName: 'UserSession',
            timestamps: true,
            paranoid: true,
        }
    );

    return UserSession;
};

export default UserSessionModel;
