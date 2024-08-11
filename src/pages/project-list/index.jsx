import React, { useEffect, useState, lazy, Suspense } from 'react';
import ProjectItem from '../../components/project-item';
import { getAllProjects, updateDonation } from '../../services/project-service';
import {
  useGetUserData,
  useShowSnackbar,
  validateDonation
} from '../../utils/helper';
import SkeletonLoader from '../../components/skeleton-loader';
import { errorMessages } from '../../utils/error-constants';

const Modal = lazy(() => import('../../components/modal'));
const InputText = lazy(() => import('../../components/input-box'));

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setIsloading] = useState(false);
  const [donationAmount, setDonationAmout] = useState(0);

  const userData = useGetUserData();
  const { openSnackbar } = useShowSnackbar();
  const { openSnackbar: successSnackbar } = useShowSnackbar(true);

  const fetchProjects = async () => {
    try {
      setIsloading(true);
      const response = await getAllProjects();
      // Setting this timeout just to show some lateny and loader
      setTimeout(() => {
        setIsloading(false);
        if (response.status === 200) {
          setProjects(response?.projects);
        } else {
          setProjects([]);
          openSnackbar(response?.error || 'Something went wrong while fetching projects')
        }
      }, 1000)
    } catch (error) {
      setIsloading(false);
      openSnackbar(error?.message || 'Something went wrong while fetching projects')
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDonate = async (data) => {
    setShowModal(prev => !prev);
    setModalData(data);
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    try {
      if (validateDonation()) {
        const response = await updateDonation(modalData?._id, donationAmount);
        if (response.status === 200) {
          setShowModal(false);
          setModalData(null);
          setDonationAmout(0);
          fetchProjects();
          successSnackbar(response?.message);
        } else {
          openSnackbar(response?.error || 'Something went wrong while fetching projects')
        }
      } else {
        openSnackbar(errorMessages.INVALID_DONATION)
      }
    } catch (error) {
      setIsloading(false);
      console.error("Error while updating donation of project")
      openSnackbar(error?.message || 'Something went wrong while fetching projects')
    }
  }

  return (
    <>
      <div className="mx-16 mt-10 pb-24">
        <div className='flex justify-between mb-4'>
          <h2 className="text-2xl font-bold">All Projects</h2>
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
          {!loading && projects?.map((project) => (
            <ProjectItem key={project._id}
              projectData={project}
              isOwnProject={userData?._id === project.innovator}
              onDonate={handleDonate}
            />
          ))}
        </div>
      </div>
      {
        showModal &&
        <Suspense fallback={<div>Please wait ...</div>}>
          <Modal
            title={`Thank you for your donation to : ${modalData?.title}`}
            disableSuccess={donationAmount <= 0}
            onClose={() => setShowModal(false)}
            onSuccess={handleSubmitDonation}
          >
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div className="mt-2">
                <p className="text-sm text-gray-500">Please enter the amount you would like to donate.</p>
              </div>
              <InputText
                placeholder="Enter the donation amount here"
                type="number"
                inputClass="w-full my-4 px-3 py-2 border rounded"
                isRequired
                dis
                value={donationAmount}
                onChange={setDonationAmout}
              />
            </div>
          </Modal>
        </Suspense>
      }
    </>
  );
}

export default ProjectList;
