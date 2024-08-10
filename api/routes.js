const UserModel = require('./db/models/user-model');
const ProjectModel = require('./db/models/project-model');
const { handleErrors, isPasswordValid, sortProjects } = require('./utils/helper');

const routes = (app) => {

  app.post('/api/user/create', async (req, res) => {
    try {
      const { email, fullname, role, password } = req.body;
      const user = new UserModel({ email, fullname, role, password });
      await user.save();
      res.status(201).send({
        status: 201,
        message: 'Account created successfully',
        user
      });
    } catch (error) {
      handleErrors(res, error);
    }
  });

  app.post('/api/user/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await UserModel.findOne({ email });
      if (isPasswordValid(userData?.password, password)) {

        res.status(200).send({
          status: 200,
          message: 'Login Successful',
          userData
        });
      } else {
        throw {
          status: 403,
          error: new Error('Invalid email or password.')
        }
      }
    } catch (error) {
      handleErrors(res, error);
    }
  });

  app.get('/api/projects', async (req, res) => {
    const projects = await ProjectModel.find();
    const sortedProjects = sortProjects(projects);
    res.send({
      status: 200,
      projects: sortedProjects
    });
  });

  app.post('/api/projects/create', async (req, res) => {
    try {
      const { title, description, goal, innovator } = req.body;
      const project = new ProjectModel({ title, description, goal, innovator });
      await project.save();
      res.status(201).send({
        status: 201,
        message: 'Project created successfully',
        project
      });
    } catch (error) {
      handleErrors(res, error);
    }

  });

  app.get('/api/projects/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const projects = await ProjectModel.find({ innovator: userId });
      const sortedProjects = sortProjects(projects);
      res.status(200).send({
        status: 200,
        projects: sortedProjects
      });
    } catch (error) {
      handleErrors(res, error);
    }
  });

  app.post('/api/projects/:projectId/donate', async (req, res) => {
    try {
      const { amount } = req.body;
      if (!amount || isNaN(amount)) {
        throw {
          status: 400,
          error: new Error('Amount should be valid and greater than 0')
        }
      }
      const project = await ProjectModel.findById(req.params.projectId);
      project.raised += Number(amount);
      if (project.raised >= project.goal) {
        project.archived = true;
      }
      await project.save();
      res.send({
        status: 200,
        message: 'Donation added successfully',
        project
      });
    } catch (error) {
      handleErrors(res, error);
    }
  });
}

module.exports = routes;