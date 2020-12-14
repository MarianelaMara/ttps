const sql = require("../database.js");
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../configs/config.js');

// constructor
const Personal = function(p) {
  this.token = p.token;
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
Personal.getMedicosSistema = (id, result) => {
  sql.query('SELECT * FROM empleado WHERE rol="medico" AND idsistema='+[id], (err, res) => {
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
Personal.getMedicoAsignado = (idpaciente, idempleado, result) => {
  sql.query('SELECT * FROM tienemedicos WHERE idpaciente= '+[idpaciente]+' AND idempleado= '+[idempleado], (err, res) => {
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

Personal.getEmpleado = (id, result) => {
  sql.query('SELECT * FROM empleado  WHERE idempleado= "' + [id]+'"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      result(null, res[0]);
      return;
    }
    // not found Empleado with the id
    result({ kind: "not_found" }, null);
  });
};

Personal.getMedicoBuscar = (apellido, result) => {
  sql.query('SELECT * FROM empleado WHERE rol="medico" AND apellido="'+[apellido]+'"', (err, res) => {
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

Personal.getJefeBuscar = (apellido, result) => {
  sql.query('SELECT * FROM empleado WHERE rol="jefe" AND apellido="'+[apellido]+'"', (err, res) => {
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