const Sistema = require("../models/sistema.model.js");
const Paciente = require("../models/paciente.model.js");

//devuelve las salas de un sistema
exports.getSalas = (req, res) => {
    const  id = req.params.id;
    Sistema.getSalas(id, (err, data) => {
        if (err) {
            res.status(500).send({
              message: "Error servidor  "
            });
        } else res.send(data);
      });
};
//devuelve la configuracion actual de las camas de guardia
exports.config = (req, res) => {
  Sistema.config((err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
    });
};
//cambia la configuracion actual de las camas de guardia
exports.cambiarconfig = (req, res) => {
  Sistema.cambiarconfig((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se pude cambiar la configuración`
        });
      } else {
        res.status(500).send({
          message: "Error servidor  "
        });
      }
    } else res.send(data);
  });
};
//devuelve el nombre de una sala
exports.getNombreSala = (req, res) => {
  const  id = req.params.id;
  Sistema.getNombreSala(id, (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
    });
};
//devuelve la cantidad de salas de un siste,a
exports.getCantidadSalas = (req, res) => {
  const  id = req.params.id;
  Sistema.getCantidadSalas(id, (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
  });
};
//devuelve la cantidad total de camas de un sistema
exports.getCantidadCamasSistema = (req, res) => {
  const  id = req.params.id;
  Sistema.getCantidadCamasSistema(id, (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
  });
};
//devuelve la cantidad de camas ocupadas de un sistema
exports.getCantidadCamasOcupadasSistema = (req, res) => {
  const  id = req.params.id;
  Sistema.getCantidadCamasOcupadasSistema(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No hay camas ocupadas en el sistema`
          });
        } else {
          res.status(500).send({
            message: "Error servidor  "
          });
        }
      } else res.send(data);
  });
};

