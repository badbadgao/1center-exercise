import * as React from 'react';

import './Header.css';
import logo from '../../logo.svg';

const AppHeader = (): JSX.Element => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
    </header>
  );
};

export default AppHeader;
