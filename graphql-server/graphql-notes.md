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

* int: interger numbers
* float: decimal numbers
* string: characters
* boolean: T/F
* ID: spedial id type to use as a key for data objects. these are serialized strings

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

`
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