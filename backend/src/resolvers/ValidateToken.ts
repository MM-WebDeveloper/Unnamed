import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../entities/User';

@Resolver()
export class ValidateTokenResolver {
	@Query(() => Boolean)
	validateToken(@Arg('token') token: string): Boolean {
		console.log('I got hit');
		try {
			const res = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
			console.log(res);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	@Query(() => String)
	user2() {
		return 'hello from user2';
	}
}
