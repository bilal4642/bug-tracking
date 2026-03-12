 const { DataTypes, Model } = require('sequelize');

class Project extends Model {
    static associate(models: any){
        Project.belongsTo(models.User,{
            foreignKey: "manager_id",
            as: "manager"
        })

        Project.hasMany(models.Project_Members,{
            foreignKey: "project_id",
            as: "members"
        })
    }
}
module.exports = (sequelize: any)=>{
    Project.init(
        {
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING
            },
            manager_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "user",
                    key: "id"
                }
            }
        },
        {
            timestamps: true,
            sequelize,
            tableName: 'projects'
        }
    )
    return Project;
}