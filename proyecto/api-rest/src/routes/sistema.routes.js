const express = require('express');
const router = express.Router();
const sistema = require("../controllers/sistema.controller.js");
const middleware = require('../routes/middleware.js');
//devuelve las salas de un sistema
router.get("/salas/:id", [middleware.checkToken], sistema.getSalas);
//devuelve nombre de una sala dado un id
router.get("/sala/:id", [middleware.checkToken], sistema.getNombreSala);
//devuelve las salas de un sistema
router.get("/cantidadsalas/:id", [middleware.checkToken], sistema.getCantidadSalas);
//devuelve la cantidad total de camas un sistema
router.get("/camassistema/:id", [middleware.checkToken], sistema.getCantidadCamasSistema);
//devuelve la cantidad total de camas ocupadas un sistema
router.get("/camasocupadassistema/:id", [middleware.checkToken], sistema.getCantidadCamasOcupadasSistema);

//cambia a un paciente de sistema
router.post("/cambiarsistema", [middleware.checkToken], sistema.getCambioSistema);
//devuelve las camas de una sala
router.get("/camas/:id", [middleware.checkToken], sistema.getCamas);
//devuelve la cantidad de camas de una sala
router.get("/camassala/:id", [middleware.checkToken], sistema.getCantidadCamas);
//devuelve las camas ocupadas de una sala
router.get("/camasocupadassala/:id", [middleware.checkToken], sistema.getCantidadCamasOcupadas);
//devuelve nombre del sistema dado un id
router.get("/sistema/:id", [middleware.checkToken], sistema.getSistema);

module.exports = router;