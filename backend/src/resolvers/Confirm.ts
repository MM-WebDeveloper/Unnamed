import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { UserModel } from '../entities/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

@ObjectType()
class ConfirmResponse {
	@Field(() => Boolean, { nullable: true })
	success?: boolean;
	@Field(() => String, { nullable: true })
	error?: string;

	constructor(success?: boolean, error?: string) {
		this.success = success;
		this.error = error;
	}
}

@Resolver()
export class ConfirmResolver {
	@Mutation(() => ConfirmResponse)
	async confirm(@Arg('token') token: string): Promise<ConfirmResponse> {
		try {
			const decodedToken = jwt.verify(
				token,
				process.env.JWT_EMAIL_SECRET!
			) as JwtPayload;

			await UserModel.findOne({ id: decodedToken.id }).update({
				confirmed: true,
			});

			return new ConfirmResponse(true, undefined);
		} catch (error) {
			console.log(error);
			return new ConfirmResponse(false, '500 || Internal Server Error');
		}
	}
}
