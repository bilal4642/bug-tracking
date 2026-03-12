const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static associate(models: any) {
    User.belongsTo(models.User_Types, {
      foreignKey: "user_type_id",
      as:"role"
    });

    User.hasMany(models.Project, { 
      foreignKey: "manager_id",
    });

    User.hasMany(models.Project_Members,{
        foreignKey: "project_id"
    })
  }
}

module.exports = (sequelize: any) => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      user_type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user_types",
            key: "id"
        }
      },
      access_token: {
        type: DataTypes.STRING,
      },
      refresh_token:{
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      sequelize,
      tableName: "users",
    },
  );

  return User;
};
