const express= require( 'express');
const bodyParser = require('body-parser');
const app= express();
const cors = require('cors');
const port = 3000;
const config= require('./configs/config');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// listen on the port
app.listen(port);
app.use((error, req, res, next) => {
  res.status(400).json({
      status: 'error',
      message: error.message,
  });
});
//routes
app.use(require('./routes/personal.routes'));

app.get('/', (req, res) => {
    res.send(`Hi! Server is listening on port ${port}`)
  });



