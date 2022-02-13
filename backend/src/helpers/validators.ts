import { ContextParameters } from 'graphql-yoga/dist/types';
import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { isContext } from 'vm';
import { ContextType } from '../types/ContextType';

export const EmailValidator = (email: string) => {
	const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (!REGEX_EMAIL.test(email)) {
		return true;
	}
	return false;
};

export const UsernameValidator = (username: string) => {
	if (!username) {
		return true;
	}
	return false;
};

export const PasswordValidator = (password: string) => {
	/* 
  One uppercase letter
  One lowercase letter
  One digit
  One special character
  8 characters minimum
  */

	const REGEX_PWD =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/;

	if (!REGEX_PWD.test(password)) {
		return true;
	}
	return false;
};

export const AuthValidator: MiddlewareFn<ContextType> = (
	{ context: { request, response, payload } },
	next
) => {
	console.log('I happened');
	console.log(request.cookies.uid);
	// const token = ctx.request.cookies.uid;

	// if (!token) {
	// 	console.log('no token');
	// }

	// try {
	// 	const payload = jwt.verify(token, process.env.JWT_SECRET!);
	// } catch (error) {}
	// const token = context;

	// console.log(token);

	// if (!token) {
	// 	throw new Error('you are unauthorized');
	// }

	// //console.log(token);
	return next();
};
