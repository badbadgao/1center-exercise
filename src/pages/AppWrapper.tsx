import * as React from 'react';
import Header from 'containers/Header';
import './index.css';

interface IProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: IProps): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default AppWrapper;
