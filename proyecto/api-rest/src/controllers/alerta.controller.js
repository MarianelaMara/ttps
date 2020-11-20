const Alerta = require("../models/alerta.model.js");

//devuelve las alertas de un medico o jefe
exports.getAlertas = (req, res) => {
    const  id = req.params.id;
    Alerta.getAlertas(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                  message: `No tiene alertas`
                });
              } else {
                res.status(500).send({
                  message: "Error servidor  "
                });
              }
        } else res.send(data);
      });
};
//devuelve las alertas pendientes de un medico o jefe
exports.getAlertasPendientes = (req, res) => {
    const  id = req.params.id;
    Alerta.getAlertasPendientes(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                  message: `No tiene alertas pendientes`
                });
              } else {
                res.status(500).send({
                  message: "Error servidor  "
                });
              }
        } else res.send(data);
      });
};
//marca alerta como leída
exports.marcarAlerta = (req, res) => {
    const  id = req.body.id;
    Alerta.marcarAlerta(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error servidor  "
            });
        }else res.send(data);
      });
};