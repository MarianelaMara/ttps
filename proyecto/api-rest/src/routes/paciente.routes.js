const express = require('express');
const router = express.Router();
const paciente = require("../controllers/paciente.controller.js");
const middleware = require('../routes/middleware.js');
const validations = require('../validations.js');

router.get("/pacientes", [middleware.checkToken],  paciente.getAllPacientes);
router.get("/pacientessistema/:id", [middleware.checkToken],  paciente.getPacientesSistema);
router.get("/paciente/:id", [middleware.checkToken], paciente.getPaciente);
router.post("/buscarpaciente", [middleware.checkToken], paciente.getPacienteDni);
router.post("/asignarmedico", paciente.asignarMedico);
router.post("/paciente", [middleware.checkToken],paciente.addPaciente);
module.exports = router;