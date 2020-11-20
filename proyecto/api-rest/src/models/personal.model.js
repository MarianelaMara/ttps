const sql = require("../database.js");
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../configs/config.js');

// constructor
const Personal = function(p) {
  this.token = p.token;
  this.nombre = p.nombre;
  this.apellido = p.apellido;
  this.rol = p.rol;
  this.idsistema = p.idsistema;
  this.idempleado = p.idempleado
};
//Método que asigna el token
const createToken = () => {
  let payload = {
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload, config.llave);
}

Personal.login = (usuario, contraseña, result) => {
  sql.query('SELECT * FROM empleado WHERE usuario="'+ [usuario] + '" AND contraseña="'+ [contraseña]  + '"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
        const personal = new Personal({
        token: createToken(res[0]),
        nombre: res[0].nombre,
        apellido: res[0].apellido,
        rol: res[0].rol,
        idsistema: res[0].idsistema,
        idempleado: res[0].idempleado
      });
      result(null, personal);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
Personal.getAllJefes = (result) => {
  sql.query('SELECT * FROM empleado WHERE rol="jefe"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Personal.getJefe = (id, result) => {
  sql.query('SELECT * FROM empleado WHERE rol="jefe" AND idempleado = ' + [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
    // not found Jefe with the id
    result({ kind: "not_found" }, null);
  });
};
//método que devuelve el jefe de sistema ingresado
Personal.getJefeSistema = (idsistema, result) => {
  sql.query('SELECT idempleado FROM empleado WHERE rol="jefe" AND idsistema = ' + [idsistema], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res[0].idempleado);
      return;
    }
    // not found Jefe with the idsistema
    result({ kind: "not_found" }, null);
  });
};

Personal.getAllMedicos = (result) => {
  sql.query('SELECT * FROM empleado WHERE rol="medico"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Personal.getMedico = (id, result) => {
  sql.query('SELECT * FROM empleado WHERE rol="medico" AND idempleado = ' + [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      result(null, res);
      return;
    }
    // not found Medico with the id
    result({ kind: "not_found" }, null);
  });
};

Personal.getMedicoBuscar = (nombre, apellido, result) => {
  sql.query('SELECT * FROM empleado WHERE rol="medico" AND nombre= "' + [nombre]+'" AND apellido="'+[apellido]+'"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      result(null, res);
      return;
    }
    // not found Medico 
    result({ kind: "not_found" }, null);
  });
};

Personal.getJefeBuscar = (nombre, apellido, result) => {
  sql.query('SELECT * FROM empleado WHERE rol="jefe" AND nombre= "' + [nombre]+'" AND apellido="'+[apellido]+'"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      result(null, res);
      return;
    }
    // not found Jefe 
    result({ kind: "not_found" }, null);
  });
};
module.exports = Personal;