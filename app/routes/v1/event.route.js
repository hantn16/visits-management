const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventValidation = require('../../validations/event.validation');
const eventController = require('../../controllers/event.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(eventValidation.createEvent), eventController.createEvent)
  .get(auth('getEvents'), validate(eventValidation.getEvents), eventController.getEvents)
  .delete((req, res) => {
    eventController.deleteEvents;
  });

router
  .route('/:id')
  .get((req, res) => {
    eventController.getEvent;
  })
  .patch((req, res) => {
    eventController.updateEvent;
  })
  .delete((req, res) => {
    eventController.deleteEvent;
  });

module.exports = router;
// module.exports = (app) => {
//   const events = require('../../controllers/tutorial.controller.js');

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
