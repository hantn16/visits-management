const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { itemService } = require('../services');
const ApiError = require('../utils/ApiError');

const createItem = catchAsync(async (req, res) => {
  const item = await itemService.createItem(req.body);
  res.status(httpStatus.CREATED).send(item);
});

// Retrieve all Items from the database.
const getItems = catchAsync(async (req, res) => {
  const query = pick(req.query, ['amount', 'unit']);
  const options = pick(req.query, ['orderBy', 'limit', 'page', 'include', 'group']);
  const result = await itemService.queryItems(query, options);
  res.send(result);
});

// Find a single Item with an id
const getItem = catchAsync(async (req, res) => {
  const item = await itemService.getItemById(req.params.id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});

// Update a Item by the id in the request
const updateItem = catchAsync(async (req, res) => {
  const item = await itemService.updateItemById(req.params.id, req.body);
  res.send(item);
});

// Delete a Item with the specified id in the request
const deleteItem = catchAsync(async (req, res) => {
  await itemService.deleteItemById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all Items from the database.
const deleteItems = catchAsync(async (req, res) => {
  await itemService.deleteItemsById(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  deleteItems,
};
