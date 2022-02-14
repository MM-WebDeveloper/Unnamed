import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { UserModel } from '../entities/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { User } from './Login';
import { ContextParameters } from 'graphql-yoga/dist/types';

@ObjectType()
class ConfirmTokenResponse {
	@Field(() => User, { nullable: true })
	user?: User;
	@Field(() => String, { nullable: true })
	error?: string;

	constructor(user?: User, error?: string) {
		this.user = user;
		this.error = error;
	}
}

@Resolver()
export class ConfirmTokenResolver {
	@Mutation(() => ConfirmTokenResponse)
	async confirmToken(
		@Ctx() ctx: ContextParameters
	): Promise<ConfirmTokenResponse> {
		try {
			const token = ctx.request.cookies.uid;

			if (!token) {
				throw new Error('invalid token');
			}
			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as JwtPayload;

			const user = await UserModel.findOne({ id: decodedToken.id });

			if (!user) {
				throw new Error('user not found');
			}

			return new ConfirmTokenResponse(
				{ username: user.username, email: user.email },
				undefined
			);
		} catch (error) {
			console.log(error);
			return new ConfirmTokenResponse(
				undefined,
				'500 || Internal Server Error'
			);
		}
	}
}
