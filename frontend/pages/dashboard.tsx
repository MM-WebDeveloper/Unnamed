import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { UserContext } from '../context';
import { useLogoutMutation } from '../generated/graphql';

const dashboard: React.FC = () => {
	const [updateLogoutResult, logout] = useLogoutMutation();
	const router = useRouter();
	const { state, setState } = useContext(UserContext);

	const logoutUser = () => {
		logout();
		setState({ user: { email: '', username: '' }, loggedIn: false });
		window.localStorage.removeItem('user');
		router.push('/');
	};

	return (
		<div>
			<h1>Dashboard Page</h1>
			<p>{state.user.username}</p>
			<p>Welcome to Dashboard</p>

			<button onClick={() => logoutUser()}>Log out</button>
		</div>
	);
};

export default dashboard;
