const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { contactService } = require('../services');
const ApiError = require('../utils/ApiError');

const createContact = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send(contact);
});

// Retrieve all Contacts from the database.
const getContacts = catchAsync(async (req, res) => {
  const query = pick(req.query, ['name', 'phone', 'address']);
  const options = pick(req.query, ['orderBy', 'limit', 'page', 'include', 'group']);
  const result = await contactService.queryContacts(query, options);
  res.send(result);
});

// Find a single Contact with an id
const getContact = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  res.send(contact);
});

// Update a Contact by the id in the request
const updateContact = catchAsync(async (req, res) => {
  const contact = await contactService.updateContactById(req.params.id, req.body);
  res.send(contact);
});

// Delete a Contact with the specified id in the request
const deleteContact = catchAsync(async (req, res) => {
  await contactService.deleteContactById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete all Contacts from the database.
const deleteContacts = catchAsync(async (req, res) => {
  await contactService.deleteContactsById(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  deleteContacts,
};
