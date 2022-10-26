const express = require('express');

const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').post(userController.createUser).get(userController.getUsers).delete(userController.deleteUsers);

router.route('/:userId').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

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
