import { ReactComponentElement } from 'react';

const withAuth = (WrappedComponent: any) => {
	return (props: any) => {
		console.log('withAuth happened');

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
