const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories with its associated Products
    const categoryData = await Category.findAll({
      include: [
        {model: Product}
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }  
});
router.get('/:id', async (req, res) => {
  try {
  // find one category by its id value and its associated Products
  const { Category, Product } = require('../../models');
  // Get a single category by its `id` and its associated products
  const categoryWithProducts = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {model: Product}
    ],
  });
  
  // Send the found data as a response
  res.status(200).json(categoryWithProducts);
  } catch (err) {
  // If there was an error, send a response with a status code of 500
  res.status(500).json(err);
  }
  });
  
  module.exports = router;
    
    // Get a single category and its associated products by its id
    router.get('/:id', async (req, res) => {
      try {
        // Find the category with the given id and the products that belong to it
        const categoryWithProducts = await Category.findByPk(req.params.id, {
          include: [{
            model: Product
          }],
        });
    
        // If no category was found, send a response with a status code of 404
        if (!categoryWithProducts) {
          res.status(404).json({ message: 'No category found with that id!' });
          return;
        }
    
        // Send the found data as a response
        res.status(200).json(categoryWithProducts);
      } catch (err) {
        // If there was an error, send a response with a status code of 500
        res.status(500).json(err);
      }
    });
    
    // Create a new category
    router.post('/', async (req, res) => {
      try {
        // Create a new category with the data from the request body
        const newCategory = await Category.create(req.body);
    
        // Send the created category as a response
        res.status(200).json(newCategory);
      } catch (err) {
        // If there was an error, send a response with a status code of 400
        res.status(400).json(err);
      }
    });
    
    // Update a category by its id
    router.put('/:id', async (req, res) => {
      try {
        // Find the category with the given id and update its data
        const updatedCategory = await Category.update(req.body, {
          where: {
            id: req.params.id,
          }
        });
    
        // If no category was found, send a response with a status code of 404
        if (!updatedCategory[0]) {
          res.status(404).json({ message: 'No category found with that id!' });
          return;
        }
    
        // Send the updated data as a response
        res.status(200).json(updatedCategory);
      } catch (err) {
        // If there was an error, send a response with a status code of 500
        res.status(500).json(err);
      }
    });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id, }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;