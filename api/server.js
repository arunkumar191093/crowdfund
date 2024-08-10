const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/mongo');
const cors = require("cors");
const routes = require('./routes');

const app = express();
app.use(cors())
app.use(bodyParser.json());

routes(app);

var server = app.listen(3002, () => {
  var host = server.address().address
  var port = server.address().port

  console.log("App listening at " + host + ":" + port)
});
