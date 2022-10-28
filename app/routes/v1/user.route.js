const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers)
  .delete((req, res) => {
    userController.deleteUsers;
  });
router.route('/me').get(userController.getTestUsers);

router
  .route('/:userId')
  .get((req, res) => {
    userController.getUser;
  })
  .patch((req, res) => {
    userController.updateUser;
  })
  .delete((req, res) => {
    userController.deleteUser;
  });

module.exports = router;
// module.exports = (app) => {
//   const users = require('../../controllers/tutorial.controller.js');

//   var router = require('express').Router();

//   // Create a new Tutorial
//   router.post('/', tutorials.create);

//   // Retrieve all Tutorials
//   router.get('/', tutorials.findAll);

//   // Retrieve all published Tutorials
//   router.get('/published', tutorials.findAllPublished);

//   // Retrieve a single Tutorial with id
//   router.get('/:id', tutorials.findOne);

//   // Update a Tutorial with id
//   router.put('/:id', tutorials.update);

//   // Delete a Tutorial with id
//   router.delete('/:id', tutorials.delete);

//   // Delete all Tutorials
//   router.delete('/', tutorials.deleteAll);

//   app.use('/api/tutorials', router);
// };
