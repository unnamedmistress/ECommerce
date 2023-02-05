// This is a file that creates a "Tag" model for a database.
// It uses the "sequelize" library to set up the model.

const { Model, DataTypes } = require('sequelize');
// We need the "sequelize" library and the "DataTypes" object from it.

const sequelize = require('../config/connection.js');
// We also need to import the connection information for the database.

class Tag extends Model {}
// We're making a class called "Tag" that inherits from the "Model" class.

Tag.init(
{
id: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true
},
tag_name: {
type: DataTypes.STRING
}
},
{
sequelize,
timestamps: false,
freezeTableName: true,
underscored: true,
modelName: 'tag',
}
);
// This sets up the "Tag" model with two columns: "id" and "tag_name".
// The "id" column is a number and can't be empty. It's also the primary key (a special type of ID) and will automatically increase every time a new tag is added.
// The "tag_name" column is a string and can be empty.
// The rest of the options (timestamps, freezeTableName, etc.) are just additional settings for the model.

module.exports = Tag;
// This makes the "Tag" model available to other parts of the program.
