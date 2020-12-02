const Internacion = require("../models/internacion.model.js");

exports.addInternacion = (req, res) => {
    const {idpaciente, fechasintomas, fechadiagnostico, enfermedadactual } = req.body;
    Internacion.addInternacion(idpaciente, fechasintomas, fechadiagnostico, enfermedadactual, (err, data) => {
      if (err) {
        res.status(404).send({
            message: `No se pudo agregar la internacion` + err
        }); 
      } else res.send(data);
    });
};

exports.getInternacion = (req, res) => {
    const  id = req.params.id;
    Internacion.getInternacion(id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found`
            });
          } else {
            res.status(500).send({
              message: "Error servidor  "
            });
          }
        } else res.send(data);
      });
};
exports.getInternaciones = (req, res) => {
  const  id = req.params.id;
  Internacion.getInternaciones(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found`
          });
        } else {
          res.status(500).send({
            message: "Error servidor  "
          });
        }
      } else res.send(data);
    });
};
exports.obito = (req, res) => {
  const  {id, idpaciente} = req.body;
  Internacion.obito(id, idpaciente, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se pudo dar alta por obito`
          });
        } else {
          res.status(500).send({
            message: "Error servidor  "
          });
        }
      } else res.send(data);
    });
};
exports.altamedica = (req, res) => {
  const  {id, idpaciente} = req.body;
  Internacion.altamedica(id, idpaciente, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se pudo dar alta por obito`
          });
        } else {
          res.status(500).send({
            message: "Error servidor  "
          });
        }
      } else res.send(data);
    });
};