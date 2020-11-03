const express = require('express');
const router = express.Router();
const personal = require("../controllers/personal.controller.js");
const validations = require('../validations.js');
  
    // Create a new Customer
router.post("/login",  validations.validate(validations.createUsersValidation), personal.findOne);

module.exports = router;
