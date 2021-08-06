const { gql } = require('apollo-server');

const {
  typeDefs: User,
} = require('./User');

const {
  typeDefs: Restaurant,
} = require('./Restaurant');

const {
  typeDefs: Review,
} = require('./Review');

const Ping = `
  type Query {
    ping: String!
  }
  type Mutation {
    ping: String!
  }
`;

const typeDefs = [Ping, User, Restaurant, Review]

module.exports = typeDefs