import React, { useEffect, useState } from 'react';
import ProjectItem from '../../components/project-item';
import Modal from '../../components/modal';

const mockData = [
  {
    title: 'Project 1',
    description: 'Project 1 desc',
    goal: 1000,
    raised: 500,
    innovator: 'user id',
    archived: false
  },
  {
    title: 'Project 2',
    description: 'Project 2 desc',
    goal: 1001,
    raised: 750,
    innovator: 'user id 2',
    archived: false
  }
]

const ProjectList = () => {
  const [projects, setProjects] = useState(mockData);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [donationAmount, setDonationAmout] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleDonate = async (data) => {
    setShowModal(prev => !prev);
    setModalData(data);
    console.log('donate modal', data)
    // const amount = prompt('Enter donation amount:');
    // const response = await fetch(`/api/projects/${projectId}/donate`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount })
    // });
    // if (response.ok) {
    //   alert('Donation successful!');
    // } else {
    //   alert('Error processing donation');
    // }
  };

  const handleSubmitDonation = (data) => {
    console.log('handleSubmitDonation', data)
  }

  const handleProjectCreation = (data) => {
    console.log('handleProjectCreation', data)
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10 md:max-w-4xl">
        <div className='flex justify-between mb-4'>
          <h2 className="text-2xl font-bold">All Projects</h2>
          <button type="button" className="w-full rounded-md bg-gray-200 px-3 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100 sm:ml-3 sm:w-auto"
            onClick={() => setShowCreateModal(true)}
          >Create Project</button>
        </div>
        {projects.map((project) => (
          <ProjectItem key={project.innovator}
            projectData={project}
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
            <input type="number" className="w-full my-4 px-3 py-2 border rounded"
              placeholder='Enter the donation amount here'
              min={0}
              value={donationAmount}
              onChange={(e) => setDonationAmout(e.target.value)}
            />
          </div>
        </Modal>
      }

      {
        showCreateModal &&
        <Modal
          title='Create a new project'
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleProjectCreation}
        >
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">

            <div className="w-full flex flex-col items-center">
              <div className="my-4" >
                <label className="block text-gray-700">Project Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Funding Goal</label>
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>
        </Modal>
      }
    </>
  );
}

export default ProjectList;
