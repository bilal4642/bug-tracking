const { DataTypes, Model } = require("sequelize");

class User_Types extends Model {
  static associate(models: any) {
    User_Types.hasMany(models.User, {
      foreignKey: "user_type_id",
    });

    User_Types.hasMany(models. Project_Members,{
        foreignKey: "role_id",
    })
  }
}

module.exports = (sequelize: any) => {
  User_Types.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      sequelize,
      tableName: "user_types",
    },
  );

  return User_Types;
};
