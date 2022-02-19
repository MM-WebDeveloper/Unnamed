import {
	Arg,
	Ctx,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from 'type-graphql';
import { UserModel } from '../entities/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { ContextParameters } from 'graphql-yoga/dist/types';

@ObjectType()
export class User {
	@Field(() => String)
	username: string;
	@Field(() => String)
	email: string;
	constructor(username: string, email: string) {
		(this.username = username), (this.email = email);
	}
}

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

			console.log(token);

			if (!token) {
				return new ConfirmTokenResponse(undefined, 'invalid token');
			}

			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as JwtPayload;

			const user = await UserModel.findOne({ id: decodedToken.id });

			if (!user) {
				return new ConfirmTokenResponse(undefined, 'user not found');
			}

			return new ConfirmTokenResponse(
				{ username: user.username, email: user.email },
				undefined
			);
		} catch (error) {
			throw new Error('500 || Internal Server Error');
		}
	}
}
