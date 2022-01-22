const { User } = require('../models');


const userController = {

    getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'thought',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },


      getUserById({ params }, res) {
        Pizza.findOne({ _id: params.id })
          .populate({
            path: 'thought',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },



      createUser({ body }, res) {
        Pizza.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

      updateUser({ params, body }, res) {
        this.getUserById.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

      addFriend({ params, body }, res) {
        Comment.findOneAndUpdate(
          { _id: params.userId },
          { $push: { replies: body } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
     },

     removeFriend({ params }, res) {
        Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $pull: { replies: { replyId: params.replyId } } },
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      }
};


module.exports = userController;