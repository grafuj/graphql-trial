export const typeDefs = `#graphql
  type Movie {
    id: ID!
    title: String!
    platform: [String!]! 
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    movie: Movie!
    author: Author!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    reviews: [Review]
    review(id: ID!): Review
    movies: [Movie]
    movie(id: ID!): Movie
    authors: [Author]
    author(id: ID!): Author
  }

`;
