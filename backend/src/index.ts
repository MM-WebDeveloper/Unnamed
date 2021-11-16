import { GraphQLServer } from 'graphql-yoga';
import 'reflect-metadata';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';

const run = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver],
  });

  const options = {
    port: 4000,
    endpoint: '/graphql',
    playground: '/playground',
  };

  const server = new GraphQLServer({ typeDefs, resolvers });

  server.start(options, () =>
    console.log(`Server started: http://localhost:4000/playground`)
  );
};

run();
