import React, { useEffect, useState } from 'react';
import ProjectItem from '../../components/project-item';
import Modal from '../../components/modal';
import { getAllProjects, updateDonation } from '../../services/project-service';
import { useGetUserData } from '../../utils/helper';
import InputText from '../../components/input-box';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [donationAmount, setDonationAmout] = useState(0);
  
  const userData = useGetUserData();

  const fetchProjects = async () => {
    const response = await getAllProjects();
    console.log('response', response)
    if (response.status === 200) {
      setProjects(response?.projects);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDonate = async (data) => {
    setShowModal(prev => !prev);
    setModalData(data);
    console.log('donate modal', data)
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    try {
      const response = await updateDonation(modalData?._id, donationAmount);
      if (response.status === 200) {
        setShowModal(false);
        setModalData(null);
        setDonationAmout(0);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error while updating donation of project")
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 md:max-w-4xl">
        <div className='flex justify-between mb-4'>
          <h2 className="text-2xl font-bold">All Projects</h2>
          
        </div>
        {projects.map((project) => (
          <ProjectItem key={project._id}
            projectData={project}
            isOwnProject={userData?._id === project.innovator}
            onDonate={handleDonate}
          />
        ))}
      </div>
      {
        showModal &&
        <Modal
          title={`Thank you for your donation to : ${modalData?.title}`}
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
              value={donationAmount}
              onChange={setDonationAmout}
            />
          </div>
        </Modal>
      }
    </>
  );
}

export default ProjectList;
