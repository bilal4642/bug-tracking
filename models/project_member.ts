const {DataTypes, Model} = require('sequelize');

class Project_Members extends Model{
    static associate(models: any){
        Project_Members.belongsTo(models.Project,{
            foreignKey: "project_id",
            // key: "id"
        });

        Project_Members.belongsTo(models.User,{
            foreignKey: "user_id"
        })

        Project_Members.belongsTo(models.User_Types,{
            foreignKey: "role_id"
        })
        
    }
}

module.exports = (sequelize: any) =>{
    Project_Members.init(
        {
            project_id: {
                type: DataTypes.INTEGER,
                references :{
                    model: "project",
                    key: "id"
                }
            },
            user_id: {
                type: DataTypes.INTEGER,
                references:{
                    model: "users",
                    key: "id"
                }
            },
            role_id:{
                type: DataTypes.INTEGER,
                references: {
                    model: "user_type",    
                    key: "id"
                }
            }
        },
        {
            timestamps: true,
            sequelize,
            tableName: 'project_member'
        }
   )   
   return Project_Members;
}