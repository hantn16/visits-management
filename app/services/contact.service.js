const httpStatus = require('http-status');

const db = require('../models');
const Contact = db.Contact;
const User = db.User;
const Op = db.Sequelize.Op;
const ApiError = require('../utils/ApiError');

/**
 * Create a contact
 * @param {Object} contactBody
 * @returns {Promise<Contact>}
 */
const createContact = async (contactBody) => {
  return Contact.create(contactBody);
};

/**
 * Query for contacts
 * @param {Object} query - Squelize query in the format {where:{field:"something"}}
 * @param {Object} options - Query options
 * @param {string} [options.orderBy] - Sort option in the format: sortField1:(desc|asc),sortField2:(desc|asc)
 * @param {string} [options.group] - Group option in the format: groupField1,groupField2
 * @param {string} [options.include] - include option in the format: includeField1:,includeField2
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContacts = async (query, options) => {
  const contacts = await Contact.paginate(query, options);
  return contacts;
};

/**
 * Get contact by id
 * @param {ObjectId} id
 * @returns {Promise<Contact>}
 */
const getContactById = async (id) => {
  return Contact.findByPk(id, {
    include: { all: true, attributes: { exclude: ['password'] } },
  });
};

/**
 * Update contact by id
 * @param {ObjectId} contactId
 * @param {Object} updateBody
 * @returns {Promise<Contact>}
 */
const updateContactById = async (contactId, updateBody) => {
  const contact = await getContactById(contactId);

  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  Object.assign(contact, updateBody);
  await contact.save();
  return contact;
};

/**
 * Delete contact by id
 * @param {ObjectId} contactId
 * @returns {Promise<Contact>}
 */
const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  await contact.destroy();
  return contact;
};
/**
 * Delete contacts by Ids
 * @param {Array<ObjectId>} contactIds
 * @returns {Promise<Array<Contact>>}
 */
const deleteContactsById = async (contactIds) => {
  return contactIds.map(async (id) => {
    const contact = await getContactById(id);
    if (!contact) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    await contact.destroy();
    return contact;
  });
};

module.exports = {
  createContact,
  queryContacts,
  getContactById,
  updateContactById,
  deleteContactById,
  deleteContactsById,
};
