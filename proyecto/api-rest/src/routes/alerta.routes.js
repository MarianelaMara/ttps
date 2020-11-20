const express = require('express');
const router = express.Router();
const alerta = require("../controllers/alerta.controller.js");
const middleware = require('../routes/middleware.js');
//devuelve las alerta de un medico o jefe
router.get("/alertas/:id", [middleware.checkToken], alerta.getAlertas);
//devuelve las alerta pendientes de un medico o jefe
router.get("/alertaspendientes/:id", [middleware.checkToken], alerta.getAlertasPendientes);
//marca alerta como vista
router.post("/marcaralerta", alerta.marcarAlerta);


module.exports = router;