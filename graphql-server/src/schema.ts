export const typeDefs = `#graphql
  type Movie {
    id: ID!
    title: String!
    platform: [String!]! 
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
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
