const {DataTypes, Model} = require("sequelize");


class Bug extends Model{}

module.exports = (sequelize:any)=>{
    Bug.init(
        {
            title:{
                type: DataTypes.STRING
            },
            description:{
                type: DataTypes.TEXT
            },
            deadline:{
                type:DataTypes.DATE
            },
            screenshoot:{
                type: DataTypes.STRING
            },
            bug_type:{
                type: DataTypes.ENUM,
                values: ["feature", "bug"]
            },
            status:{
                type:DataTypes.ENUM,
                values: ["new", "started", "completed", "resolved"],
            },
            project_id:{
                type: DataTypes.INTEGER,
                reference:{
                    model: "projects"
                }
            },
            developer_id:{
                type: DataTypes.INTEGER,
                reference:{
                    model: "users"
                }
            },
            qa_id:{
                type: DataTypes.INTEGER,
                reference:{
                    model: "users"
                }
            }

        },
        {
            timeStamps: true,
            sequelize,
            tableName: 'bug'
        }
    )
    return Bug;
}