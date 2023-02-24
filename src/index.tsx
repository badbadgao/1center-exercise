import React from 'react';
import ReactDOM from 'react-dom/client';
import CreateAccount from 'pages/CreateAccount';
import BusinessDetails from 'pages/BusinessDetails';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppWrapper from './pages/AppWrapper';
import OnBoard from 'pages/OnBoard';
import AddDirectors from 'pages/AddDirectors';
import UserProfile from 'pages/UserProfile';

const router = createBrowserRouter([
  {
    path: '/onboard',
    element: (
      <AppWrapper>
        <OnBoard />
      </AppWrapper>
    ),
  },
  {
    path: '/signup/create-account',
    element: (
      <AppWrapper>
        <CreateAccount />
      </AppWrapper>
    ),
  },
  {
    path: '/signup/business-details',
    element: (
      <AppWrapper>
        <BusinessDetails />
      </AppWrapper>
    ),
  },
  {
    path: '/signup/add-directors',
    element: (
      <AppWrapper>
        <AddDirectors />
      </AppWrapper>
    ),
  },
  {
    path: '/signup/user-profile',
    element: (
      <AppWrapper>
        <UserProfile />
      </AppWrapper>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
