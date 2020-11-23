const express = require('express');
const router = express.Router();
const personal = require("../controllers/personal.controller.js");
const validations = require('../validations.js');
const middleware = require('../routes/middleware.js');
  
 
router.post("/login",  validations.validate(validations.createUsersValidation), personal.findOne);
router.get("/empleado/:id", [middleware.checkToken], personal.getEmpleado);
router.get("/jefes",  [middleware.checkToken], personal.getAllJefes);
router.get("/medicos", [middleware.checkToken],  personal.getAllMedicos);
router.post("/buscarmedico", [middleware.checkToken], personal.getMedicoBuscar);
router.post("/buscarjefe", [middleware.checkToken], personal.getJefeBuscar);
module.exports = router;
