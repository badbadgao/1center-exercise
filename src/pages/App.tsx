import React from 'react';
import Header from 'containers/Header';
import './index.css';
import OnBoard from './OnBoard';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <OnBoard />
    </div>
  );
};

export default App;
