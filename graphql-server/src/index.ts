import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

import _db from "./_db";

// types
import { typeDefs } from "./schema";

const resolvers = {
  Query: {
    movies() {
      return _db.movies
    },
    reviews() {
      return _db.reviews
    },
    authors() {
      return _db.authors
    }
  }
}

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