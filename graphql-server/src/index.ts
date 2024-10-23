import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

// types
import { typeDefs } from "./schema";

// server setup
const port = 4000
const server = new ApolloServer({
  // typeDefs
  typeDefs,
  // resolvers
  

})

const {url} = await startStandaloneServer(server, {
  listen: {port: port}
})

console.log("server listening at port: ", port)