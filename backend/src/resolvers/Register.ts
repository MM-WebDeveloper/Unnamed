import {
	Arg,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql';
import { User, UserModel } from '../entities/User';
import {
	emailValidator,
	passwordValidator,
	usernameValidator,
} from '../helpers/Validators';
import { sendEmail } from '../utils/SendEmail';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@ObjectType()
class RegisterResponse {
	@Field(() => Boolean)
	success: boolean;
	@Field(() => String, { nullable: true })
	error?: string;

	constructor(success: boolean, error?: string) {
		this.success = success;
		this.error = error;
	}
}

@Resolver()
export class RegisterResolver {
	@Query(() => String)
	hello() {
		return 'hello';
	}

	@Mutation(() => RegisterResponse)
	async register(
		@Arg('email') email: string,
		@Arg('username') username: string,
		@Arg('password') password: string,
		@Arg('confirmPassword') confirmPassword: string
	): Promise<RegisterResponse> {
		try {
			if (emailValidator(email)) {
				return new RegisterResponse(false, 'Invalid email.');
			}

			const emailExists = await UserModel.findOne({ email });

			if (emailExists) {
				return new RegisterResponse(false, 'This email is already registered.');
			}

			if (usernameValidator(username)) {
				return new RegisterResponse(false, 'Choose your username.');
			}

			const usernameExists = await UserModel.findOne({ username });

			if (usernameExists) {
				return new RegisterResponse(false, 'This username is already taken.');
			}

			if (passwordValidator(password)) {
				return new RegisterResponse(
					false,
					'Password is too weak.\n8 characters minimum.\nUse special characters (#!¤%).\nUse digits, small and capital letters.'
				);
			}

			if (password !== confirmPassword) {
				return new RegisterResponse(false, `Passwords don't match.`);
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User(email, username, hashedPassword, false);

			const userId = await (await new UserModel(user).save())._id;

			const emailToken = jwt.sign(
				{ id: userId.toString() },
				process.env.JWT_EMAIL_SECRET!,
				{ expiresIn: '365d' }
			);

			const confirmationUrl = `http://localhost:3000/confirm/${emailToken}`;

			await sendEmail(user.email, confirmationUrl);

			return new RegisterResponse(true);
		} catch (error) {
			return new RegisterResponse(false, '500 || Internal Server Error');
		}
	}
}
