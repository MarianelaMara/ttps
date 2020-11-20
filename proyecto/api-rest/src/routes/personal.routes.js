const express = require('express');
const router = express.Router();
const personal = require("../controllers/personal.controller.js");
const validations = require('../validations.js');
const middleware = require('../routes/middleware.js');
  
 
router.post("/login",  validations.validate(validations.createUsersValidation), personal.findOne);
router.get("/jefes",  [middleware.checkToken], personal.getAllJefes);
router.get("/jefe/:id", [middleware.checkToken], personal.getJefe);
router.get("/medicos", [middleware.checkToken],  personal.getAllMedicos);
router.get("/medico/:id", [middleware.checkToken], personal.getMedico);
router.post("/buscarmedico", [middleware.checkToken], personal.getMedicoBuscar);
router.post("/buscarjefe", [middleware.checkToken], personal.getJefeBuscar);
module.exports = router;
