const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { relationshipService } = require('../services');
const ApiError = require('../utils/ApiError');

const createRelationship = catchAsync(async (req, res) => {
  const relationship = await relationshipService.createRelationship(req.body);
  res.status(httpStatus.CREATED).send(relationship);
});

// Retrieve all Relationships from the database.
const getRelationships = catchAsync(async (req, res) => {
  const query = pick(req.query, ['name', 'nameEn']);
  const options = pick(req.query, ['orderBy', 'limit', 'page', 'include', 'group']);
  const result = await relationshipService.queryRelationships(query, options);
  res.send(result);
});

// Find a single Relationship with an id
const getRelationship = catchAsync(async (req, res) => {
  const relationship = await relationshipService.getRelationshipById(req.params.id);
  if (!relationship) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Relationship not found');
  }
  res.send(relationship);
});

// Update a Relationship by the id in the request
const updateRelationship = catchAsync(async (req, res) => {
  const relationship = await relationshipService.updateRelationshipById(req.params.id, req.body);
  res.send(relationship);
});

// Delete a Relationship with the specified id in the request
const deleteRelationship = catchAsync(async (req, res) => {
  await relationshipService.deleteRelationshipById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteRelationships = catchAsync(async (req, res) => {
  await relationshipService.deleteRelationshipsById(req.body.relationshipIds);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRelationship,
  getRelationships,
  getRelationship,
  updateRelationship,
  deleteRelationship,
  deleteRelationships,
};
