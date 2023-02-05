// This line brings in the Product information from another file
const Product = require('./Product');

// This line brings in the Category information from another file
const Category = require('./Category');

// This line brings in the Tag information from another file
const Tag = require('./Tag');

// This line brings in information about the connection between Products and Tags
const ProductTag = require('./ProductTag');

// This line says that each Product belongs to one Category
Product.belongsTo(Category, {
// The category_id in the Product information will be linked to the Category information
foreignKey: 'category_id',
// If a Category is deleted, all Products in that Category will also be deleted
onDelete: 'CASCADE',
});

// This line says that each Category has many Products
Category.hasMany(Product, {
// The category_id in the Category information will be linked to the Product information
foreignKey: 'category_id',
// If a Category is deleted, all Products in that Category will also be deleted
onDelete: 'CASCADE',
});

// This line says that each Product can be linked to many Tags through the ProductTag information
Product.belongsToMany(Tag, {
// The connection between Products and Tags is stored in the ProductTag information
through: ProductTag,
// The product_id in the ProductTag information will be linked to the Product information
foreignKey: 'product_id'
});

// This line says that each Tag can be linked to many Products through the ProductTag information
Tag.belongsToMany(Product, {
// The connection between Tags and Products is stored in the ProductTag information
through: ProductTag,
// The tag_id in the ProductTag information will be linked to the Tag information
foreignKey: 'tag_id'
})

// This line makes the Product, Category, Tag, and ProductTag information available to other parts of the program
module.exports = {
Product,
Category,
Tag,
ProductTag
};