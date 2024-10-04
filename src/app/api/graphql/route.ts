import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '@/graphql/resolvers';
import typeDefs from '@/graphql/typedefs';

// Crie o schema e o servidor Yoga
const schema = makeExecutableSchema({ typeDefs, resolvers });
const { handleRequest } = createYoga({ schema });

export { handleRequest as POST, handleRequest as GET };
