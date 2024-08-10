import React, { useEffect, useState } from 'react';
import { useGetUserData } from '../../utils/helper';
import { getProjectForUser, createProject } from '../../services/project-service';
import ProjectItem from '../../components/project-item';
import InputText from '../../components/input-box';
import Modal from '../../components/modal';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const userData = useGetUserData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchMyProjects = async () => {
    const response = await getProjectForUser(userData?._id);
    if (response.status === 200) {
      setProjects(response?.projects);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const req = {
        title,
        description,
        goal,
        innovator: userData?._id
      }
      const response = await createProject(req);
      if (response.status === 201) {
        resetProjectForm();
        fetchMyProjects();
      }
    } catch (error) {
      console.error("Error while creating project")
    }
  }

  const resetProjectForm = () => {
    setTitle('');
    setDescription('');
    setGoal('');
    setShowCreateModal(false);
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 md:max-w-4xl">
        <div className='flex justify-between mb-4'>
          <h2 className="text-2xl font-bold">My Projects</h2>
          <button type="button" className="w-full rounded-md bg-gray-200 px-3 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 sm:ml-3 sm:w-auto"
            onClick={() => setShowCreateModal(true)}
          >Create Project</button>
        </div>
        {
          !projects?.length &&
          <div className="flex flex-col items-center justify-center m-24">
            <h1 className="font-extrabold text-6xl">Howdy!</h1>
            <p className="font-medium text-3xl">
              You do not have any projects created yet.
            </p>
            <p className="font-medium text-3xl">
              Please create and request for donation.
            </p>
          </div>
        }
        {projects.map((project) => (
          <ProjectItem key={project._id}
            isOwnProject={true}
            projectData={project}
          />
        ))}
      </div>
      {
        showCreateModal &&
        <Modal
          title='Create a new project'
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateProject}
        >
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <div className="w-full flex flex-col">
              <InputText
                label="Project Title"
                placeholder="Enter project title"
                inputClass="w-full px-3 py-2 border rounded"
                isRequired
                value={title}
                onChange={setTitle}
              />
              <div className="my-2">
                <label className="font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-md block w-full my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                  required
                />
              </div>
              <InputText
                label="Funding Goal"
                type='number'
                placeholder="Enter funding goal"
                inputClass="w-full px-3 py-2 border rounded"
                isRequired
                value={goal}
                onChange={setGoal}
              />
            </div>
          </div>
        </Modal>
      }
    </>
  );
}

export default MyProjects;
