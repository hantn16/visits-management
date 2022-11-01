const Joi = require('joi');
const { password, uuid } = require('./custom.validation');

const createRelationship = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    nameEn: Joi.string(),
    parentId: Joi.string().custom(uuid),
    description: Joi.string(),
  }),
};

const getRelationships = {
  query: Joi.object().keys({
    name: Joi.string(),
    orderBy: Joi.string(),
    include: Joi.string(),
    group: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRelationship = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};

const updateRelationship = {
  params: Joi.object().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      nameEn: Joi.string(),
      parentId: Joi.string().custom(uuid),
      description: Joi.string(),
    })
    .min(1),
};

const deleteRelationship = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};
const deleteRelationships = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

module.exports = {
  createRelationship,
  getRelationships,
  getRelationship,
  updateRelationship,
  deleteRelationship,
  deleteRelationships,
};
