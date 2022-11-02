const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

// Retrieve all Users from the database.
const getUsers = catchAsync(async (req, res) => {
  const query = pick(req.query, ['name', 'email']);
  const options = pick(req.query, ['orderBy', 'limit', 'page', 'include', 'group']);
  const result = await userService.queryUsers(query, options);
  res.send(result);
});

// Find a single User with an id
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});
// Find a single User with an email
const getUserByEmail = catchAsync(async (req, res) => {
  console.log(req.body);
  if (!req.body.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
  }
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

// Update a User by the id in the request
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.send(user);
});

// Delete a User with the specified id in the request
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all Users from the database.
const deleteUsers = catchAsync(async (req, res) => {
  await userService.deleteUsersById(req.body.userIds);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  deleteUsers,
};
