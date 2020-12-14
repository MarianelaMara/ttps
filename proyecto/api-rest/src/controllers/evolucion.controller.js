const Evolucion = require("../models/evolucion.model.js");
const Alertas = require("../models/alerta.model.js");

const { correrReglas } = require("../reglas.js");

exports.correrReglas = (req, res) => {
  const {ev, satAnt, fechasintomas, idpaciente}  = req.body;
  correrReglas(ev, satAnt, fechasintomas, idpaciente);
};
exports.addEvolucion = (req, res) => {
    var {idsistema, idinternacion,idpersonal, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion, satAnterior, fechasintomas, idpaciente} = req.body;
    if(oxigeno === false){
      tipo= '',
      litros= 0,
      porcentaje= 0,
      saturacion= 0,
      pafi= false,
      valorpafi= 0,
      pronovigil= false,
      tos= false,
      disnea=0,
      estabilidad= false
    }
    if (pafi === false){
      valorpafi= 0
    }
    if (arm === false){
      armdescripcion= ''
    }
    if (vasopresores===false){
      vasopresoresdescripcion= ''
    }
    Evolucion.addEvolucion(idsistema, idinternacion,idpersonal, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion, (err, data) => {
      if (err) {
        res.status(404).send({
            message: `No se pudo agregar la evolucion` + err
        }); 
      } else {
        var a= correrReglas(data, satAnterior, fechasintomas);
        console.log(a);
        if(a.length > 0){
          Alertas.agregarAlertas(idpaciente, a);
        }
        res.send(data); }
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
exports.getUltimaEvolucion = (req, res) => {
  const  id = req.params.id;
  Evolucion.getUltimaEvolucion(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found`
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

