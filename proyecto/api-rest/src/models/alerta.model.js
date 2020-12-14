const sql = require("../database.js");
const Paciente = require("../models/paciente.model.js");


const Alerta= function(p) {

};

Alerta.getAlertas = (id, result) => {
    sql.query('SELECT alerta.idalerta, idpaciente, texto, fecha, vista FROM alerta INNER JOIN tienealerta ON alerta.idalerta= tienealerta.idalerta WHERE tienealerta.idempleado= ' + [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res);
        return;
      }
      // no tiene alertas
      result({ kind: "not_found" }, null);
    });
};

Alerta.getAlertasPendientes = (id, result) => {
    sql.query('SELECT alerta.idalerta, idpaciente, texto, fecha, vista FROM alerta INNER JOIN tienealerta ON alerta.idalerta= tienealerta.idalerta WHERE tienealerta.idempleado= ' + [id]+ ' AND alerta.vista="0"', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res);
        return;
      }
      // not tiene alertas pendientes
      result({ kind: "not_found" }, null);
    });
};


Alerta.marcarAlerta = (id, result) => {
    sql.query('UPDATE alerta SET vista = "1" WHERE idalerta= ' + [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res) {
        result(null, res);
        return;
      }
    });
};

Alerta.addAlerta = (idpaciente, texto, medicos, result) => {
  sql.query('INSERT INTO alerta (idpaciente, texto, fecha, vista) VALUES ('+[idpaciente]+', "'+[texto]+'", CURDATE(), 0)' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    else { 
      for (let m of medicos) {
        sql.query('INSERT INTO tienealerta (idalerta, idempleado) VALUES ('+[res.insertId]+', '+[m]+')' , (err) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
        });
      }
      result(null, res.insertId);
      return;
    }
  });
};

Alerta.agregarAlertas = (idpaciente, arrayAlertas) => {
  Paciente.getMedicosPaciente(idpaciente, (errP, medicos) => {
    if(errP){
      console.log("error: ", errP);
    }
    else {
      for (a of arrayAlertas){
        sql.query('INSERT INTO alerta (idpaciente, texto, fecha, vista) VALUES ('+[idpaciente]+', "'+[a]+'", CURDATE(), 0)' , (err, res) => {
          if (err) {
            console.log("error: ", err);
          } 
          else { 
            for (m of medicos) {
              sql.query('INSERT INTO tienealerta (idalerta, idempleado) VALUES ('+[res.insertId]+', '+[m]+')' , (err) => {
                if (err) {
                  console.log("error: ", err);
                }
              });
            }
          }
        });
      }
    }
  }); 
};

module.exports = Alerta;