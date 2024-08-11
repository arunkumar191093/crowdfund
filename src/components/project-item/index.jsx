import ProgressBar from '../progress-bar';

const ProjectItem = ({
  projectData,
  isOwnProject = false,
  onDonate = () => { }
}) => {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl my-3">
      <img className='w-full max-h-64' src={projectData.imageUrl} alt={`project - ${projectData.title}`} />
      <div className='px-6 pb-4'>
        <div className="py-4">
          <div className="font-bold text-xl mb-2" data-testid="project-item-title">{projectData.title}</div>
          <p className="text-gray-700 text-base line-clamp-3" title={projectData.description}
            data-testid="project-item-desc"
          >
            {projectData.description}
          </p>
        </div>
        <div className='mt-4 '>
          <div> <h4 className='font-bold text-2xl'> INR {projectData.raised}</h4> raised out of <b>INR {projectData.goal}</b></div>
          <ProgressBar
            currentValue={projectData.raised}
            maxValue={projectData.goal} />
        </div>
        <div className="px-6 pt-4 pb-2">
          {
            projectData.archived &&
            <div className="text-md text-green-700 font-semibold text-center pt-2">
              Hurray 🎉!! We have reached the goal.
            </div>
          }
          {
            (!isOwnProject && !projectData.archived) &&
            <button
              onClick={() => onDonate(projectData)}
              data-testid="donate-btn"
              className="bg-gray-600 w-full text-white px-4 py-2 rounded mt-2"
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