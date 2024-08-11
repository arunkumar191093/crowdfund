import { act } from 'react';
import mockProjectData from '../mocks/mock-project-data.json';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectItem from '../../components/project-item';

describe('ProjectItem component', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render projectItem with valid data', () => {
    const mockProjectItemData = mockProjectData[0]
    render(<ProjectItem
      projectData={mockProjectItemData}
    />)
    expect(screen.getByTestId("project-item-title")).toHaveTextContent('Mock project 1')
    expect(screen.getByTestId("project-item-desc")).toHaveTextContent('Mock project 1 desc')
  })

  test('should not render donate button if own project', () => {
    const mockProjectItemData = mockProjectData[0]
    render(<ProjectItem
      isOwnProject={true}
      projectData={mockProjectItemData}
    />)
    expect(screen.queryByTestId("donate-btn")).not.toBeInTheDocument();
  })

  test('should invoke donate button callback with current data', async () => {
    const mockProjectItemData = mockProjectData[0]
    const mockDonateFn = jest.fn();

    render(<ProjectItem
      projectData={mockProjectItemData}
      onDonate={mockDonateFn}
    />)

    await act(async () => {
      fireEvent.click(screen.getByTestId('donate-btn'))
    })
    expect(mockDonateFn).toHaveBeenCalled();
  })

  test('should render reached goal message', () => {
    const mockProjectItemData = mockProjectData[0]
    mockProjectItemData.archived = true;
    render(<ProjectItem
      isOwnProject={true}
      projectData={mockProjectItemData}
    />)
    expect(screen.getByText("Hurray 🎉!! We have reached the goal.")).toBeInTheDocument();
  })

})