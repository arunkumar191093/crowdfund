import mockProjectData from '../mocks/mock-project-data.json';
import { render, screen } from '@testing-library/react';
import ProjectItem from '../../components/project-item';

describe('ProjectItem component', () => {

  test('should render projectItem with valid data', () => {
    const mockProjectItemData = mockProjectData[0]
    render(<ProjectItem
      projectData={mockProjectItemData}
    />)
    expect(screen.getByTestId("project-item-title")).toHaveTextContent('Mock project 1')
    expect(screen.getByTestId("project-item-desc")).toHaveTextContent('Mock project 1 desc')
  })

})