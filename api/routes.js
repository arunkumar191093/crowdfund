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
      const { title, description, goal, innovator, imageUrl } = req.body;
      const project = new ProjectModel({ title, description, goal, innovator, imageUrl });
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
      if (project) {
        const currentVersion = project.__v;
        if (!project.archived) {
          const filter = {
            _id: req.params.projectId,
            __v: currentVersion // Ensure the version matches
          };
          const update = {
            $set: {
              raised: project.raised + Number(amount),
              archived: project.raised + Number(amount) >= project.goal ? true : false,
              __v: currentVersion + 1 // Increment the version
            }
          };

          const result = await ProjectModel.updateOne(filter, update);

          if (result.matchedCount > 0) {
            console.log("Document updated successfully.");
            res.send({
              status: 200,
              message: 'Donation added successfully',
              project: result
            });
          } else {
            console.log("Update failed due to version mismatch.");
            res.send({
              status: 500,
              message: 'Unable to process your donation. Please try again later',
              project: result
            });
          }

        } else {
          res.send({
            status: 200,
            message: 'Thanks for your support. We have already achieved our goal.',
            project
          });
        }
      } else {
        res.send({
          status: 404,
          message: 'Project not found',
          project: null
        });
      }
    } catch (error) {
      console.log('Error in donation', error)
      handleErrors(res, error);
    }
  });
}

module.exports = routes;