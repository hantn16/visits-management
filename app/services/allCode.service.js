const httpStatus = require('http-status');

const db = require('../models');
const AllCode = db.AllCode;
const User = db.User;
const Op = db.Sequelize.Op;
const ApiError = require('../utils/ApiError');

/**
 * Create a allCode
 * @param {Object} allCodeBody
 * @returns {Promise<AllCode>}
 */
const createAllCode = async (allCodeBody) => {
  return AllCode.create(allCodeBody);
};

/**
 * Query for allCodes
 * @param {Object} query - Squelize query in the format {where:{field:"something"}}
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField1:(desc|asc),sortField2:(desc|asc)
 * @param {string} [options.group] - Group option in the format: groupField1,groupField2
 * @param {string} [options.include] - include option in the format: includeField1:,includeField2
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllCodes = async (query, options) => {
  const allCodes = await AllCode.paginate(query, options);
  return allCodes;
};

/**
 * Get allCode by id
 * @param {ObjectId} id
 * @returns {Promise<AllCode>}
 */
const getAllCodeById = async (id) => {
  return AllCode.findByPk(id, {
    include: { all: true, attributes: { exclude: ['password'] } },
  });
};

/**
 * Update allCode by id
 * @param {ObjectId} allCodeId
 * @param {Object} updateBody
 * @returns {Promise<AllCode>}
 */
const updateAllCodeById = async (allCodeId, updateBody) => {
  const allCode = await getAllCodeById(allCodeId);

  if (!allCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AllCode not found');
  }
  Object.assign(allCode, updateBody);
  await allCode.save();
  return allCode;
};

/**
 * Delete allCode by id
 * @param {ObjectId} allCodeId
 * @returns {Promise<AllCode>}
 */
const deleteAllCodeById = async (allCodeId) => {
  const allCode = await getAllCodeById(allCodeId);
  if (!allCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AllCode not found');
  }
  await allCode.destroy();
  return allCode;
};
/**
 * Delete allCodes by Ids
 * @param {Array<ObjectId>} allCodeIds
 * @returns {Promise<Array<AllCode>>}
 */
const deleteAllCodesById = async (allCodeIds) => {
  return allCodeIds.map(async (id) => {
    const allCode = await getAllCodeById(id);
    if (!allCode) {
      throw new ApiError(httpStatus.NOT_FOUND, 'AllCode not found');
    }
    await allCode.destroy();
    return allCode;
  });
};

module.exports = {
  createAllCode,
  queryAllCodes,
  getAllCodeById,
  updateAllCodeById,
  deleteAllCodeById,
  deleteAllCodesById,
};
