import * as React from 'react';
import { useState } from 'react';
import Header from 'containers/Header';
import './index.css';

interface IProps {
  children: React.ReactNode;
}

// Application context, used for application state. Email is the one that the user uses to log in
// the application. If undefined, that means the user has not logged in yet.
interface IAppContext {
  email?: string;
  setEmail?: (email: string) => void;
}

export const AppContext = React.createContext<IAppContext>({});

const AppWrapper = ({ children }: IProps): JSX.Element => {
  const [email, setEmail] = useState<string>();
  return (
    <AppContext.Provider value={{ email, setEmail }}>
      <div className="App">
        <Header />
        <main>{children}</main>
      </div>
    </AppContext.Provider>
  );
};

export default AppWrapper;
