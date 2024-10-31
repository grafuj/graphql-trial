import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import db from "./db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    movies() {
      return db.movies;
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      args.id;
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
  },
};

// server setup
const port = 4000;
const server = new ApolloServer({
  // typeDefs
  typeDefs,
  // resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log("server listening at port: ", port);
