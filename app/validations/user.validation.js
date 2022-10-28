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
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(uuid),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      photoURL: Joi.string(),
      userSettings: Joi.object(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(uuid),
  }),
};
const deleteUsers = {
  body: Joi.object().keys({
    userIds: Joi.array().items(Joi.string().custom(uuid)),
  }),
};

const updateMe = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      photoURL: Joi.string(),
      avatar: Joi.any(),
      userSettings: Joi.object(),
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
