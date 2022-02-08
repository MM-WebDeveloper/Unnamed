import { GetServerSideProps } from 'next';
import { UserContext } from '../context/index';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useLogoutMutation } from '../generated/graphql';
import { NextPage } from 'next';

const dashboard: NextPage = () => {
	const { state, setState } = useContext(UserContext);
	const [updateLogoutResult, logout] = useLogoutMutation();
	const router = useRouter();

	const logoutUser = () => {
		logout();
		router.push('/');
	};

	return (
		<div>
			<h1>Dashboard Page</h1>
			<p>Welcome {state.user.username}</p>
			<button onClick={() => logoutUser()}>Log out</button>
		</div>
	);
};

export default dashboard;
