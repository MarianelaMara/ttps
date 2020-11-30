const express = require('express');
const router = express.Router();
const paciente = require("../controllers/paciente.controller.js");
const middleware = require('../routes/middleware.js');
const validations = require('../validations.js');

router.get("/pacientes", [middleware.checkToken],  paciente.getAllPacientes);
router.get("/paciente/:id", [middleware.checkToken], paciente.getPaciente);
router.post("/buscarpaciente", [middleware.checkToken], paciente.getPacienteDni);
router.post("/asignarmedico", paciente.asignarMedico);
router.post("/paciente", [middleware.checkToken], validations.validate(validations.createPaciente),paciente.addPaciente);
module.exports = router;