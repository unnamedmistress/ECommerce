// We need the 'sequelize' library to help us make our database
const { Model, DataTypes } = require('sequelize');
// We also need to connect to our database
const sequelize = require('../config/connection');

// We want to create a new table for our products
class Product extends Model {}

// This is what our product table should look like:
// It should have an ID, product name, price, how many we have in stock, and what category it belongs to
Product.init(
{
id: {
// The ID should be a number and we can't leave it blank
type: DataTypes.INTEGER,
allowNull: false,
// This ID is special, it's like a key to find our product in the table
primaryKey: true,
// The ID will be created automatically and be unique for each product
autoIncrement: true
},
product_name: {
// The product name should be a word or words, and we can't leave it blank
type: DataTypes.STRING,
allowNull: false
},
price: {
// The price should be a number with 2 decimal places, and we can't leave it blank
type: DataTypes.DECIMAL(10, 2),
allowNull: false,
// The price must be a decimal number
validate: {
isDecimal: true
}
},
stock: {
// The stock should be a number and we can't leave it blank
type: DataTypes.INTEGER,
allowNull: false,
// If we don't specify the stock, it will be 10 by default
defaultValue: 10,
// The stock must be a number
validate: {
isNumeric: true
}
},
category_id: {
// The category ID should be a number and is used to connect the product to a category
type: DataTypes.INTEGER,
references: {
// The category ID links to the 'id' field in the 'category' table
model: 'category',
key: 'id'
}
}
},
{
sequelize,
// We don't want the time stamps for this table
timestamps: false,
// We want the table name to be exactly 'product'
freezeTableName: true,
// We want the field names to have an underscore, not a camelCase
underscored: true,
// This is the name of our table
modelName: 'product',
}
);

// We can now use this product table in other files
module.exports = Product;
