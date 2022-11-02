const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { allCodeService } = require('../services');
const ApiError = require('../utils/ApiError');

const createAllCode = catchAsync(async (req, res) => {
  const allCode = await allCodeService.createAllCode(req.body);
  res.status(httpStatus.CREATED).send(allCode);
});

// Retrieve all AllCodes from the database.
const getAllCodes = catchAsync(async (req, res) => {
  const query = pick(req.query, ['key', 'value', 'type']);
  const options = pick(req.query, ['orderBy', 'limit', 'page', 'include', 'group']);
  const result = await allCodeService.queryAllCodes(query, options);
  res.send(result);
});

// Find a single AllCode with an id
const getAllCode = catchAsync(async (req, res) => {
  const allCode = await allCodeService.getAllCodeById(req.params.id);
  if (!allCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AllCode not found');
  }
  res.send(allCode);
});

// Update a AllCode by the id in the request
const updateAllCode = catchAsync(async (req, res) => {
  const allCode = await allCodeService.updateAllCodeById(req.params.id, req.body);
  res.send(allCode);
});

// Delete a AllCode with the specified id in the request
const deleteAllCode = catchAsync(async (req, res) => {
  await allCodeService.deleteAllCodeById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all AllCodes from the database.
const deleteAllCodes = catchAsync(async (req, res) => {
  await allCodeService.deleteAllCodesById(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAllCode,
  getAllCodes,
  getAllCode,
  updateAllCode,
  deleteAllCode,
  deleteAllCodes,
};
