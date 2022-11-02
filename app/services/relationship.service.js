const httpStatus = require('http-status');

const db = require('../models');
const Relationship = db.Relationship;
const Op = db.Sequelize.Op;
const ApiError = require('../utils/ApiError');

/**
 * Create a relationship
 * @param {Object} relationshipBody
 * @returns {Promise<Relationship>}
 */
const createRelationship = async (relationshipBody) => {
  return Relationship.create(relationshipBody);
};

/**
 * Query for relationships
 * @param {Object} query - Squelize query in the format {where:{field:"something"}}
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField1:(desc|asc),sortField2:(desc|asc)
 * @param {string} [options.group] - Group option in the format: groupField1,groupField2
 * @param {string} [options.include] - include option in the format: includeField1:,includeField2
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRelationships = async (query, options) => {
  const relationships = await Relationship.paginate(query, options);
  return relationships;
};

/**
 * Get relationship by id
 * @param {ObjectId} id
 * @returns {Promise<Relationship>}
 */
const getRelationshipById = async (id) => {
  const relationship = await Relationship.findByPk(id, {
    include: { all: true },
  });
  return relationship;
};

/**
 * Update relationship by id
 * @param {ObjectId} relationshipId
 * @param {Object} updateBody
 * @returns {Promise<Relationship>}
 */
const updateRelationshipById = async (relationshipId, updateBody) => {
  const relationship = await getRelationshipById(relationshipId);

  if (!relationship) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Relationship not found');
  }
  Object.assign(relationship, updateBody);
  await relationship.save();
  return relationship;
};

/**
 * Delete relationship by id
 * @param {ObjectId} relationshipId
 * @returns {Promise<Relationship>}
 */
const deleteRelationshipById = async (relationshipId) => {
  const relationship = await getRelationshipById(relationshipId);
  if (!relationship) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Relationship not found');
  }
  await relationship.destroy();
  return relationship;
};
/**
 * Delete relationships by Ids
 * @param {Array<ObjectId>} relationshipIds
 * @returns {Promise<Array<Relationship>>}
 */
const deleteRelationshipsById = async (relationshipIds) => {
  return relationshipIds.map(async (id) => {
    const relationship = await getRelationshipById(id);
    if (!relationship) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Relationship not found');
    }
    await relationship.destroy();
    return relationship;
  });
};

module.exports = {
  createRelationship,
  queryRelationships,
  getRelationshipById,
  updateRelationshipById,
  deleteRelationshipById,
  deleteRelationshipsById,
};
