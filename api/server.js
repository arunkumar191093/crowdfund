const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/mongo');
const UserModel = require('./db/models/user-model');
const ProjectModel = require('./db/models/project-model');

const app = express();
app.use(bodyParser.json());

app.post('/api/projects/create', async (req, res) => {
  const { title, description, goal } = req.body;
  const project = new ProjectModel({ title, description, goal });
  await project.save();
  res.status(201).send(project);
});

app.post('/api/user/create', async (req, res) => {
  const { email, fullname, role } = req.body;
  console.log('create user', email, fullname, role)
  const user = new UserModel({ email, fullname, role });
  await user.save();
  res.status(201).send(user);
});

app.get('/api/projects', async (req, res) => {
  const projects = await ProjectModel.find();
  res.send(projects);
});

app.post('/api/projects/:projectId/donate', async (req, res) => {
  const { amount } = req.body;
  const project = await ProjectModel.findById(req.params.projectId);
  project.raised += Number(amount);
  if (project.raised >= project.goal) {
    // Archiving logic
    project.archived = true;
  }
  await project.save();
  res.send(project);
});

var server = app.listen(3002, () => {
  var host = server.address().address
  var port = server.address().port

  console.log("App listening at " + host + ":" + port)
});
