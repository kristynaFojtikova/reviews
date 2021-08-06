const { gql } = require('apollo-server');
const typeDefs = gql`
  # User Definition
  enum UserRole {
    CUSTOMER
    OWNER
    ADMIN
  }

  interface User {
    email: String!
    role: UserRole!
    password: String!
  }
  
  type Owner implements User {
    email: String!
    role: UserRole!
    password: String!
    # restaurants: [Restaurant!]
  }

  type Admin implements User {
    email: String!
    role: UserRole!
    password: String!
  }

  type Customer implements User {
    email: String!
    role: UserRole!
    password: String!
  }

  # Input

  input RegisterInput {
      email: String!
      role: UserRole!
      password: String!
  }

  input LoginInput {
      email: String!
      password: String!
  }

  # Response

  type AuthSuccess {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  type AuthError {
    code: String!
    message: String!
  }

  union AuthResponse = AuthSuccess | AuthError

  extend type Query {
    users: [User]
  } 
  
  extend type Mutation {
    login(input: LoginInput!): AuthResponse
    logout(refreshToken: String!): Boolean
    register(input: RegisterInput!): AuthResponse
    refreshToken(refreshToken: String!): AuthResponse
    deleteUser(id: ID): User
  }
`;

module.exports = typeDefs