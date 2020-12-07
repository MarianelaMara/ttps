const sql = require("../database.js");


const Paciente = function(p) {
  this.idpaciente = p.idpaciente;
  this.nombre = p.nombre;
  this.apellido = p.apellido;
  this.dni = p.dni;
  this.domicilio = p.domicilio;
  this.fechanac = p.fechanac;
  this.telefono = p.telefono;
  this.idsistema = p.idsistema;
  this.antecedentes = p.antecedentes;
  this.obrasocial = p.obrasocial;
  this.nombrecontacto = p.nombrecontacto;
  this.telefonocontacto= p.telefonocontacto;
  this.parentesco = p.parentesco
};
//devuelve todos los pacientes
Paciente.getAllPacientes = (result) => {
    sql.query('SELECT * FROM paciente', (err, res) => {
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
//devuelve un paciente con id
Paciente.getPaciente = (id, result) => {
    sql.query('SELECT * FROM paciente WHERE idpaciente = ' + [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found Paciente with the id
      result({ kind: "not_found" }, null);
    });
};
//devuelve los pacientes de un sistema en particular
Paciente.getPacientesSistema = (id, result) => {
  sql.query('SELECT * FROM paciente WHERE idsistema = ' + [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
    // not found Pacientes
    result({ kind: "not_found" }, null);
  });
};
//devuelve un paciente con dni
Paciente.getPacienteDni = (dni, result) => {
  sql.query('SELECT * FROM paciente WHERE dni = ' + [dni], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
    // not found Paciente with the dni
    result({ kind: "not_found" }, null);
  });
};
//devuelve los medicos asociados a un paciente
Paciente.getMedicosPaciente = (idpaciente, result) => {
  sql.query('SELECT idempleado FROM tienemedicos WHERE idpaciente = ' + [idpaciente], (err, res) => {
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
Paciente.asignarMedico = (idpaciente, idempleado, idjefe, result) => {
  sql.query('INSERT INTO tienemedicos (idpaciente, idempleado) VALUES ('+[idpaciente]+', ' + [idempleado]+')', (err, res) => {
    if (err) {
      console.log("error al asignar médico: ", err);
      result(err, null);
      return;
    } 
    else {
      result(null, res);
      return;
    };
  });
};  
//agregar un paciente
Paciente.addPaciente = (dni, nombre, apellido, domicilio, fechanac, telefono,antecedentes, obrasocial, nombrecontacto, parentesco, telefonocontacto, result) => {
  sql.query('INSERT INTO paciente (`idsistema`, `nombre`, `apellido`, `dni`, `domicilio`, `fechanac`, `telefono`, `antecedentes`, `obrasocial`, `nombrecontacto`, `telefonocontacto`, `parentesco`) VALUES ("1", "' + [nombre] + '", " ' + [apellido] + '", "' + [dni] + '", "' + [domicilio] + '", "' + [fechanac] +'", "' + [telefono] +'", "' + [antecedentes] +'", "' + [obrasocial] +'", "' + [nombrecontacto] +'", "' + [telefonocontacto] +'", "' + [parentesco] +'")' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    else {
      const paciente = new Paciente({
        idpaciente: res.insertId,
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        idsistema: "1",
        domicilio: domicilio,
        fechanac: fechanac,
        telefono: telefono,
        antecedentes: antecedentes,
        obrasocial: obrasocial,
        nombrecontacto: nombrecontacto,
        telefonocontacto: telefonocontacto,
        parentesco: parentesco
      });
      result(null, paciente);
      return;
    }
  });
};
//cambia el idsistema del paciente
Paciente.cambiarSistema = (idsistema, idpaciente, result) => {
  sql.query('UPDATE paciente SET idsistema = ' + [idsistema]+ ' WHERE (idpaciente = '+[idpaciente]+')', (err, res) => {
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


module.exports = Paciente;