import {act} from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/crowdfunding/i);
  expect(linkElement).toBeInTheDocument();
});
