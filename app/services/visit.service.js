const httpStatus = require('http-status');

const db = require('../models');
const Visit = db.Visit;
const Op = db.Sequelize.Op;
const ApiError = require('../utils/ApiError');

/**
 * Create a visit
 * @param {Object} visitBody
 * @returns {Promise<Visit>}
 */
const createVisit = async (visitBody) => {
  return Visit.create(visitBody);
};

/**
 * Query for visits
 * @param {Object} query - Squelize query in the format {where:{field:"something"}}
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField1:(desc|asc),sortField2:(desc|asc)
 * @param {string} [options.group] - Group option in the format: groupField1,groupField2
 * @param {string} [options.include] - include option in the format: includeField1:,includeField2
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryVisits = async (query, options) => {
  const visits = await Visit.paginate(query, options);
  return visits;
};

/**
 * Get visit by id
 * @param {ObjectId} id
 * @returns {Promise<Visit>}
 */
const getVisitById = async (id) => {
  return Visit.findByPk(id, {
    include: { all: true, nested: true, attributes: { exclude: ['password'] } },
  });
};

/**
 * Update visit by id
 * @param {ObjectId} visitId
 * @param {Object} updateBody
 * @returns {Promise<Visit>}
 */
const updateVisitById = async (visitId, updateBody) => {
  const visit = await getVisitById(visitId);

  if (!visit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Visit not found');
  }
  Object.assign(visit, updateBody);
  await visit.save();
  return visit;
};

/**
 * Delete visit by id
 * @param {ObjectId} visitId
 * @returns {Promise<Visit>}
 */
const deleteVisitById = async (visitId) => {
  const visit = await getVisitById(visitId);
  if (!visit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Visit not found');
  }
  await visit.destroy();
  return visit;
};
/**
 * Delete visits by Ids
 * @param {Array<ObjectId>} visitIds
 * @returns {Promise<Array<Visit>>}
 */
const deleteVisitsById = async (visitIds) => {
  return visitIds.map(async (id) => {
    const visit = await getVisitById(id);
    if (!visit) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Visit not found');
    }
    await visit.destroy();
    return visit;
  });
};

module.exports = {
  createVisit,
  queryVisits,
  getVisitById,
  updateVisitById,
  deleteVisitById,
  deleteVisitsById,
};
