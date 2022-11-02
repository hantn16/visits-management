const Joi = require('joi');
const { uuid } = require('./custom.validation');

const createVisit = {
  body: Joi.object().keys({
    eventId: Joi.string().custom(uuid),
    visitorId: Joi.string().custom(uuid),
    visiteeId: Joi.string().custom(uuid),
    time: Joi.date().required(),
    description: Joi.string(),
  }),
};

const getVisits = {
  query: Joi.object().keys({
    time: Joi.date(),
    orderBy: Joi.string(),
    include: Joi.string(),
    group: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVisit = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};

const updateVisit = {
  params: Joi.object().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      eventId: Joi.string().custom(uuid),
      visitorId: Joi.string().custom(uuid),
      visiteeId: Joi.string().custom(uuid),
      time: Joi.date(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteVisit = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};
const deleteVisits = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

module.exports = {
  createVisit,
  getVisits,
  getVisit,
  updateVisit,
  deleteVisit,
  deleteVisits,
};
