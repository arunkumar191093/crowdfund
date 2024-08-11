import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectList from '../../pages/project-list';
import { getAllProjects, updateDonation } from '../../services/project-service';
import { useGetUserData, useShowSnackbar, validateDonation } from '../../utils/helper';
import mockProjectData from '../mocks/mock-project-data.json';

// Mock necessary services and hooks
jest.mock('../../services/project-service');
jest.mock('../../utils/helper');

const mockShowSnackbar = jest.fn();
jest.mock('react-simple-snackbar', () => ({
  useSnackbar: () => {
    return [
      mockShowSnackbar
    ]
  }
}));

describe('ProjectList Component', () => {
  beforeEach(() => {
    useGetUserData.mockReturnValue({ _id: 'user1' });
    useShowSnackbar.mockReturnValue({ openSnackbar: mockShowSnackbar });
    getAllProjects.mockResolvedValue({ status: 200, projects: mockProjectData });
    updateDonation.mockResolvedValue({ status: 200, message: 'Donation successful' });
    validateDonation.mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render skeleton loader', async () => {
    render(<ProjectList />);

    expect(screen.getAllByTestId('skeleton-loader')).toHaveLength(3);
    await waitFor(() => expect(getAllProjects).toHaveBeenCalled());
  });

  test('should render projects after fetching', async () => {

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    render(<ProjectList />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('project-item-title')[0]).toHaveTextContent('Mock project 1');
    });
  });

  test('should render donation modal', async () => {

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    render(<ProjectList />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    
    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId('donate-btn')[0]);
      expect(screen.getByText('Please enter the amount you would like to donate.')).toBeInTheDocument();
    });
  });

});
