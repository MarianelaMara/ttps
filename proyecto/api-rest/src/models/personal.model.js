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
  this.idpersona = p.idpersona
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
  sql.query('SELECT * FROM personal INNER JOIN persona ON personal.idpersona = persona.idpersona WHERE usuario="'+ [usuario] + '" AND contraseña="'+ [contraseña]  + '"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found personal: ", res[0]);
      const personal = new Personal({
        token: createToken(res[0]),
        nombre: res[0].nombre,
        apellido: res[0].apellido,
        rol: res[0].rol,
        idsistema: res[0].idsistema,
        idpersona: res[0].idpersona
      });
      result(null, personal);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
Personal.getAllJefes = (result) => {
  sql.query('SELECT * FROM personal INNER JOIN persona ON personal.idpersona = persona.idpersona WHERE rol="jefe"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res);
      return; 
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
}



module.exports = Personal;