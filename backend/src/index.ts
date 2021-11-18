import { GraphQLServer, Options } from 'graphql-yoga';
import 'reflect-metadata';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import mongoose from 'mongoose';
import 'dotenv/config';
import { UserResolver } from './resolvers/user_resolver';

const run = async () => {
  const PORT = process.env.PORT || 4000;

  await mongoose
    .connect(process.env.MONGO_DB_URI!)
    .then(() => console.log('Connected to MongoDB Atlas...'))
    .catch((err) => {
      console.log(err);
    });

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver],
  });

  const options: Options = {
    port: PORT,
    endpoint: '/graphql',
    playground: '/playground',
    cors: { origin: 'http://localhost:3000', credentials: true },
  };

  const server = new GraphQLServer({ typeDefs, resolvers });

  server.start(options, () =>
    console.log(`Server started: http://localhost:${PORT}/playground`)
  );
};

run();
