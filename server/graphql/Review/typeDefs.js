const { gql } = require("apollo-server");

const typeDefs = gql`
  enum ReviewStatus {
    PENDING
    APPROVED
    DISAPROVED
  }

  type Review {
    id: ID!
    restaurantId: ID!
    reviewerId: ID!
    rating: Int!
    userComment: String
    ownerComment: String
    status: ReviewStatus!
  }

  extend type Query {
    reviews: [Review]
  }

  input CreateReviewInput {
    restaurantId: ID!
    rating: Int!
    userComment: String
  }

  input ApproveReviewInput {
    id: ID!
    approved: Boolean!
    ownerComment: String
  }

  extend type Mutation {
    createReview(input: CreateReviewInput): Review!
    approveReview(input: ApproveReviewInput): Review!
    deleteReview(id: ID!): Review!
  }
`;

module.exports = typeDefs;
