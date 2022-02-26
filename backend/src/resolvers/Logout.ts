import { Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextParameters } from 'graphql-yoga/dist/types';

@Resolver()
export class LogoutResolver {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: ContextParameters) {
		try {
			ctx.response.clearCookie('uid');

			return true;
		} catch (error) {
			console.log(error);
		}
	}
}
