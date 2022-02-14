import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UserModel } from '../entities/User';
import { authValidator } from '../middlewares/Auth';
import { ContextType } from '../types/ContextType';

@Resolver()
export class TestResolver {
	@Query(() => String)
	@UseMiddleware(authValidator)
	async testRoute(@Ctx() { payload }: ContextType) {
		const user = await UserModel.findOne({ id: payload?.userId });
		console.log(user);
		return `your user id is: ${payload!.userId}`;
	}
}
