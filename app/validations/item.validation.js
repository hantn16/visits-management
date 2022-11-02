const Joi = require('joi');
const { uuid } = require('./custom.validation');

const createItem = {
  body: Joi.object().keys({
    visitId: Joi.string().required().custom(uuid),
    typeId: Joi.string().required().custom(uuid),
    unit: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string(),
  }),
};

const getItems = {
  query: Joi.object().keys({
    visitId: Joi.string().custom(uuid),
    typeId: Joi.string().custom(uuid),
    unit: Joi.string(),
    amount: Joi.number(),
    orderBy: Joi.string(),
    include: Joi.string(),
    group: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};

const updateItem = {
  params: Joi.object().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      visitId: Joi.string().custom(uuid),
      typeId: Joi.string().custom(uuid),
      unit: Joi.string(),
      amount: Joi.number(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};
const deleteItems = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  deleteItems,
};
