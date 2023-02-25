import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateAccount from './index';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test Page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/signup/create-account',
    state: { email: '11@qq.com' },
  }),
}));

test('renders CreateAccount page', async () => {
  renderWithRouter(<CreateAccount />, { route: '/signup/create-account' });
  const emailInput: HTMLInputElement = await screen.findByLabelText('Email');
  const emailLabel: HTMLLabelElement = await screen.findByText('Email');
  const passwordInput: HTMLInputElement = await screen.findByLabelText('Create password');
  const passwordLabel: HTMLLabelElement = await screen.findByText('Create password');
  const confirmPasswordInput: HTMLInputElement = await screen.findByLabelText('Confirm password');
  const confirmPasswordLabel: HTMLLabelElement = await screen.findByText('Confirm password');
  const nextButton: HTMLButtonElement = await screen.findByRole('button');

  expect(emailInput).toBeInTheDocument();
  expect(emailLabel).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(confirmPasswordLabel).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  // check the status
  expect(emailInput.value).toBe('11@qq.com');
  expect(emailInput).toBeDisabled();
  expect(nextButton).toBeDisabled();
  const validationElement = screen.queryByText('Passwords must match');
  expect(validationElement).not.toBeInTheDocument();

  // check password creation, not matching passwords
  await act(() => fireEvent.change(passwordInput, { target: { value: '123' } }));
  expect(passwordInput.value).toBe('123');
  await act(() => fireEvent.change(confirmPasswordInput, { target: { value: '1234' } }));
  expect(confirmPasswordInput.value).toBe('1234');
  await act(() => fireEvent.click(nextButton));
  const validationElement1 = screen.queryByText('Passwords must match');
  expect(validationElement1).toBeInTheDocument();
});
