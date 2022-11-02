const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { contactValidation } = require('../../validations');
const { contactController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(contactValidation.createContact), contactController.createContact)
  .get(validate(contactValidation.getContacts), contactController.getContacts)
  .delete(validate(contactValidation.deleteContacts), contactController.deleteContacts);

router
  .route('/:id')
  .get(validate(contactValidation.getContact), contactController.getContact)
  .patch(validate(contactValidation.updateContact), contactController.updateContact)
  .delete(validate(contactValidation.deleteContact), contactController.deleteContact);

module.exports = router;
