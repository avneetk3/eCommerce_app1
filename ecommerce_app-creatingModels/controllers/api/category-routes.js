const router = require('express').Router();
const { Categories, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Categories.findAll().then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json({err: err.message});
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id)
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
  }
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

 // create a new category
router.post('/', (req, res) => {
  Categories.create(req.body)
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Categories.update( 
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    } 
  )
  .then(categoryData => {
    if (!categoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Categories.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
    }
    res.json(categoryData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
