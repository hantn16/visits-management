const httpStatus = require('http-status');

const db = require('../models');
const Item = db.Item;
const User = db.User;
const Op = db.Sequelize.Op;
const ApiError = require('../utils/ApiError');

/**
 * Create a item
 * @param {Object} itemBody
 * @returns {Promise<Item>}
 */
const createItem = async (itemBody) => {
  return Item.create(itemBody);
};

/**
 * Query for items
 * @param {Object} query - Squelize query in the format {where:{field:"something"}}
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField1:(desc|asc),sortField2:(desc|asc)
 * @param {string} [options.group] - Group option in the format: groupField1,groupField2
 * @param {string} [options.include] - include option in the format: includeField1:,includeField2
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryItems = async (query, options) => {
  const items = await Item.paginate(query, options);
  return items;
};

/**
 * Get item by id
 * @param {ObjectId} id
 * @returns {Promise<Item>}
 */
const getItemById = async (id) => {
  return Item.findByPk(id, {
    include: { all: true, attributes: { exclude: ['password'] } },
  });
};

/**
 * Update item by id
 * @param {ObjectId} itemId
 * @param {Object} updateBody
 * @returns {Promise<Item>}
 */
const updateItemById = async (itemId, updateBody) => {
  const item = await getItemById(itemId);

  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  Object.assign(item, updateBody);
  await item.save();
  return item;
};

/**
 * Delete item by id
 * @param {ObjectId} itemId
 * @returns {Promise<Item>}
 */
const deleteItemById = async (itemId) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await item.destroy();
  return item;
};
/**
 * Delete items by Ids
 * @param {Array<ObjectId>} itemIds
 * @returns {Promise<Array<Item>>}
 */
const deleteItemsById = async (itemIds) => {
  return itemIds.map(async (id) => {
    const item = await getItemById(id);
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    await item.destroy();
    return item;
  });
};

module.exports = {
  createItem,
  queryItems,
  getItemById,
  updateItemById,
  deleteItemById,
  deleteItemsById,
};
