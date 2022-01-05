import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { request, gql } from 'graphql-request';

export const withAuth = (gssp: GetServerSideProps) => {
	return async (ctx: GetServerSidePropsContext) => {
		const { req } = ctx;

		if (!req.headers.cookie) {
			return {
				redirect: {
					permanent: false,
					destination: '/register',
				},
			};
		}

		if (req.headers.cookie) {
			const tokens = req.headers.cookie.split(';');
			const token = tokens.find((token: string) => token.includes('uid'));

			const UserQuery = gql`
				query {
					validateToken(
						token: "${token?.split('=')[1]}"
					)
				}
			`;

			const validToken = await request(
				'http://localhost:4000/graphql',
				UserQuery
			);

			if (!validToken.validateToken) {
				return {
					redirect: {
						permanent: false,
						destination: '/register',
					},
				};
			}
		}

		return await gssp(ctx);
	};
};
