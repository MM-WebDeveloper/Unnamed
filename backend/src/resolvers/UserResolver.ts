import { Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => String)
  bye() {
    return 'bye';
  }
}
