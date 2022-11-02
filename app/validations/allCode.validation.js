const Joi = require('joi');
const { uuid } = require('./custom.validation');

const createAllCode = {
  body: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string(),
  }),
};

const getAllCodes = {
  query: Joi.object().keys({
    key: Joi.string(),
    value: Joi.string(),
    type: Joi.string(),
    orderBy: Joi.string(),
    include: Joi.string(),
    group: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAllCode = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};

const updateAllCode = {
  params: Joi.object().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      key: Joi.string(),
      value: Joi.string(),
      type: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteAllCode = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};
const deleteAllCodes = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

module.exports = {
  createAllCode,
  getAllCodes,
  getAllCode,
  updateAllCode,
  deleteAllCode,
  deleteAllCodes,
};
