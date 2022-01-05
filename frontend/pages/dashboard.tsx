import { GetServerSideProps } from 'next';
import { UserContext } from '../context/index';
import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { useLogoutMutation } from '../generated/graphql';

interface dashboardProps {
	cookie: string;
}

const dashboard: React.FC<dashboardProps> = (props) => {
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { req } = ctx;

	const { cookies } = req;

	if (cookies.uid) {
		return { props: { cookie: cookies.uid } };
	}

	return {
		redirect: {
			permanent: false,
			destination: '/',
		},
	};
};

export default dashboard;
