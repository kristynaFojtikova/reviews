import gql from 'graphql-tag';

export default gql`
  mutation ($input: ApproveReviewInput!) {
    approveReview(input: $input) {
      id
      restaurantId
      rating
      userComment
      ownerComment
      status
    }
  }
`;
