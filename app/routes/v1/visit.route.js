const express = require('express');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { visitValidation } = require('../../validations');
const { visitController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(visitValidation.createVisit), visitController.createVisit)
  .get(validate(visitValidation.getVisits), visitController.getVisits)
  .delete(validate(visitValidation.deleteVisits), visitController.deleteVisits);

router
  .route('/:id')
  .get(validate(visitValidation.getVisit), visitController.getVisit)
  .patch(validate(visitValidation.updateVisit), visitController.updateVisit)
  .delete(validate(visitValidation.deleteVisit), visitController.deleteVisit);

module.exports = router;
