import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { useConfirmTokenMutation } from '../generated/graphql';

const withAuth = (WrappedComponent: any) => {
	return (props: any) => {
		const { state, setState } = useContext(UserContext);
		const router = useRouter();
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [confirmTokenResult, confirmToken] = useConfirmTokenMutation();

		useEffect(() => {
			const checkToken = async () => {
				const { data } = await confirmToken();

				setState({
					user: data?.confirmToken.user!,
				});
			};

			checkToken();
			setLoading(false);
		}, []);

		if (loading) {
			return <h1>Loading...</h1>;
		}

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
