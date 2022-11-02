const Joi = require('joi');
const { uuid } = require('./custom.validation');

const createContact = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string(),
    phone: Joi.string(),
    userId: Joi.string().required().custom(uuid),
    description: Joi.string(),
  }),
};

const getContacts = {
  query: Joi.object().keys({
    name: Joi.string(),
    phone: Joi.string(),
    userId: Joi.string(),
    orderBy: Joi.string(),
    include: Joi.string(),
    group: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getContact = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};

const updateContact = {
  params: Joi.object().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      address: Joi.string(),
      phone: Joi.string(),
      userId: Joi.string().custom(uuid),
      description: Joi.string(),
    })
    .min(1),
};

const deleteContact = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};
const deleteContacts = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  deleteContacts,
};
