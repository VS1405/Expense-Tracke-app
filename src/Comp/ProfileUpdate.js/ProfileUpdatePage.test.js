import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileUpdatePage from './ProfileUpdatePage';



describe('ProfileUpdatePage component', () => {
  test('renders header text and cancel button', () => {
    render(<ProfileUpdatePage />);

    // Assertions
    const headerText = screen.getByText("Winners never quite, Quitters never win");
    expect(headerText).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument()

    // Simulate a click on the cancel button
    fireEvent.click(cancelButton);

    // Check if the form is cleared after clicking the cancel button
    const nameInput = screen.getByLabelText('Full Name');
    expect(nameInput.value).toBe('');

    const profileUrlInput = screen.getByLabelText('Profile photo Url');
    expect(profileUrlInput.value).toBe('');
  });
});
