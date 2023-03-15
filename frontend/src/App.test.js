import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SignUpPage from './pages/SignUpPage';

describe('SignUpPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SignUpPage />);

    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<SignUpPage onClick={handleClick} />);
    const button = getByText('Sign Up');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});