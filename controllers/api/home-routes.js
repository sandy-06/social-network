const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Thoughts, React } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'username',
      'email',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM friends WHERE post.id = friend.post_id)'), 'friend_count']
    ],
    include: [
      {
        model: Thought,
        attributes: ['id', 'thoughtText', 'username', 'reactions', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      //res.render('homepage', {
       // posts,
        //loggedIn: req.session.loggedIn
      });
    })
    //.catch(err => {
      //console.log(err);
     // res.status(500).json(err);
   // });
//});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'reaction',
      'username',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM reactions WHERE post.id = vote.reaction_id)'), 'vote_count']
    ],
    include: [
      {
        model: Thought,
        attributes: ['id', 'thoughtText', 'username', 'reaction', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      //res.render('single-post', {
       //post,
       // loggedIn: req.session.loggedIn
      });
    })
    //.catch(err => {
    //  console.log(err);
    //  res.status(500).json(err);
    //});
//});

//router.get('/login', (req, res) => {
  //if (req.session.loggedIn) {
    //res.redirect('/');
   // return;
 // }

 // res.render('login');
//});

module.exports = router;
