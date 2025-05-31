import dotenv from 'dotenv';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { hashPassword, verifyPassword } from '../utils/authUtils';
dotenv.config({ path: './.env' });

interface UserAttributes {
    id: number;
    user_name: string;
    email: string;
    password: string;
    role_id: bigint;
    status: number;
    is_active: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public user_name!: string;
    public password!: string;
    public email!: string;
    public role_id!: bigint;
    public status!: number;
    public is_active!: boolean;

    // ? Instance method to verify password on login
    public async verifyPassword(input: string): Promise<boolean> {
        return verifyPassword(input, this.password);
    }

    static associate(models: any) {

        User.hasOne(models.UserProfile, {
            foreignKey: 'user_id',
            as: 'profile',
            onDelete: 'CASCADE',
        });

        User.hasMany(models.UserSession, {
            foreignKey: 'user_id',
            as: 'sessions',
        });

        User.belongsTo(models.Role, {
            foreignKey: 'role_id',
            as: 'role',
        });

    }
}

const UserModel = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            // defaultValue: DataTypes.UUIDV4,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Email address must be valid',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await hashPassword(user.password);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.changed('password')) {
                    user.password = await hashPassword(user.password);
                }
            },
        }
    });

    return User;
};

export default UserModel;