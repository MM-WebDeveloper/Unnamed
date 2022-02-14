import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { UserModel } from '../entities/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

@ObjectType()
class ConfirmEmailResponse {
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
export class ConfirmEmailResolver {
	@Mutation(() => ConfirmEmailResponse)
	async confirmEmail(
		@Arg('token') token: string
	): Promise<ConfirmEmailResponse> {
		try {
			const decodedToken = jwt.verify(
				token,
				process.env.JWT_EMAIL_SECRET!
			) as JwtPayload;

			await UserModel.findOne({ id: decodedToken.id }).update({
				confirmed: true,
			});

			return new ConfirmEmailResponse(true, undefined);
		} catch (error) {
			console.log(error);
			return new ConfirmEmailResponse(false, '500 || Internal Server Error');
		}
	}
}
