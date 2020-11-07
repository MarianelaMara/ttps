const express = require('express');
const router = express.Router();
const personal = require("../controllers/personal.controller.js");
const validations = require('../validations.js');
const middleware = require('../routes/middleware.js');
  
    // Create a new Customer
router.post("/login",  validations.validate(validations.createUsersValidation), personal.findOne);
router.get("/jefes",  [middleware.checkToken], personal.getAllJefes);

module.exports = router;
