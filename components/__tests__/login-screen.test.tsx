import React from 'react';
import { render, fireEvent, waitFor, userEvent } from '@testing-library/react-native';
import LoginScreen from '../screens/login-screen';
import { Alert } from 'react-native';


describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoginScreen />);
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('Login'));
    await waitFor(() => {
      expect(getByText('You must provide a valid email.')).toBeTruthy();
      expect(getByText('You must provide a valid password.')).toBeTruthy();
    });
  });

  it('shows validation error for invalid email', async () => {
    const { getByText, getByLabelText } = render(<LoginScreen />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    fireEvent.changeText(emailInput, 'not-an-email');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.press(getByText('Login'));
    await waitFor(() => {
      expect(getByText('You must provide a valid email.')).toBeTruthy();
    });
  });

  it('submits form with valid data', async () => {
   
    jest.spyOn(Alert, 'alert').mockImplementation(() => {})

    const { getByRole, getByTestId } = render(<LoginScreen />);
    const emailInput = getByTestId('Email');
    const passwordInput = getByTestId('Password');
    const loginButton = getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.press(loginButton);
    
    await waitFor(() => {
      expect(loginButton).toBeTruthy();
      expect(Alert.alert).toHaveBeenCalledWith(
        JSON.stringify({ email: 'test@example.com', password: '123456' }, null, 2)
      );
    });
  });
}); 