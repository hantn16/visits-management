const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { visitService } = require('../services');
const ApiError = require('../utils/ApiError');

const createVisit = catchAsync(async (req, res) => {
  const visit = await visitService.createVisit(req.body);
  res.status(httpStatus.CREATED).send(visit);
});

// Retrieve all Visits from the database.
const getVisits = catchAsync(async (req, res) => {
  const query = pick(req.query, ['time']);
  const options = pick(req.query, ['orderBy', 'limit', 'page', 'include', 'group']);
  const result = await visitService.queryVisits(query, options);
  res.send(result);
});

// Find a single Visit with an id
const getVisit = catchAsync(async (req, res) => {
  const visit = await visitService.getVisitById(req.params.id);
  if (!visit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Visit not found');
  }
  res.send(visit);
});

// Update a Visit by the id in the request
const updateVisit = catchAsync(async (req, res) => {
  const visit = await visitService.updateVisitById(req.params.id, req.body);
  res.send(visit);
});

// Delete a Visit with the specified id in the request
const deleteVisit = catchAsync(async (req, res) => {
  await visitService.deleteVisitById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all Visits from the database.
const deleteVisits = catchAsync(async (req, res) => {
  await visitService.deleteVisitsById(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createVisit,
  getVisits,
  getVisit,
  updateVisit,
  deleteVisit,
  deleteVisits,
};
