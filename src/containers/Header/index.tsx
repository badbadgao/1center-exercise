import * as React from 'react';

import { useState, useContext, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { NavLink, useLocation } from 'react-router-dom';
import services from 'services';
import { AppContext } from 'containers/AppWrapper';

import './Header.css';
import logo from '../../logo.svg';

import Button from 'components/Button';
import { Stepper, Step, StepLabel } from '@mui/material';
import { TUserAccount } from 'models/type';

interface IStep {
  label: string;
  pathname: string;
  isCompleted: (userAccount: TUserAccount) => boolean;
}

const AppHeader = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [drawerOpen, setDrawOpen] = useState<boolean>();
  const [userAccount, setUserAccount] = useState<TUserAccount>();
  const appContext = useContext(AppContext);
  const location = useLocation();

  const { profileService } = services;
  const toggleDrawer = () => {
    setDrawOpen((drawerOpen) => !drawerOpen);
    // when open drawer, the status of the steps needs to be updated.
    fetchUserAccount();
  };

  const fetchUserAccount = () => {
    const userAccountObj = appContext.email && profileService.getUserAccount(appContext.email);
    if (userAccountObj) {
      setUserAccount(userAccountObj);
    }
  };

  useEffect(() => {
    fetchUserAccount();
  }, [appContext.email]);

  const steps: IStep[] = [
    {
      label: 'Business details',
      pathname: '/signup/business-details',
      isCompleted: (userAccount: TUserAccount): boolean => !!userAccount.businessDetail,
    },
    {
      label: 'Director details',
      pathname: '/signup/add-directors',
      isCompleted: (userAccount: TUserAccount): boolean => !!userAccount.directors,
    },
    {
      label: 'Applicant details',
      pathname: '/signup/user-profile',
      isCompleted: (userAccount: TUserAccount): boolean => !!userAccount.userProfile,
    },
    {
      label: 'Review',
      pathname: '/signup/application-review',
      isCompleted: (userAccount: TUserAccount): boolean => userAccount.submitted,
    },
  ];

  useEffect(() => {
    const index = steps.findIndex((step) => step.pathname === location.pathname);
    setActiveStep(index);
  }, [location.pathname]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      {appContext.email && (
        <>
          <Button rootClass="header__menu" onClick={toggleDrawer}>
            <MenuIcon />
          </Button>
          <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer}>
            <div className="stepper">
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map(({ label, pathname, isCompleted }, index) => {
                  const labelProps = {};
                  return (
                    <Step key={label} className="stepper__item" completed={userAccount && isCompleted(userAccount)}>
                      <NavLink
                        key={label}
                        to={pathname}
                        onClick={() => {
                          setActiveStep(index);
                          toggleDrawer();
                        }}
                      >
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </NavLink>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
          </Drawer>
        </>
      )}
    </header>
  );
};

export default AppHeader;
