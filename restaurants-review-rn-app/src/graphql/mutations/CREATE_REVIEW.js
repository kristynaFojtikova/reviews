import gql from 'graphql-tag';

export default gql`
  mutation createReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      restaurantId
      rating
      userComment
      ownerComment
      status
    }
  }
`;
