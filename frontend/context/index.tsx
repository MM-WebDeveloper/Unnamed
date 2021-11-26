import { AppContext } from 'next/app';
import React, { useState, createContext, Dispatch } from 'react';

interface UserProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

type UserContextState = {
  accessToken: string;
};

const UserContextDefaultValue = {
  state: { accessToken: '' },
  setState: (state: UserContextState) => {},
};

const UserContext = createContext(UserContextDefaultValue);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, setState] = useState({
    accessToken: 'test',
  });

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
