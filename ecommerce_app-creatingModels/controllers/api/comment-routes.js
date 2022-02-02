const router = require('express').Router();
const { Comment, Category,Post, User } = require('../../models');

// The `/api/comments` endpoint

// get all comments
router.get('/', (req, res) => {
  // find all comments
  // be sure to include its associated Category and Tag data
  Comment.findAll(/*{
    include: [
      {
        model: Comment
      }
    ]
  }*/)
  .then(commentsData => res.json(commentsData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get one comments
router.get('/:id', (req, res) => {
  // find a single comment by its `id`, we can use with user id  as well, to user id to be added later

  Comment.findByPk(req.params.id).then(commentsData => {
    if (!commentsData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(commentsData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create new comment
//input like
// {
//    "comment_text" :"some random comment test",
//    "user_id" : "2",
//    "post_id": "4",    
//}
router.post('/', (req, res) => {
  Comment.create(req.body)
    .then((newComment) => 
      res.json(newComment))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update comments
router.put('/:id', (req, res) => {
  //Calls the update method on the Book model
  Comment.update(
    {
      // All the fields you can update and the data attached to the request body.// for now assuming only 2 fields in Comments table title and data
      comment_text: req.body.comment_text,
      user_id : req.body.user_id,
      post_id: req.body.post_id
    },
    {
      // Gets a comments based on comment id
      where: {
        id: req.params.id
      },
    }
  )
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one comment by its `id` value
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => {
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(commentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
