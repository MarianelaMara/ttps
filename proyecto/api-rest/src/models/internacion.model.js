const sql = require("../database.js");


const Internacion = function(p) {
  this.idpaciente = p.idpaciente;
  this.fecha = p.fecha;
  this.fechasintomas = p.fechasintomas;
  this.fechadiagnostico = p.fechadiagnostico;
  this.enfermedadactual = p.enfermedadactual;
  this.fechaegreso = p.fechaegreso;
  this.fechaobito = p.fechaobito;
};

Internacion.getInternacion = (id, result) => {
    sql.query('SELECT * FROM internacion WHERE idpaciente = ' + [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res);
        return;
      }
      // not found Internacion with the id
      result({ kind: "not_found" }, null);
    });
};
  
Internacion.addInternacion = (idpaciente, fechaactual,fechasintomas, fechadiagnostico, enfermedadactual,  result) => {
  sql.query('INSERT INTO internacion (`idpaciente`, `fecha`, `fechasintomas`, `fechadiagnostico`, `enfermedadactual`) VALUES ("' + [idpaciente] + '", " ' +[fechaactual]+'", "' + [fechasintomas] + '", "' + [fechadiagnostico] + '", "' + [enfermedadactual] +'")' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    else {
      const internacion = new Internacion({
        fecha: fechaactual,
        fechasintomas: fechasintomas,
        fechadiagnostico: fechadiagnostico,
        enfermedadactual: enfermedadactual,
      });
      result(null, internacion);
      return;
    }
});
};

Internacion.getInternacion = (id, result) => {
  sql.query('SELECT * FROM internacion WHERE idpaciente = ' + [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
    // not found Paciente with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = Internacion;