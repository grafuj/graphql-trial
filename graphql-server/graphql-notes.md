# GraphQL

constructing a query:

```ts
query ReviewsQuery {
  rating {
    rating,
    content,
    id
  }
}

// here we get all of the specified fields inside each review object inside the array of reviews

//response format:

{
  "data": {
    "reviews": [
      {
        "rating": 9,
        "content": "pretty good",
        "id": "1"
      },
      {
        "rating": 4,
        "content": "fine",
        "id": "2"
      },
      {
        "rating": 6,
        "content": "ok",
        "id": "3"
      }
    ]
  }
}
```

Something important to consider is our entry point into the data.
The reviews resource was our jumping in point.
We start at reviews and get specific information about each review.
We have to manually ask for it because that leads to huge efficiency savings if we only want 10% of the data.

# Complex Queries

if we want linked data (name of the author of a review), then we need to nest objects

```ts
query ReviewWithAuthorNameQuery {
  review {
    rating,
    author {
      name
    }
  }
}

{
  "data": {
    "reviews": [
      {
        "rating": 9,
        "content": "pretty good",
        "id": "1"
      }
    ]
  }
}
```

However, the only reason we can do this is because when making the graphQL server, these resources were intentionally connected.
Each review is related to an author which is a separate resource.
The advantage here is that we can get data from two difference resources with only one query.

# Specific queries

```ts
query ReviewWithAuthorNameQuery { // all reviews for game 2 with author's name and rating
  movie(id:"2") {
    title
    review {
      rating,
      author {
        name
      }
    }
  }
}

{
  "data": {
    "movies": [
      {
        "id": "2", // this would not be here as it is implied
        "title": "Tenet",
        "reviews": [ // if there are more than one, it will be array
          {
            "rating": 8,
            "author": {
              "name": "Billy Joel"
            }
          },
          {
            "rating": 7,
            "author": {
              "name": "Yodeling Sara"
            }
          }
        ]
      }
    ]
  }
}
```

GraphQL has 5 basic scalar types that we can use

- int: interger numbers
- float: decimal numbers
- string: characters
- boolean: T/F
- ID: spedial id type to use as a key for data objects. these are serialized strings

type defs look like this:

```ts
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

`;
// the first exclamation mark says that the string contained in the array cannot be nullish
// the second exclamation mark says that the array cannot be nullish
```

# The mandatory Type in all graphQL schemas

The query type defines the entry points to the graph and specify the return types of those entry points

```ts
type Query {
  reviews: [Review]
}
```

This allows a user to enter from reviews and peruse reviews and all the data around it. You cannot enter from any other point, but you can still query data

The schema is a map and the resolver functions actually handle queries according to the rules set out in the schema.

https://www.youtube.com/watch?v=mjqfYgFyziU
https://www.apollographql.com/docs/apollo-server/api/standalone

with this error:

```plain
node:internal/errors:496
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/carrots/open_source/graphql/graphql-trial/graphql-server/dist/db' imported from /home/carrots/open_source/graphql/graphql-trial/graphql-server/dist/index.js
```

The solution was to update the imports from:
`import db from "./db";` to `import db from "./db.js";`

# Entering based on a single parameter instead of lists of data

We need to manually add the ability to enter a graph on a single point such as: `movie(id:"2")`

```ts
type Query {
  reviews: [Review]
  movies: [Movie]
  authors: [Author]
}

type Query {
  reviews: [Review]
  review(id: ID!): Review
  movies: [Movie]
  movie(id: ID!): Movie
  authors: [Author]
  author(id: ID!): Author
}
```

and we must also add the appropriate resolver function for this:

```ts
const resolvers = {
  Query: {
    reviews() {
      return db.reviews; // generic one
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
      // or alternatively
      return db.reviews.find((review) => {
        if (review.id === args.id) {
          return true; // makes find send the review
        } else {
          return false;
        }
      });
    },
  },
};
```

# add linking to our data so we can get all reviews for a movie:

```ts
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
```

## add new entry to resolvers for getting more than just a simple point

```ts
const resolvers = {
  Query: {
    // all the stuff
  },
  Movie {
    reviews(parent: Movie){
      return db.reviews.filter((review) => review.movie_id === parent.id)
    }
  }
```

And we can do the same for the other two:

```ts
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
```
