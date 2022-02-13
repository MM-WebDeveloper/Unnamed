import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AuthValidator } from '../helpers/validators';
import { ContextType } from '../types/ContextType';

@Resolver()
export class TestResolver {
	@Query(() => String)
	@UseMiddleware(AuthValidator)
	testRoute(@Ctx() { payload }: ContextType) {
		// return `your user id is: ${payload!.userId}`;
		return 'testRoute hit';
	}
}
