/**
 * @typedef {Object} QueryResult
 * @property {Document[]} results - Results found
 * @property {number} page - Current page
 * @property {number} limit - Maximum number of results per page
 * @property {number} totalPages - Total number of pages
 * @property {number} totalResults - Total number of documents
 */
/**
 * Query for documents with pagination
 * @param {Object} [model] - Sequelize model
 * @param {Object} [query] - Query string
 * @param {Object} [options] - Query options
 * @param {string} [options.orderBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
 * @param {string} [options.include] - Set associated name to get associated models. Set include=all to include everything
 * @param {string} [options.group] - Set the fields to group by
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const paginate = async function (model, query, options) {
  let order = [];
  if (options.orderBy) {
    const orderCriteria = [];
    options.orderBy.split(',').forEach((sortItem) => {
      const [key, order] = sortItem.split(':');
      const sortItemArr = key.split('.');
      if (order && order.toUpperCase() === 'DESC') {
        sortItemArr.push(order.toUpperCase());
      }
      orderCriteria.push(sortItemArr);
    });
    order = orderCriteria;
  } else {
    order.push(['createdAt', 'DESC']);
  }
  const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const offset = (page - 1) * limit;

  const findOptions = {
    where: query,
    order,
    offset,
    limit,
  };
  const countOptions = {
    where: query,
  };
  if (options.group) {
    findOptions.group = options.group;
    countOptions.group = options.group;
  }
  if (options.include) {
    const arr = options.include.split(',');
    if (options.include === 'all') {
      findOptions.include = { all: true };
    } else if (options.include === 'all,nested') {
      findOptions.include = { all: true, nested: true };
    } else {
      findOptions.include = arr;
    }
  }
  const countPromise = model.count(countOptions);
  const docsPromise = model.findAll(findOptions);

  return Promise.all([countPromise, docsPromise]).then((values) => {
    const [totalResults, results] = values;
    const totalPages = Math.ceil(totalResults / limit);
    const result = {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
    return Promise.resolve(result);
  });
};

module.exports = paginate;
