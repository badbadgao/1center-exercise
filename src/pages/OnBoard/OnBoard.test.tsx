import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import OnBoard from './index';
import { BrowserRouter } from 'react-router-dom';

test('renders onboard page', async () => {
  render(<OnBoard />, { wrapper: BrowserRouter });
  const emailInput: HTMLInputElement = await screen.findByLabelText('Email');
  const emailLabel: HTMLLabelElement = await screen.findByText('Email');
  const nextButton: HTMLButtonElement = await screen.findByRole('button');
  const validationElement = screen.queryByText('Please input a valid email');
  expect(emailLabel).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(emailInput.value).toBe('');
  expect(nextButton).toBeDisabled();
  expect(validationElement).not.toBeInTheDocument();
});

test('validate email input onchange', async () => {
  render(<OnBoard />, { wrapper: BrowserRouter });
  const emailInput: HTMLInputElement = await screen.findByLabelText('Email');
  const nextButton: HTMLButtonElement = await screen.findByRole('button');

  // input an valid email, the validation error should not display
  await act(() => fireEvent.change(emailInput, { target: { value: '123@qq.com' } }));
  expect(emailInput.value).toBe('123@qq.com');
  expect(nextButton).toBeEnabled();
  const validationElement = screen.queryByText('Please input a valid email');
  expect(validationElement).not.toBeInTheDocument();

  // input an invalid email, the validation error should display
  await act(() => fireEvent.change(emailInput, { target: { value: '123qq.com' } }));
  expect(emailInput.value).toBe('123qq.com');
  expect(nextButton).toBeEnabled();
  await act(() => fireEvent.click(nextButton));
  const validationElement1 = screen.queryByText('Please input a valid email');
  expect(validationElement1).toBeInTheDocument();
});
