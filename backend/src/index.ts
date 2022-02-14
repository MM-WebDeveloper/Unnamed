import 'dotenv/config';
import 'reflect-metadata';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { ConfirmEmailResolver } from './resolvers/ConfirmEmail';
import { GraphQLServer, Options } from 'graphql-yoga';
import { LoginResolver } from './resolvers/Login';
import { RegisterResolver } from './resolvers/Register';
import mongoose from 'mongoose';
import { LogoutResolver } from './resolvers/Logout';
import { TestResolver } from './resolvers/TestResolver';
import cookieParser from 'cookie-parser';
import { ConfirmTokenResolver } from './resolvers/ConfirmToken';

const run = async () => {
	const PORT = process.env.PORT || 4000;

	await mongoose
		.connect(process.env.MONGO_DB_URI!)
		.then(() => console.log('Connected to MongoDB Atlas...'))
		.catch((err) => {
			console.log(err);
		});

	const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
		resolvers: [
			RegisterResolver,
			LoginResolver,
			ConfirmEmailResolver,
			ConfirmTokenResolver,
			LogoutResolver,
			TestResolver,
		],
	});

	const options: Options = {
		port: PORT,
		endpoint: '/graphql',
		playground: '/playground',
		cors: { origin: 'http://localhost:3000', credentials: true },
	};

	const server = new GraphQLServer({
		typeDefs,
		resolvers,
		context: ({ response, request }) => ({ response, request }),
	});

	server.use(cookieParser());

	server.start(options, () =>
		console.log(`Server started: http://localhost:${PORT}/playground`)
	);
};

run();
