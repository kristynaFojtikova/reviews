import gql from 'graphql-tag';

export default gql`
  mutation ($id: ID!) {
    deleteReview(id: $id) {
      id
      restaurantId
      rating
      userComment
      ownerComment
      status
    }
  }
`;
