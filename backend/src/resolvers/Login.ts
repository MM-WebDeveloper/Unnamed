import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { UserModel } from '../entities/User';
import { ContextParameters } from 'graphql-yoga/dist/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
	@Field(() => Boolean, { nullable: true })
	success?: Boolean;
	@Field(() => String, { nullable: true })
	error?: string;

	constructor(success?: Boolean, error?: string) {
		this.success = success;
		this.error = error;
	}
}

@Resolver()
export class LoginResolver {
	@Mutation(() => LoginResponse)
	async login(
		@Arg('emailOrUsername') emailOrUsername: string,
		@Arg('password') password: string,
		@Ctx() ctx: ContextParameters
	) {
		try {
			const user = await UserModel.findOne({
				$or: [{ email: emailOrUsername }, { username: emailOrUsername }],
			});

			if (!user) {
				return new LoginResponse(undefined, 'Invalid email or password.');
			}

			if (!user.confirmed) {
				return new LoginResponse(
					undefined,
					'You have to confirm your email before you can login.'
				);
			}

			const validPassword = await bcrypt.compare(password, user.password);

			if (!validPassword) {
				return new LoginResponse(undefined, 'Invalid email or password.');
			}

			const accessToken = jwt.sign(
				{ userId: user._id.toString() },
				process.env.JWT_SECRET!,
				{ expiresIn: '365d' }
			);

			ctx.response.cookie('uid', accessToken, { httpOnly: true });

			return new LoginResponse(true, undefined);
		} catch (error) {
			console.log(error);
			return new LoginResponse(undefined, '500 || Internal Server Error');
		}
	}
}
