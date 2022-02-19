import { UserContext } from '../context/index';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useLogoutMutation } from '../generated/graphql';
import withAuth from '../components/WithAuth';

const dashboard: React.FC = () => {
	const { state, setState } = useContext(UserContext);
	const [updateLogoutResult, logout] = useLogoutMutation();
	const router = useRouter();

	const logoutUser = () => {
		logout();
		router.push('/');
	};

	console.log(2);

	return (
		<div>
			<h1>Dashboard Page</h1>
			<p>Welcome {state.user.username}</p>
			<button onClick={() => logoutUser()}>Log out</button>
		</div>
	);
};

export default withAuth(dashboard);
