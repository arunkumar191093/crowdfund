import { useEffect, useState } from 'react';
import imgData from '../../mock-images.json';
import ProgressBar from '../progress-bar';

const ProjectItem = ({
  projectData,
  isOwnProject = false,
  onDonate = () => { }
}) => {

  const [randomImg, setRandomImg] = useState('');

  const getRandomImage = () => {
    const randomIdx = Math.floor(Math.random() * 30)
    setRandomImg(imgData[randomIdx])
  }

  useEffect(() => {
    getRandomImage()
  }, [])

  return (
    <div className="border p-4 mb-4 rounded cursor-pointer hover:shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <img src={randomImg} alt={`project - ${projectData.title}`} />
        <div className="col-span-2 p-4 border-[0.5px] rounded-md border-gray-200">
          <h3 className="text-xl font-bold">{projectData.title}</h3>
          <p>{projectData.description}</p>
          <div className='mt-4'>
            <div> <h4 className='font-bold text-2xl'> INR {projectData.raised}</h4> raised out of <b>INR {projectData.goal}</b></div>
            <ProgressBar
              currentValue={projectData.raised}
              maxValue={projectData.goal} />
          </div>
          {
            !isOwnProject &&
            <button
              onClick={() => onDonate(projectData)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Donate
            </button>
          }

        </div>
      </div>
    </div>
  )
}

export default ProjectItem;