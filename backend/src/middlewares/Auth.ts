import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { ContextType } from '../types/ContextType';

export const authValidator: MiddlewareFn<ContextType> = async (
	{ context },
	next
) => {
	const token = context.request.cookies.uid;

	if (!token) {
		throw new Error('not authenticated');
	}

	try {
		const tokenData = jwt.verify(token, process.env.JWT_SECRET!);

		const payload = tokenData;

		context.payload = payload as any;
	} catch (error) {
		throw new Error('not authenticated');
	}

	return next();
};
