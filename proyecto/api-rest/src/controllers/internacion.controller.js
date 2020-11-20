const Internacion = require("../models/internacion.model.js");

exports.addInternacion = (req, res) => {
    const {idpaciente, fechaactual, fechasintomas, fechadiagnostico, enfermedadactual } = req.body;
    Internacion.addInternacion(idpaciente, fechaactual, fechasintomas, fechadiagnostico, enfermedadactual, (err, data) => {
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