const Joi = require('joi');
const { password, uuid } = require('./custom.validation');

const createEvent = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    typeId: Joi.string().required().custom(uuid),
    description: Joi.string(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      description: Joi.string(),
      typeId: Joi.string().custom(uuid),
      name: Joi.string(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};
const deleteEvents = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  deleteEvents,
};
