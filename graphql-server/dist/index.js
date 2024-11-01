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
        movie(_, args) {
            return db.movies.find((movie) => movie.id === args.id);
        },
        reviews() {
            return db.reviews;
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id);
        },
    },
    Movie: {
        reviews(parent) {
            return db.reviews.filter((review) => review.movie_id === parent.id);
        },
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id);
        },
    },
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id);
        },
        movie(parent) {
            return db.movies.find((movie) => movie.id === parent.movie_id);
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
