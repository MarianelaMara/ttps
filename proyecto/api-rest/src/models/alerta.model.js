const sql = require("../database.js");

const Alerta = function(p) {
    
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

Alerta.addAlerta = (idpaciente, texto, result) => {
  sql.query('INSERT INTO alerta (idpaciente, texto, fecha, vista) VALUES ('+[idpaciente]+', "'+[texto]+'", CURDATE(), 0)' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    else { 
      result(null, res.insertId);
      return;
    }
  });
};
Alerta.asociar = (idalerta, idempleado, result) => {
  sql.query('INSERT INTO tienealerta (idalerta, idempleado) VALUES ('+[idalerta]+', '+[idempleado]+')' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  });
};

module.exports = Alerta;