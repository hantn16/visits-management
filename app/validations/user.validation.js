const Joi = require('joi');
const { password, uuid } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    orderBy: Joi.string(),
    include: Joi.string(),
    group: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(uuid),
  }),
};
const deleteUsers = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

const updateMe = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteUsers,
  updateMe,
};
