import { DataTypes, Model, Sequelize } from 'sequelize';

interface RoleAttributes {
    id: number;
    name: string;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;

    public static associate(models: any) {
        // Define associations here if needed (e.g., Role.hasMany(User))
    }
}

const RoleModel = (sequelize: Sequelize) => {
    Role.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        sequelize,
        tableName: 'roles',
        timestamps: true,
        paranoid: true,
    });

    return Role;
};

export default RoleModel;
