const httpStatus = require('http-status');

const db = require('../models');
const Event = db.Event;
const Op = db.Sequelize.Op;
const ApiError = require('../utils/ApiError');

/**
 * Create a event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */
const createEvent = async (eventBody) => {
  return Event.create(eventBody);
};

/**
 * Query for events
 * @param {Object} query - Squelize query in the format {where:{field:"something"}}
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField1:(desc|asc),sortField2:(desc|asc)
 * @param {string} [options.group] - Group option in the format: groupField1,groupField2
 * @param {string} [options.include] - include option in the format: includeField1:,includeField2
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEvents = async (query, options) => {
  const events = await Event.paginate(query, options);
  return events;
};

/**
 * Get event by id
 * @param {ObjectId} id
 * @returns {Promise<Event>}
 */
const getEventById = async (id) => {
  return Event.findByPk(id, {
    include: 'type',
  });
};

/**
 * Update event by id
 * @param {ObjectId} eventId
 * @param {Object} updateBody
 * @returns {Promise<Event>}
 */
const updateEventById = async (eventId, updateBody) => {
  const event = await getEventById(eventId);

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  Object.assign(event, updateBody);
  await event.save();
  return event;
};

/**
 * Delete event by id
 * @param {ObjectId} eventId
 * @returns {Promise<Event>}
 */
const deleteEventById = async (eventId) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  await event.destroy();
  return event;
};
/**
 * Delete events by Ids
 * @param {Array<ObjectId>} eventIds
 * @returns {Promise<Array<Event>>}
 */
const deleteEventsById = async (eventIds) => {
  eventIds.map(async (id) => {
    const event = await getEventById(id);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    await event.destroy();
    return event;
  });
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  deleteEventsById,
};
