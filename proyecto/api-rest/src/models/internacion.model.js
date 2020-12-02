const sql = require("../database.js");
const Sistema = require("./sistema.model.js");


const Internacion = function(p) {
  this.idpaciente = p.idpaciente;
  this.fecha = p.fecha;
  this.fechasintomas = p.fechasintomas;
  this.fechadiagnostico = p.fechadiagnostico;
  this.enfermedadactual = p.enfermedadactual;
  this.fechaegreso = p.fechaegreso;
  this.fechaobito = p.fechaobito;
  this.estado = p.estado;
};

Internacion.getInternacion = (id, result) => {
    sql.query('SELECT * FROM internacion WHERE idpaciente='+ [id]+' AND estado="activo" ORDER BY fecha DESC LIMIT 1', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found Internacion with the id
      result({ kind: "not_found" }, null);
    });
};
Internacion.getInternaciones = (id, result) => {
  sql.query('SELECT * FROM internacion WHERE idpaciente='+ [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
    // not found Internaciones with the idppaciente
    result({ kind: "not_found" }, null);
  });
};
Internacion.obito = (id, idpaciente, result) => {
  sql.query('UPDATE `internacion` SET `fechaobito`= CURDATE(), `estado`= "inactivo" WHERE `idinternacion`='+ [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res) {
      Sistema.desocuparCama(idpaciente, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No hay camas ocupadas`
            });
          } else {
            res.status(500).send({
              message: "Error servidor  "
            });
          }
        }
      });
      Sistema.borrarMedicosAsignados(idpaciente, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No hay camas ocupadas`
            });
          } else {
            res.status(500).send({
              message: "Error servidor  "
            });
          }
        }
      });
      result(null, res);
      return;
    }
    // not se puede modificar la internacion
    result({ kind: "not_found" }, null);
  });
};
Internacion.altamedica = (id, idpaciente, result) => {
  sql.query('UPDATE `internacion` SET `fechaegreso`= CURDATE(), `estado`= "inactivo" WHERE `idinternacion`='+ [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res) {
      Sistema.desocuparCama(idpaciente, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No hay camas ocupadas`
            });
          } else {
            res.status(500).send({
              message: "Error servidor  "
            });
          }
        }
      });
      Sistema.borrarMedicosAsignados(idpaciente, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No hay camas ocupadas`
            });
          } else {
            res.status(500).send({
              message: "Error servidor  "
            });
          }
        }
      });
      result(null, res);
      return;
    }
    // not se puede modificar la internacion
    result({ kind: "not_found" }, null);
  });
};
  
Internacion.addInternacion = (idpaciente, fechasintomas, fechadiagnostico, enfermedadactual,  result) => {
  if(fechadiagnostico === ''){ fechadiagnostico = 'NULL'}
  sql.query('INSERT INTO internacion (`idpaciente`, `fecha`, `fechasintomas`, `fechadiagnostico`, `enfermedadactual`,  `estado`) VALUES ("' + [idpaciente] + '", CURDATE(), "' + [fechasintomas] + '", "' + [fechadiagnostico] + '", "' + [enfermedadactual] +'", "activo")' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    else {
      result(null, res);
      return;
    }
});
};

module.exports = Internacion;