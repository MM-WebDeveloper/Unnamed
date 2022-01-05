import { GetServerSideProps } from 'next';
import { UserContext } from '../context/index';
import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { useLogoutMutation } from '../generated/graphql';
import { NextPage } from 'next';
import { withAuth } from '../auth/withAuth';

const dashboard: NextPage = () => {
	const { state, setState } = useContext(UserContext);
	const [updateLogoutResult, logout] = useLogoutMutation();
	// const [updateUserResult, user] = useUserQuery();
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

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx) => {
	return {
		props: {},
	};
});

export default dashboard;
