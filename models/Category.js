// We are getting our tools (Model and DataTypes) from the Sequelize library
const { Model, DataTypes } = require('sequelize');

// We are getting our connection to the database from a separate file
const sequelize = require('../config/connection.js');

// We are creating a Category table using the Sequelize Model class
class Category extends Model {}

// We are setting up the fields and rules for the Category table
Category.init(
  {
    id: {
      // This field will be a number, can't be empty and will be the primary key (unique identifier)
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      // This field will increase by one each time we add a new category
      autoIncrement: true
    },
    // This field will be a text, can't be empty and will be the name of the category
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // We are giving Sequelize our database connection
    sequelize,
    // We don't want any timestamps (date created, date modified) in this table
    timestamps: false,
    // We want to keep the same name for the table in the database
    freezeTableName: true,
    // We want to use snake case (category_name) instead of camel case (categoryName) in this table
    underscored: true,
    // This table's name will be 'category'
    modelName: 'category',
  }
);

// We are exporting the Category table so other parts of the program can use it
module.exports = Category;


