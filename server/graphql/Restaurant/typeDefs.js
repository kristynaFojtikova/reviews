const { gql } = require("apollo-server");

const typeDefs = gql`
  type Restaurant {
    id: ID!
    name: String!
    description: String
    imageUrls: [String]
    reviews: [Review]
  }
  extend type Query {
    restaurants: [Restaurant!]
    restaurant(id: ID!): Restaurant
  }
  input CreateRestaurantInput {
    name: String!
    description: String
  }
  input EditRestaurantInput {
    id: ID!
    name: String!
    description: String
  }
  extend type Mutation {
    createRestaurant(input: CreateRestaurantInput): Restaurant!
    editRestaurant(input: EditRestaurantInput): Restaurant!
    deleteRestaurant(id: ID!): Restaurant!
  }
`;

module.exports = typeDefs;
