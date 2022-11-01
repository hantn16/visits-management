const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { eventService } = require('../services');
const ApiError = require('../utils/ApiError');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

// Retrieve all Events from the database.
const getEvents = catchAsync(async (req, res) => {
  const query = pick(req.query, ['name']);
  const options = pick(req.query, ['orderBy', 'limit', 'page', 'include', 'group']);
  const result = await eventService.queryEvents(query, options);
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
const getEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.send(event);
});

// Update a Event by the id in the request
const updateEvent = catchAsync(async (req, res) => {
  const event = await eventService.updateEventById(req.params.id, req.body);
  res.send(event);
});

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
const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

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
const deleteEvents = catchAsync(async (req, res) => {
  await eventService.deleteEventsById(req.body.eventIds);
  res.status(httpStatus.NO_CONTENT).send();
});

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
module.exports = {
  createEvent,
  getEvents,
  findAll,
  getEvent,
  updateEvent,
  deleteEvent,
  update,
  deleteOne,
  deleteAll,
  deleteEvents,
  findAllPublished,
};