//devuelve el nombre del sistema
exports.getSistema = (req, res) => {
  const  id = req.params.id;
  Sistema.getSistema(id, (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
    });
};
//devuelve las camas de un sala
exports.getCamas = (req, res) => {
  const  id = req.params.id;
  Sistema.getCamas(id, (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
    });
};
exports.info = (req, res) => {
  const  id = req.params.id;
  Sistema.info(id, (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
    });
};
//devuelve la cantidad de camas de una sala
exports.getCantidadCamas = (req, res) => {
  const  id = req.params.id;
  Sistema.getCantidadCamas(id, (err, data) => {
      if (err) {
          res.status(500).send({
            message: "Error servidor  "
          });
      } else res.send(data);
  });
};
//devuelve la cantidad de camas ocupadas de una sala
exports.getCantidadCamasOcupadas = (req, res) => {
  const  id = req.params.id;
  Sistema.getCantidadCamasOcupadas(id, (err, data) => {
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
      } else res.send(data);
  });
};
//cambia de sistema a un paciente, consulta si hay cama libre en el sistema al que lo quiere cambiar
//Si hay cama libre, la ocupa, desocupa la cama anterior
//Borra los medicos que tenía asignados y asigna como medico al jefe del sistema nuevo
exports.getCambioSistema = (req, res) => {
  const  {idsistemaactual, idsistema, idpaciente} = req.body;
    Sistema.getCamaLibre(idsistema, (err, data) => {
      //si hay err
      if (err) {
        //si no hay camas libres 
        if (err.kind === "not_found"){
          //si tiene que pasara a guardia
          if (idsistema === 1){
            Sistema.config((error, data) => {
              if (error) {
                res.status(500).send({
                  message: "Error servidor  "
                });
              }else{
                //si la configuracion es de camas limitadas
                if(data.camasinfinitas=== "0"){ 
                  res.status(404).send({
                    message: `No hay lugar en guardia`
                  });
                 }
                else{
                  //si la configuracion es ilimitada
                  if (idsistemaactual === 4){
                    Sistema.desocuparCamaCasa(idpaciente, (errD) => {
                      if (errD) {
                        res.status(404).send({
                          message: `No se puede desocupar la cama`
                        });
                      }
                    });
                  }else{
                    Sistema.desocuparCama(idpaciente, (errD) => {
                      if (errD) {
                        res.status(404).send({
                          message: `No se puede desocupar la cama`
                        });
                      }
                    });
                  }
                  
                  Sistema.borrarMedicosAsignados(idpaciente, (errM) => {
                    if (errM) {
                      res.status(404).send({
                        message: `No se pueden borrar los médicos asignados`
                      });
                    }
                  });
                  Sistema.asignarJefeaPaciente(idpaciente, idsistema, (errP) => {
                    if (errP) {
                      if (errP.kind === "not_found") {
                        res.status(404).send({
                          message: `No se puede asignar jefe`
                        });
                      } else {
                        res.status(500).send({
                          message: "Error servidor  "
                        });
                      }
                    }
                  });
                  Paciente.cambiarSistema(idsistema, idpaciente, () => {});
                  Sistema.ocuparCamaIlimitada(idpaciente, (errC, dataCama) => {
                    if (errC) {
                        res.status(404).send({
                          message: `No se puede ocupar la cama`
                        });
                    }
                    else {
                      var datos= {
                        numerocama: dataCama,
                        nombresala: 11
                      }
                      res.send(datos);
                    }
                  });
                }
              }
            });
          //si no hay camas y quiero cambiarlo a casa
          }else {
            if(idsistema === 4 ){
              Sistema.desocuparCama(idpaciente, (errD) => {
                if (errD) {
                  res.status(404).send({
                    message: `No se puede desocupar la cama`
                  });
                }
              });
              Sistema.ocuparCamaCasa(idpaciente, (errD) => {
                if (errD) {
                  res.status(404).send({
                    message: `No se puede desocupar la cama`
                  });
                }
              });
              Sistema.borrarMedicosAsignados(idpaciente, (errM) => {
                if (errM) {
                  res.status(404).send({
                    message: `No se pueden borrar los médicos asignados`
                  });
                }
              });
              Sistema.asignarJefeaPaciente(idpaciente, idsistema, (errP) => {
                if (errP) {
                  if (errP.kind === "not_found") {
                    res.status(404).send({
                      message: `No se puede asignar jefe`
                    });
                  } else {
                    res.status(500).send({
                      message: "Error servidor  "
                    });
                  }
                }
              });
              Paciente.cambiarSistema(idsistema, idpaciente, () => {});
              var datos= {
                numerocama: 1,
                nombresala: 'Domicilio'
              }
              res.send(datos);
            }else{
              res.status(404).send({
                message: `No hay camas libres en el sistema`
              });   
            }
          }
        } else {
          res.status(500).send({
            message: "Error servidor  "
          });
        }
    }//si hay camas disponibles
     else{
      if (idsistemaactual === 4){
        Sistema.desocuparCamaCasa(idpaciente, (errD) => {
          if (errD) {
            res.status(404).send({
              message: `No se puede desocupar la cama`
            });
          }
        });
      }else{
        Sistema.desocuparCama(idpaciente, (errD) => {
          if (errD) {
            res.status(404).send({
              message: `No se puede desocupar la cama`
            });
          }
        });
      }
        Sistema.ocuparCama(data.idcama, idpaciente, (errC) => {
          if (errC) {
            res.status(404).send({
              message: `No se puede ocupar la cama`
            });
          }
        });
        Sistema.borrarMedicosAsignados(idpaciente, (errM) => {
          if (errM) {
            res.status(404).send({
              message: `No se pueden borrar los médicos asignados`
            });
          }
        });
        Sistema.asignarJefeaPaciente(idpaciente, idsistema, (errP) => {
          if (errP) {
            if (errP.kind === "not_found") {
              res.status(404).send({
                message: `No se puede asignar jefe`
              });
            } else {
              res.status(500).send({
                message: "Error servidor  "
              });
            }
          }
        });
        Paciente.cambiarSistema(idsistema, idpaciente, () => {});
        var datos= {
          numerocama: data.numero,
          nombresala: data.nombresala
        }
        res.send(datos);
      }
    });
};