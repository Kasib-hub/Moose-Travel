import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';

describe('SignUpPage', () => {
  it('renders correctly', () => {
    const { getByText } 
    = render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<SignUpPage />}/>
        </Routes>
      </BrowserRouter>
    );

    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<SignUpPage handleSubmit={handleClick} />);
    const button = getByText('Sign Up');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});