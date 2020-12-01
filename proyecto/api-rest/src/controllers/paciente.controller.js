const Paciente = require("../models/paciente.model.js");
const Sistema = require("../models/sistema.model.js");

exports.getAllPacientes = (req, res) => {
    Paciente.getAllPacientes((err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving  "
            });
          }
        } else res.json(data);
      });
  };
  exports.getPacientesSistema = (req, res) => {
    const id = req.params.id;
    Paciente.getPacientesSistema(id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving  "
            });
          }
        } else res.json(data);
      });
  };
exports.getPaciente = (req, res) => {
    const  id = req.params.id;
    Paciente.getPaciente(id, (err, data) => {
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
exports.asignarMedico = (req, res) => {
  const  {idpaciente, idempleado, idjefe} = req.body;
  Paciente.asignarMedico(idpaciente, idempleado, idjefe, (err, data) => {
    if (err) {
      res.status(404).send({
          message: `No se pudo asignar médico` + err
      }); 
    } else res.send(data);
  });
};
exports.getPacienteDni = (req, res) => {
  const  dni = req.body.dni;
  Paciente.getPacienteDni(dni, (err, data) => {
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
exports.addPaciente = (req, res) => {
  const { dni, nombre, apellido, domicilio, fechanac, telefono,antecedentes, obrasocial, nombrecontacto, parentesco, telefonocontacto } = req.body;
  Sistema.getCamaLibre(1, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No hay lugar en guardia para ingresar al paciente`
        });
      } else {
        res.status(500).send({
          message: "Error servidor  "
        });
      }
    }else {
      Paciente.addPaciente(dni, nombre, apellido, domicilio, fechanac, telefono,antecedentes, obrasocial, nombrecontacto, parentesco, telefonocontacto, (err, dataDos) => {
        if (err) {
          res.status(404).send({
          message: `No se pudo agregar el paciente`
          });
        } else {
            Sistema.ocuparCama(data.idcama, dataDos.idpaciente, (errC) => {
              if (errC) {
                  res.status(404).send({
                    message: `No se puede ocupar la cama`
                  });
              }
            });
            Sistema.asignarJefeaPaciente(dataDos.idpaciente, 1, (errJ) => {
              if (errJ) {
                if (errJ.kind === "not_found") {
                  res.status(404).send({
                    message: `No se puede asignar jefe al paciente`
                  });
                } else {
                  res.status(500).send({
                    message: "Error servidor  "
                  });
                }
              } 
            });
            var datos = {
              idpaciente: dataDos.idpaciente,
              nombre: dataDos.nombre,
              apellido: dataDos.apellido,
              dni: dataDos.dni,
              domicilio: dataDos.domicilio,
              fechanac: dataDos.fechanac,
              telefono: dataDos.telefono,
              idsistema: dataDos.idsistema,
              antecedentes: dataDos.antecedentes,
              obrasocial: dataDos.obrasocial,
              nombrecontacto: dataDos.nombrecontacto,
              telefonocontacto: dataDos.telefonocontacto,
              parentesco: dataDos.parentesco,
              nombresala: data.nombresala,
              numerodecama:data.numero
            }
            res.send(datos);
        }
      });
    }
  });
};