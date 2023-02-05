const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// This code handles all the requests related to tags

// Get all the tags and their related products
router.get('/', async (req, res) => {
try {
// get all the tags and the products related to them
const tagAndProductData = await Tag.findAll({
include: [
{model: Product}
],
});
// send the data back to the user
res.status(200).json(tagAndProductData);
} catch (err) {
// if something goes wrong, send an error message
res.status(500).json(err);
}
});

// Get a single tag by its id and its related products
router.get('/:id', async (req, res) => {
try {
// get a single tag by its id and the products related to it
const tagAndProductData = await Tag.findByPk(req.params.id, {
include: [
{model: Product}
],
});
// if there is no tag with that id, send an error message
if (!tagAndProductData) {
  res.status(404).json({ message: 'No tag found with that id!' });
  return;
}

// send the data back to the user
res.status(200).json(tagAndProductData);
} catch (err) {
// if something goes wrong, send an error message
res.status(500).json(err);
}
});

// Add a new tag
router.post('/', async (req, res) => {
try {
// create a new tag
const newTagData = await Tag.create(req.body);
// send the new tag data back to the user
res.status(200).json(newTagData);
} catch (err) {
// if something goes wrong, send an error message
res.status(400).json(err);
}
});

// Update a tag's name by its id
router.put('/:id', async (req, res) => {
try {
// update the name of the tag with the given id
const updatedTagData = await Tag.update(req.body, {
where: {
id: req.params.id,
}
});
// if there is no tag with that id, send an error message
if (!updatedTagData[0]) {
res.status(404).json({ message: 'No tag found with that id!' });
return;
}
// send the updated tag data back to the user
res.status(200).json(updatedTagData);
} catch (err) {
// if something goes wrong, send an error message
res.status(500).json(err);
}
});

// Delete a tag by its id

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id, }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json('Tag has been deleted..!!');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
