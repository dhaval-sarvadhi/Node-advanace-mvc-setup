import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserProfileAttributes {
    id: number;
    user_id: number;
    first_name?: string;
    last_name?: string;
    phone_no?: string;
    phone_country_id?: string;
    gender?: 'male' | 'female' | 'other';
    date_of_birth?: Date;
    profile_picture_url?: string;
}

interface UserProfileCreationAttributes extends Optional<UserProfileAttributes, 'id'> { }

class UserProfile extends Model<UserProfileAttributes, UserProfileCreationAttributes> implements UserProfileAttributes {
    public id!: number;
    public user_id!: number;
    public first_name?: string;
    public last_name?: string;
    public phone_no?: string;
    public phone_country_id?: string;
    public gender?: 'male' | 'female' | 'other';
    public date_of_birth?: Date;
    public profile_picture_url?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate(models: any) {
        UserProfile.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
            onDelete: 'CASCADE',
        });
    }
}

const userProfileModel = (sequelize: Sequelize) => {
    UserProfile.init(
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            last_name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            phone_no: {
                type: DataTypes.STRING(15),
                allowNull: true,
                unique: true,
            },
            phone_country_id: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            gender: {
                type: DataTypes.ENUM('male', 'female', 'other'),
                allowNull: true,
            },
            date_of_birth: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            profile_picture_url: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'user_profiles',
            modelName: 'UserProfile',
            timestamps: true,
            paranoid: true,
        }
    );

    return UserProfile;
};

export default userProfileModel;
