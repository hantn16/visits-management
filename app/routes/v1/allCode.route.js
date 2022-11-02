const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { allCodeValidation } = require('../../validations');
const { allCodeController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(allCodeValidation.createAllCode), allCodeController.createAllCode)
  .get(validate(allCodeValidation.getAllCodes), allCodeController.getAllCodes)
  .delete(validate(allCodeValidation.deleteAllCodes), allCodeController.deleteAllCodes);

router
  .route('/:id')
  .get(validate(allCodeValidation.getAllCode), allCodeController.getAllCode)
  .patch(validate(allCodeValidation.updateAllCode), allCodeController.updateAllCode)
  .delete(validate(allCodeValidation.deleteAllCode), allCodeController.deleteAllCode);

module.exports = router;
