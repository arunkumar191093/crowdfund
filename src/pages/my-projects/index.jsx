import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useGetUserData } from '../../utils/helper';
import { getProjectForUser, createProject } from '../../services/project-service';
import ProjectItem from '../../components/project-item';
import SkeletonLoader from '../../components/skeleton-loader';
import { useShowSnackbar, validateProjectData } from '../../utils/helper';
import { errorMessages } from '../../utils/error-constants';
import imgData from '../../mock-images.json';

const Modal = lazy(() => import('../../components/modal'));
const InputText = lazy(() => import('../../components/input-box'));

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const userData = useGetUserData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setIsloading] = useState(false);
  const { openSnackbar } = useShowSnackbar();
  const { openSnackbar: successSnackbar } = useShowSnackbar(true);

  const fetchMyProjects = async () => {
    try {
      setIsloading(true);
      const response = await getProjectForUser(userData?._id);
      setTimeout(() => {
        setIsloading(false);
        if (response.status === 200) {
          setProjects(response?.projects);
        } else {
          setProjects([]);
          openSnackbar(response?.error || 'Something went wrong.')
        }
      }, 1000)
    } catch (error) {
      setIsloading(false);
      openSnackbar(error?.message || 'Something went wrong.')
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const getRandomImage = () => {
    const randomIdx = Math.floor(Math.random() * 30)
    return imgData[randomIdx];
  }

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const req = {
        title,
        description,
        goal,
        innovator: userData?._id,
        imageUrl: getRandomImage()
      }
      if (validateProjectData(req)) {
        const response = await createProject(req);
        if (response.status === 201) {
          resetProjectForm();
          fetchMyProjects();
          successSnackbar(response?.message);
        } else {
          openSnackbar(response?.error || 'Something went wrong.')
        }
      } else {
        openSnackbar(errorMessages.MISSING_PROJECT_DATA)
      }
    } catch (error) {
      setIsloading(false);
      console.error("Error while creating project")
      openSnackbar(error?.message || 'Error while creating project')
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
      <div className="mx-16 mt-10 pb-24">
        <div className='flex flex-col sm:flex-row justify-between mb-4'>
          <h2 className="text-2xl font-bold">My Projects</h2>
          <button type="button" className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 sm:ml-3 sm:w-auto"
            onClick={() => setShowCreateModal(true)}
          >Create Project
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {
            loading &&
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          }
          {!loading && projects.map((project) => (
            <ProjectItem key={project._id}
              isOwnProject={true}
              projectData={project}
            />
          ))}
        </div>
        {
          !loading && !projects?.length &&
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

      </div>
      {
        showCreateModal &&
        <Suspense fallback={<div>Please wait ...</div>}>
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
        </Suspense>
      }
    </>
  );
}

export default MyProjects;
