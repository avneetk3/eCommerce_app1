const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Users, Posts, Comments, Categories } = require('../../models');

// The `/api/posts` endpoint

// get all users
router.get('/', (req, res) => {
  console.log('get all posts');
  Posts.findAll({
    attributes: [
      'id',
      'title',
      'description'
    ],
    include: [
      {
        model: Comments,
        attributes: ['id', 'title', 'description', 'creator_id'],
        include: {
          model: Users,
          attributes: ['id']
        }
      },
      {
        model: Users,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get posts by id
router.get('/:id', (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tilte',
      'description'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'title', 'description', 'creator_id'],
        include: {
          model: Users,
          attributes: ['id']
        }
      },
      {
        model: Users,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Create new post 
  // expects {title: 'Taskmaster goes public!', description: 'https://taskmaster.com/press', category_id: 1}
router.post( (req, res) => {
  Posts.create({
    title: req.body.title,
    description: req.body.description,
    creator_id: req.session.user_id,
    category_id : req.body.category_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Update posts
router.put('/:id',(req, res) => {
  Posts.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Delete posts based on post id
router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Posts.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
