const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { itemValidation } = require('../../validations');
const { itemController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(itemValidation.createItem), itemController.createItem)
  .get(validate(itemValidation.getItems), itemController.getItems)
  .delete(validate(itemValidation.deleteItems), itemController.deleteItems);

router
  .route('/:id')
  .get(validate(itemValidation.getItem), itemController.getItem)
  .patch(validate(itemValidation.updateItem), itemController.updateItem)
  .delete(validate(itemValidation.deleteItem), itemController.deleteItem);

module.exports = router;
