const sql = require("../database.js");
const Personal = require("../models/personal.model");

const Sistema = function(p) {
    
};

Sistema.getSalas = (id, result) => {
    sql.query('SELECT * FROM sala WHERE idsistema= ' + [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res);
        return;
      }
    });
};
Sistema.getCamas = (id, result) => {
  sql.query('SELECT * FROM cama WHERE idsala= ' + [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
  });
};

Sistema.getCamaLibre = (id, result) => {
    sql.query('SELECT * FROM sistema INNER JOIN sala ON sistema.idsistema = sala.idsistema INNER JOIN cama ON sala.idsala= cama.idsala WHERE sistema.idsistema= "' + [id] + '" AND cama.libre = "1"', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found cama libre
      result({ kind: "not_found" }, null);
    });
};

Sistema.ocuparCama = (idcama, idpaciente,result) => {
    sql.query('UPDATE cama SET idpaciente ="' + [idpaciente] + '", libre= "0" WHERE (idcama= "'+[idcama]+'")', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
};

Sistema.desocuparCama = (idcama, result) => {
  sql.query('UPDATE cama SET idpaciente ="0", libre= "1" WHERE (idcama=" '+[idcama]+'")', (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
  });
};
Sistema.borrarMedicosAsignados= (idpaciente, result) => {
  sql.query('DELETE FROM tienemedicos WHERE (idpaciente= "'+[idpaciente]+'")', (err) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
  });
};
Sistema.asignarJefeaPaciente = (idpaciente, idsistema, result) => {
  Personal.getJefeSistema(idsistema, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `El sistema no tiene un jefe asignado`
        });
      } else {
        res.status(500).send({
          message: "Error servidor  "
        });
      }
    } else {
      sql.query('INSERT INTO tienemedicos (`idpaciente`, `idempleado`) VALUES ("' + [idpaciente]+'", "'+[data]+'")', (errDos, res) => {
        if (errDos) {
          console.log("error: ", errDos);
          result(errDos, null);
          return;
        } 
        if (res.length) {
          result(null, res[0]);
          return;
        }
      });
    }    
  });  
};

module.exports = Sistema;
