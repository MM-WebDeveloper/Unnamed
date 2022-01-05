import { stringifyDocument } from '@urql/core/dist/types/utils';
import React, { useState, createContext } from 'react';

interface UserProviderProps {
	children: React.ReactElement | React.ReactElement[];
}

const UserContextDefaultValue = {
	state: { user: { email: '', username: '' } },
	setState: (state: { user: { email: string; username: string } }) => {},
};

const UserContext = createContext(UserContextDefaultValue);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [state, setState] = useState({
		user: {
			email: '',
			username: '',
		},
	});

	return (
		<UserContext.Provider value={{ state, setState }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
