const express = require('express');
const router = express.Router();
const evolucion = require("../controllers/evolucion.controller.js");
const middleware = require('../routes/middleware.js');
const validations = require('../validations.js');


router.get("/evolucion/:id", [middleware.checkToken], evolucion.getEvolucion);
router.post("/evolucionessistema", [middleware.checkToken],  evolucion.getEvolucionesSistema);
router.post("/evolucion", [middleware.checkToken], validations.validate(validations.createEvolucion), evolucion.addEvolucion);
router.put("/evolucion/:id", [middleware.checkToken], validations.validate(validations.createEvolucion),evolucion.editEvolucion);
router.get("/ultimaevolucion/:id", [middleware.checkToken], evolucion.getUltimaEvolucion);
router.post("/correrreglas", [middleware.checkToken], evolucion.correrReglas);

module.exports = router;