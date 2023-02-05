const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Show all products
router.get("/", async (req, res) => {
  try {
    // Get all the products and the categories and tags they belong to
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products" });
  }
});

// Show one product by its id
router.get("/:id", async (req, res) => {
  try {
    // Get a single product and its categories and tags
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving product" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    // req.body should have this data:
    // {
    //   product_name: "Basketball",
    //   price: 200.00,
    //   stock: 3,
    //   tagIds: [1, 2, 3, 4]
    // }
    const newProduct = await Product.create(req.body);

    // If there are tags, create pairings in ProductTag
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // If no tags, just respond with the product
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Error creating product" });
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
  
    // run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  
    res.json({ message: "Product updated successfully." });
  } catch (err) {
    res.status(400).json(err);
  }
  });

// delete product
router.delete('/:id', async (req, res) => {
  // Try to delete a product with the given id
  try {
  // delete the product from the database
  const deletedProduct = await Product.destroy({
  where: { id: req.params.id }
  });
  // if there's no product found with the given id, respond with a message
if (!deletedProduct) {
  res.status(404).json({ message: "No product found with the given id." });
  return;
}
} catch (err) {
  // if there's an error, respond with an error message
  res.status(500).json(err);
  }
  });
  
  // export the router

module.exports = router;