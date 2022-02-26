import React, { createContext, useEffect, useState } from 'react';

interface UserProviderProps {
	children: React.ReactElement | React.ReactElement[];
}

const userContextDefaultValue = {
	state: { user: { email: '', username: '' }, loggedIn: false },
	setState: (state: {
		user: { email: string; username: string };
		loggedIn: boolean;
	}) => {},
};

const UserContext = createContext(userContextDefaultValue);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [state, setState] = useState({
		user: {
			email: '',
			username: '',
		},
		loggedIn: false,
	});

	useEffect(() => {
		setState({
			user: JSON.parse(window.localStorage.getItem('user')!),
			loggedIn: true,
		});
	}, []);

	return (
		<UserContext.Provider value={{ state, setState }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
