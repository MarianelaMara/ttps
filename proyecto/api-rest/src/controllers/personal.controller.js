const Personal = require("../models/personal.model.js");

// Find a singlePersonal with a Username anda password
exports.findOne = (req, res) => {
    const { username, password } = req.body;
    Personal.login(username, password, (err, data) => {
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
        } else res.send(data);
      });
};
exports.getEmpleado = (req, res) => {
  const  id = req.params.id;
  Personal.getEmpleado(id, (err, data) => {
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
      } else res.send(data);
    });
};
exports.getAllJefes = (req, res) => {
  Personal.getAllJefes((err, data) => {
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

exports.getAllMedicos = (req, res) => {
  Personal.getAllMedicos((err, data) => {
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
exports.getMedicosSistema = (req, res) => {
  const  id = req.params.id;
  Personal.getMedicosSistema(id,(err, data) => {
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

exports.getMedicoBuscar = (req, res) => {
  const  {nombre, apellido} = req.body;
  Personal.getMedicoBuscar(nombre, apellido, (err, data) => {
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
      } else res.send(data);
    });
};
exports.getMedicoAsignado = (req, res) => {
  const  {idpaciente, idempleado} = req.body;
  Personal.getMedicoAsignado(idpaciente, idempleado, (err, data) => {
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
      } else res.send(data);
    });
};
exports.getJefeBuscar = (req, res) => {
  const  {nombre, apellido} = req.body;
  Personal.getJefeBuscar(nombre, apellido, (err, data) => {
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
      } else res.send(data);
    });
};