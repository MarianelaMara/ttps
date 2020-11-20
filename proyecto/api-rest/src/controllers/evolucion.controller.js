const Evolucion = require("../models/evolucion.model.js");

exports.addEvolucion = (req, res) => {
    const {idsistema, idinternacion,idpersonal, fecha, hora, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion } = req.body;
    Evolucion.addEvolucion(idsistema, idinternacion,idpersonal, fecha, hora, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion, (err, data) => {
      if (err) {
        res.status(404).send({
            message: `No se pudo agregar la evolucion` + err
        }); 
      } else res.send(data);
    });
};

exports.getEvolucion = (req, res) => {
    const  id = req.params.id;
    Evolucion.getEvolucion(id, (err, data) => {
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
exports.getEvolucionesysistemas = (req, res) => {
  const  id = req.params.id;
  Evolucion.getEvolucionesysistemas(id, (err, data) => {
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

exports.editEvolucion = (req, res) => {
  const  id = req.params.id;
  const {idsistema, idinternacion,idpersonal, fecha, hora, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion } = req.body;
  Evolucion.editEvolucion(id, idsistema, idinternacion,idpersonal, fecha, hora, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion, (err, data) => {
    if (err) {
      res.status(404).send({
          message: `No se pudo editar la evolucion` + err
      }); 
    } else res.send(data);
  });
};
