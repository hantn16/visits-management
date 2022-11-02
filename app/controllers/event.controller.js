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

// Delete a Event with the specified id in the request
const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all Events from the database.
const deleteEvents = catchAsync(async (req, res) => {
  await eventService.deleteEventsById(req.body.eventIds);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  deleteEvents,
};
