const express = require('express');
const router = express.Router();
const sistema = require("../controllers/sistema.controller.js");
const middleware = require('../routes/middleware.js');
//devuelve las salas de un sistema
router.get("/salas/:id", [middleware.checkToken], sistema.getSalas);
//cambia a un paciente de sistema
router.post("/cambiarsistema", [middleware.checkToken], sistema.getCambioSistema);
//devuelve las camas de una sala
router.get("/camas/:id", sistema.getCamas);
//devuelve nombre del sistema dado un id


module.exports = router;