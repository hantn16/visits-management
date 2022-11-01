const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { relationshipValidation } = require('../../validations');
const { relationshipController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(validate(relationshipValidation.getRelationships), relationshipController.getRelationships)
  .post(validate(relationshipValidation.createRelationship), relationshipController.createRelationship)
  .delete(validate(relationshipValidation.deleteRelationships), relationshipController.deleteRelationships);

router
  .route('/:id')
  .get(validate(relationshipValidation.getRelationship), relationshipController.getRelationship)
  .patch(validate(relationshipValidation.updateRelationship), relationshipController.updateRelationship)
  .delete(validate(relationshipValidation.deleteRelationship), relationshipController.deleteRelationship);

module.exports = router;
