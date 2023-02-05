const { Model, DataTypes } = require('sequelize');

// This connects us to our database
const sequelize = require('../config/connection');

// This is our ProductTag model
class ProductTag extends Model {}

// This sets up the columns for our ProductTag model
ProductTag.init(
  {
    // This is the ID column and it is important because it helps us
    // identify each product tag individually
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // This column links a product tag to a product
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
        unique: false
      }
    },
    // This column links a product tag to a tag
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
        unique: false
      }
    }
  },
  {
    // This connects our model to the database
    sequelize,
    // We don't need timestamps for this model
    timestamps: false,
    // We don't want sequelize to change the name of our table
    freezeTableName: true,
    // We want our column names to have underscores (like tag_name instead of tagName)
    underscored: true,
    // This sets the name of our model in the database
    modelName: 'product_tag',
  }
);

// This makes our model available to other parts of our application
module.exports = ProductTag;

