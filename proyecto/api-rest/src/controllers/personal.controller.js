const Personal = require("../models/personal.model.js");

// Find a singlePersonal with a Username anda password
exports.findOne = (req, res) => {
    const { username, password } = req.body;
    Personal.login(username, password, (err, data) => {
      console.log(username, password);
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
