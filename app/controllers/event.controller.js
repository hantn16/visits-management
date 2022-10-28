const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

// Retrieve all Events from the database.
const getEvents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'isEmailVerified']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventService.queryEvents(filter, options);
  res.send(result);
});

// Retrieve all Events from the database.
const findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  Event.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving events.',
      });
    });
};

// Find a single Event with an id
const findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Event with id=' + id,
      });
    });
};

// Update a Event by the id in the request
const update = (req, res) => {
  const id = req.params.id;

  Event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Event was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Event with id=' + id,
      });
    });
};

// Delete a Event with the specified id in the request
const deleteOne = (req, res) => {
  const id = req.params.id;

  Event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Event was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Event with id=' + id,
      });
    });
};

// Delete all Events from the database.
const deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all events.',
      });
    });
};

// find all published Event
const findAllPublished = (req, res) => {
  Event.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving events.',
      });
    });
};
const getTestEvents = (req, res) => {
  return res.status(200).json({
    message: 'Success',
  });
};
module.exports = {
  createEvent,
  getEvents,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllPublished,
  getTestEvents,
};
