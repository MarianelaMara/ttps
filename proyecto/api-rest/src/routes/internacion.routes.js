const express = require('express');
const router = express.Router();
const internacion = require("../controllers/internacion.controller.js");
const middleware = require('../routes/middleware.js');
const validations = require('../validations.js');

router.get("/internacion/:id", [middleware.checkToken], internacion.getInternacion);
router.post("/internacion", [middleware.checkToken], internacion.addInternacion);
module.exports = router;